import { renderNavbars } from '../src/components/navbar.js';
import { renderLoginModal } from '../src/components/login-modal.js';
import { renderRegisterModal } from '../src/components/register-modal.js';

//// POSTAGENS SISTEMA ////
// Função para carregar e exibir as postagens do backend
export async function loadPosts() {
  const postsContainer = document.getElementById('posts-container');
  const emptyState = document.getElementById('empty-state');

  if (!postsContainer) return;

  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();

    if (!posts || posts.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    // Oculta a mensagem de feed vazio
    if (emptyState) emptyState.style.display = 'none';

    // Remove cards antigos sem apagar o emptyState da DOM
    postsContainer.querySelectorAll('.post-card').forEach(card => card.remove());

    // Injeta os cards de postagem
    posts.forEach(post => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';

      const formattedTime = new Date(post.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      postCard.innerHTML = `
        <header class="post-header">
          <strong class="post-author">${post.userName || 'Usuário'}</strong>
          <time class="post-time">${formattedTime}</time>
        </header>
        <p class="post-content">${post.content}</p>
      `;

      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Erro ao carregar o feed:', error);
  }
}

//// COMPONENTE USUARIO ////
document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderiza os componentes na tela
  renderNavbars();
  renderLoginModal();
  renderRegisterModal();

  // 2. Carrega as postagens da API na inicialização
  loadPosts();

  // 3. Elementos dos modais injetados
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');

  // 4. Delegation de cliques para abrir/alternar modais
  document.addEventListener('click', (e) => {
    // Abrir Login
    if (e.target && e.target.id === 'openLoginBtn') {
      registerModal?.classList.remove('active');
      loginModal?.classList.add('active');
    }

    // Abrir Cadastro
    if (e.target && e.target.id === 'openRegisterBtn') {
      loginModal?.classList.remove('active');
      registerModal?.classList.add('active');
    }

    // Alternar de Login para Cadastro dentro do Modal
    if (e.target && e.target.id === 'switchToRegister') {
      loginModal?.classList.remove('active');
      registerModal?.classList.add('active');
    }

    // Alternar de Cadastro para Login dentro do Modal
    if (e.target && e.target.id === 'switchToLogin') {
      registerModal?.classList.remove('active');
      loginModal?.classList.add('active');
    }
  });
});