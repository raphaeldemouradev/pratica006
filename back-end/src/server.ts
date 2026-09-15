import express from "express";
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express()
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 3000;

import { trafficAnalyticsMiddleware, trafficLogs } from './middlewares/analytics.js';
import authRouters from './routes/authRoutes.js'
import { createPost, getPosts } from './api/posts.js';

// Recriando o __dirname para ES Modules / TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONT_END_PATH = path.join(__dirname, '../../front-end');

// Servir os arquivos estáticos da pasta front-end (index.html, CSS, JS)
app.use(express.static(FRONT_END_PATH));

// Cabeçalhos fundamentais de segurança
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

///// SEGURANÇA e TRAFEGO /////
// Middleware de Telemetria de Acessos
app.use(trafficAnalyticsMiddleware);

/*
// --- ROTA DE ESTATÍSTICAS / METRICAS ---
app.get('/api/analytics/traffic', (req, res) => {
  res.status(200).json({
    totalAcessos: trafficLogs.length,
    logs: trafficLogs
  });
});
*/

///// ROTAS DA API /////
// Rotas da API de postagens
app.post('/api/posts', createPost);
app.get('/api/posts', getPosts);

// Rota GET para buscar usuários no array
app.get('/api/users/search', (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === '') {
      return res.status(200).json([]);
    }

    const searchTerm = name.toLowerCase();

    // Filtra no array 'users' que está salvo na memória RAM
    const matchedUsers = users
      .filter((user) => user.name && user.name.toLowerCase().includes(searchTerm))
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
      .slice(0, 10); // Limita aos primeiros 10 resultados

    return res.status(200).json(matchedUsers);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return res.status(500).json({ error: 'Erro interno no servidor ao buscar usuários.' });
  }
});

///// CRUD /////
// Criar e Login: "authController". 
// "authRouter" Entrega para Front.
app.use('/api/auth', authRouters);

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
// Config Home/Feed
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONT_END_PATH, 'index.html'));
});

// Config Perfil
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'perfil.html'))
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`[PRÁTICA 006] Servidor ativo em http://localhost:${PORT}`);
});