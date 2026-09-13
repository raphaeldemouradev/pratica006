// --- TIPOS DE USUÁRIO ---
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

// --- TIPOS DE POST ---
// 1. Objeto completo do Post armazenado e retornado pela API
export interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// 2. Dados esperados no req.body ao criar um novo post
export interface CreatePostDTO {
  userId: string;
  userName?: string;
  content: string;
}