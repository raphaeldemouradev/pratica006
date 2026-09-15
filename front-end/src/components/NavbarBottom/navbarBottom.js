// src/components/NavbarBottom/navbarBottom.js
import { initPostModal } from '../postModal.js';

export function renderNavbarBottom() {
  const bottomNavContainer = document.getElementById('navbar-bottom-container');
  if (!bottomNavContainer) return;

  // Identifica a página atual
  const isSearchPage = window.location.pathname.includes('buscar.html');

  bottomNavContainer.innerHTML = `
    <style>
      .floating-navbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 1rem;
        background-color: #1e293b;
        border: 1px solid #334155;
        border-radius: 40px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        z-index: 1000;
      }

      .nav-tab {
        background: none;
        border: none;
        color: #94a3b8;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        transition: color 0.2s ease, background-color 0.2s ease;
      }

      .nav-tab.active, .nav-tab:hover {
        color: #f8fafc;
        background-color: #334155;
      }

      .btn-add-post, .btn-search-user {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: none;
        background-color: #38bdf8;
        color: #0f172a;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s ease, background-color 0.2s ease;
        line-height: 1;
      }

      .btn-search-user.active {
        background-color: #0284c7;
        color: #ffffff;
      }

      .btn-add-post:hover, .btn-search-user:hover {
        background-color: #0284c7;
        color: #ffffff;
        transform: scale(1.08);
      }
    </style>

    <nav class="floating-navbar">
      <button class="nav-tab ${!isSearchPage ? 'active' : ''}" type="button" id="navFeedBtn">Feed</button>
      <button class="btn-add-post" id="openPostModalBtn" type="button" title="Criar Postagem">+</button>
      <button class="btn-search-user ${isSearchPage ? 'active' : ''}" id="openSearchModalBtn" type="button" title="Buscar Usuários">🔍</button>
      <button class="nav-tab" type="button">Notícias</button>
    </nav>
  `;

  // Inicializa o modal de postagem
  initPostModal();

  // Clique no botão Feed -> Volta para o Feed
  const feedBtn = document.getElementById('navFeedBtn');
  if (feedBtn) {
    feedBtn.addEventListener('click', () => {
      window.location.href = '/index.html'; // ou '/' se sua rota raiz for o feed
    });
  }

  // Clique na Lupa -> Vai para a página de busca
  const searchBtn = document.getElementById('openSearchModalBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (!isSearchPage) {
        window.location.href = '/buscar.html';
      }
    });
  }
}