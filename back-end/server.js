import express from 'express'
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { trafficAnalyticsMiddleware, trafficLogs } from './src/middlewares/analytics.js';
import authRouters from './src/routes/authRoutes.js'
import { createPost, getPosts } from './src/api/posts.js';

const app = express()
app.use(cors())
app.use(express.json());
const PORT = 3000;

// Configuração dos caminhos (__dirname não existe em ES Modules nativos)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONT_END_PATH = path.join(__dirname, '..', 'front-end');

// Cabeçalhos fundamentais de segurança
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Middleware de Telemetria de Acessos
app.use(trafficAnalyticsMiddleware);

// Servir os arquivos estáticos da pasta front-end (index.html, CSS, JS)
app.use(express.static(FRONT_END_PATH));

// --- ROTAS DA API ---
app.use('/api/auth', authRouters);

// --- ROTA DE ESTATÍSTICAS / METRICAS ---
app.get('/api/analytics/traffic', (req, res) => {
  res.status(200).json({
    totalAcessos: trafficLogs.length,
    logs: trafficLogs
  });
});

// Rotas da API de postagens
app.post('/api/posts', createPost);
app.get('/api/posts', getPosts);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Atualizar Perfil
app.put('/api/perfil/atualizar', async (req, res) => {
  const { id, name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
  }

  // Aqui você faria a atualização no seu banco de dados (ex: Prisma/SQLite ou Array)
  // Exemplo simulado:
  // await prisma.user.update({ where: { id: id }, data: { name, email } });

  return res.status(200).json({ message: 'Dados atualizados com sucesso!' });
});

///// ROTAS /////
// Config Perfil
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'perfil.html'))
});

// Redirecionar qualquer rota desconhecida diretamente para a tela inicial do front-end
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONT_END_PATH, 'index.html'));
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`[PRÁTICA 006] Servidor ativo em http://localhost:${PORT}`);
});