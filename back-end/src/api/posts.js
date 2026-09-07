// Banco de dados temporário em memória
let posts = [];

// 1. Criar Publicação (POST)
export function createPost(req, res) {
  const { userId, userName, content } = req.body;

  // Validação dos dados recebidos
  if (!userId || !content || content.trim() === '') {
    return res.status(400).json({ error: 'Conteúdo e dados do usuário são obrigatórios.' });
  }

  // Cria o objeto do post com ID único e data atual
  const newPost = {
    id: Date.now().toString(),
    userId,
    userName: userName || 'Usuário Anônimo',
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  // Adiciona no início da lista (para o mais recente ficar no topo)
  posts.unshift(newPost);

  return res.status(201).json(newPost);
}

// 2. Listar Publicações (GET)
export function getPosts(req, res) {
  return res.status(200).json(posts);
}