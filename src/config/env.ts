import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
});

export const env = envSchema.parse(process.env);