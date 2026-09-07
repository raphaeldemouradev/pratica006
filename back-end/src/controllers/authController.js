// Array em memória RAM para simular o banco de dados
const usersDatabase = [];

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validação simples de campos obrigatórios
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  // Verifica se o usuário já existe na memória
  const userExists = usersDatabase.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'E-mail já cadastrado!' });
  }

  // Cria o novo usuário e salva no array
  const newUser = {
    id: Date.now().toString(), // Gera um ID único simples
    name,
    email,
    password
  };

  usersDatabase.push(newUser);

  console.log('[RAM DB] Usuário cadastrado com sucesso:', newUser);
  console.log('[RAM DB] Total de usuários na memória:', usersDatabase.length);

  return res.status(201).json({
    message: 'Usuário cadastrado com sucesso!',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios!' });
  }

  // Busca o usuário no array em memória
  const user = usersDatabase.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos!' });
  }

  console.log('[RAM DB] Usuário autenticado:', user.email);

  return res.status(200).json({
    message: 'Login realizado com sucesso!',
    user: { id: user.id, name: user.name, email: user.email }
  });
};

// --- NOVO MÉTODO PARA BUSCAR DADOS DO PERFIL ---
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = usersDatabase.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado na memória RAM.' });
  }

  return res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email
  });
};