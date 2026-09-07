// js/components/postModal.js

export function initPostModal() {
  const postModalContainer = document.getElementById('post-modal-container');
  if (!postModalContainer) return;

  // Injeta o HTML e o CSS exclusivo do Modal de Postagem
  postModalContainer.innerHTML = `
    <style>
      .post-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 1rem;
      }

      .post-modal-card {
        width: 100%;
        max-width: 480px;
        background-color: #1e293b;
        border: 1px solid #334155;
        border-radius: 12px;
        padding: 1.25rem;
        color: #f8fafc;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
      }

      .post-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .post-modal-header h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #f8fafc;
      }

      .btn-close-modal {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 1.25rem;
        cursor: pointer;
      }

      .btn-close-modal:hover {
        color: #f8fafc;
      }

      .post-modal-textarea {
        width: 100%;
        min-height: 110px;
        padding: 0.75rem;
        background-color: #0f172a;
        border: 1px solid #334155;
        border-radius: 8px;
        color: #f8fafc;
        font-size: 0.95rem;
        resize: none;
        box-sizing: border-box;
        outline: none;
        margin-bottom: 1rem;
      }

      .post-modal-textarea:focus {
        border-color: #38bdf8;
      }

      .post-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
    </style>

    <div class="post-modal-overlay" id="postModal" style="display: none;">
      <div class="post-modal-card">
        <div class="post-modal-header">
          <h3>Criar nova publicação</h3>
          <button class="btn-close-modal" id="closePostModalBtn" type="button">&times;</button>
        </div>
        <form id="createPostForm">
          <textarea 
            id="postContentInput" 
            class="post-modal-textarea" 
            placeholder="No que você está pensando?" 
            required
          ></textarea>
          <div class="post-modal-footer">
            <button class="btn-auth-trigger secondary" id="cancelPostBtn" type="button">Cancelar</button>
            <button class="btn-auth-trigger" type="submit">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  `;

  setupPostModalEvents();
}

function setupPostModalEvents() {
  const openBtn = document.getElementById('openPostModalBtn');
  const closeBtn = document.getElementById('closePostModalBtn');
  const cancelBtn = document.getElementById('cancelPostBtn');
  const modal = document.getElementById('postModal');
  const form = document.getElementById('createPostForm');
  const textarea = document.getElementById('postContentInput');

  const closeModal = () => {
    if (modal) modal.style.display = 'none';
    if (textarea) textarea.value = '';
  };

  // Escuta o clique no botão do "+" que está renderizado na navbar
  openBtn?.addEventListener('click', () => {
    const savedUser = JSON.parse(localStorage.getItem('user_session'));

    if (!savedUser) {
      alert('Você precisa estar logado para publicar!');
      return;
    }

    if (modal) modal.style.display = 'flex';
  });

  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('user_session'));
    const content = textarea.value.trim();

    if (!content) return;

    const payload = {
      userId: savedUser.id,
      content: content
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        closeModal();
        // Aqui chamaremos a função para recarregar as postagens no feed
        } else {

          alert('Erro ao criar publicação.');
        }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });
}