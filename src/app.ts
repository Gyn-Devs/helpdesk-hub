import 'dotenv/config';
import path from 'path';
import fastify, { FastifyInstance } from 'fastify';
import { bootstrap } from 'fastify-decorators';
import prisma from './database/prisma.client';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
//import helmet from 'helmet';
import { env } from './config/env';

const app: FastifyInstance = fastify({
  logger: true,
});

async function setupSwagger() {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API do Módulo de Tickets e Suporte',
        version: '1.0.0',
      },
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
}

async function setupMiddlewares() {
  //Config Helmet
  await app.register(import('@fastify/rate-limit'), { max: 100 });
}

app.decorate('prisma', prisma);

async function setupControllers() {
  await app.register(bootstrap, {
    directory: path.join(__dirname, 'controllers'),
  });
}

app.get('/health', async () => ({ status: 'ok' }));

async function start() {
  try {
    await setupSwagger();
    await setupMiddlewares();
    await setupControllers();

    await app.listen({
      port: env.PORT || 3000,
      host: '0.0.0.0',
    });

    console.log(`Server running on ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  await app.close();
});