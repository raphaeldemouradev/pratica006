// Importa o módulo do modal de postagem separado
import { initPostModal } from './postModal.js';

export function renderNavbars() {
  const topNavContainer = document.getElementById('navbar-top-container');
  const savedUser = JSON.parse(localStorage.getItem('user_session'));

  // 1. Renderiza a Navbar Superior
  if (topNavContainer) {
    topNavContainer.innerHTML = `
      <style>
        .top-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background-color: #1e293b;
          color: #f8fafc;
          border-bottom: 1px solid #334155;
        }

        .brand-logo {
          font-weight: 700;
          font-size: 1.2rem;
          color: #38bdf8;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-profile-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.85rem;
          background-color: #334155;
          color: #f8fafc;
          text-decoration: none;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid #475569;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .user-profile-link:hover {
          background-color: #475569;
          border-color: #38bdf8;
          color: #38bdf8;
        }

        .btn-auth-trigger {
          padding: 0.45rem 0.9rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          border: none;
          background-color: #38bdf8;
          color: #0f172a;
          transition: background-color 0.2s ease;
        }

        .btn-auth-trigger:hover {
          background-color: #0284c7;
          color: #ffffff;
        }

        .btn-auth-trigger.secondary {
          background-color: transparent;
          color: #94a3b8;
          border: 1px solid #475569;
        }

        .btn-auth-trigger.secondary:hover {
          background-color: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
        }
      </style>

      <header class="top-navbar">
        <div class="brand-logo">Prática 006</div>
        <div class="auth-buttons">
          ${savedUser ? `
            <a href="/perfil.html" class="user-profile-link">
              👤 ${savedUser.name}
            </a>
            <button class="btn-auth-trigger secondary" id="logoutBtn" type="button">Sair</button>
          ` : `
            <button class="btn-auth-trigger" id="openLoginBtn" type="button">Entrar</button>
            <button class="btn-auth-trigger secondary" id="openRegisterBtn" type="button">Cadastrar</button>
          `}
        </div>
      </header>
    `;
  }

  // 2. Renderiza a Navbar Inferior
  const bottomNavContainer = document.getElementById('navbar-bottom-container');
  if (bottomNavContainer) {
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

        .btn-add-post {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background-color: #38bdf8;
          color: #0f172a;
          font-size: 1.5rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
          line-height: 1;
        }

        .btn-add-post:hover {
          background-color: #0284c7;
          color: #ffffff;
          transform: scale(1.08);
        }
      </style>

      <nav class="floating-navbar">
        <button class="nav-tab active" type="button">Feed</button>
        <button class="btn-add-post" id="openPostModalBtn" type="button" title="Criar Postagem">+</button>
        <button class="nav-tab" type="button">Notícias</button>
      </nav>
    `;
  }

  // Inicializa o módulo separado do modal
  initPostModal();
}

// Listener para a ação de Sair (Logout)
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'logoutBtn') {
    localStorage.removeItem('user_session');
    window.location.href = '/';
  }
});