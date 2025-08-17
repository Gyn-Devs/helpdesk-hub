# 📌 DER - Sistema de Tickets

## 1. 🧑 Usuario
| Campo        | Tipo / Observação                                |
|--------------|--------------------------------------------------|
| **id_usuario** (PK) | Identificador único do usuário              |
| nome         | Nome completo                                     |
| email        | E-mail do usuário                                 |
| tipo_usuario | Cliente, atendente ou admin                      |
| data_criacao | Data de criação do usuário                        |

---

## 2. 🎫 Ticket
| Campo            | Tipo / Observação                                                           |
|------------------|-----------------------------------------------------------------------------|
| **id_ticket** (PK) | Identificador único do ticket                                             |
| id_usuario (FK → Usuario) | Usuário que abriu o ticket                                         |
| titulo           | Título do ticket                                                            |
| descricao        | Descrição do problema                                                       |
| status_atual (FK → Status) | Status atual (para consulta rápida)                              |
| prioridade       | Prioridade definida                                                         |
| data_criacao     | Data de abertura                                                            |
| data_fechamento  | Data de fechamento (null se ainda aberto)                                   |

---

## 3. 📊 Status
| Campo             | Tipo / Observação                                |
|-------------------|--------------------------------------------------|
| **id_status** (PK) | Identificador único do status                   |
| nome_status       | Ex.: Aberto, Em andamento, Aguardando cliente... |
| descricao         | Detalhes do status                               |

---

## 4. 📝 Historico_Ticket
| Campo              | Tipo / Observação                                                         |
|--------------------|---------------------------------------------------------------------------|
| **id_historico** (PK) | Identificador único do histórico                                       |
| id_ticket (FK → Ticket) | Ticket relacionado                                                   |
| id_usuario (FK → Usuario) | Usuário que fez a atualização                                      |
| tipo_evento        | Ex.: Mudança de status, mensagem, alteração de prioridade, atribuição...  |
| id_status (FK → Status) | Se for mudança de status                                             |
| mensagem           | Texto da mensagem (null se não for mensagem)                              |
| dados_extras (JSON)| Dados adicionais para integrações/IA                                      |
| data_evento        | Data/hora da atualização                                                  |
