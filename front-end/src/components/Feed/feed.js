// src/components/Feed/feed.js

export async function renderFeed() {
  const postsContainer = document.getElementById('posts-container');
  const emptyState = document.getElementById('empty-state');

  if (!postsContainer) return;

  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();

    // Se não houver dados ou o array estiver vazio, exibe o emptyState
    if (!posts || posts.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    // Esconde o empty-state quando houver publicações
    if (emptyState) emptyState.style.display = 'none';

    // Remove posts renderizados anteriormente para evitar duplicidade
    postsContainer.querySelectorAll('.post-card').forEach(card => card.remove());

    // Injeta cada post obtido do servidor
    posts.forEach(post => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';

      const formattedTime = new Date(post.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Pega a inicial do usuário para o placeholder do Avatar
      const authorName = post.userName || 'Usuário';
      const userInitial = authorName.charAt(0).toUpperCase();

      postCard.innerHTML = `
        <!-- HEADER DO POST -->
        <header class="post-header">
          <div class="post-user-info">
            <div class="user-avatar">${userInitial}</div>
            <div class="user-details">
              <strong class="post-author">${authorName}</strong>
              <time class="post-time">${formattedTime}</time>
            </div>
          </div>
          <button class="btn-follow js-dev-action" type="button">Seguir</button>
        </header>

        <!-- CORPO DO POST -->
        <main class="post-body">
          <p class="post-content">${post.content}</p>
        </main>

        <!-- FOOTER COM AÇÕES DA INTERAÇÃO -->
        <footer class="post-footer">
          <div class="post-actions-left">
            <button class="action-btn js-dev-action" title="Curtir" aria-label="Curtir">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            <button class="action-btn js-dev-action" title="Comentar" aria-label="Comentar">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </button>
            <button class="action-btn js-dev-action" title="Compartilhar" aria-label="Compartilhar">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
          <div class="post-actions-right">
            <button class="action-btn js-dev-action" title="Salvar" aria-label="Salvar">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            </button>
          </div>
        </footer>
      `;

      postsContainer.appendChild(postCard);
    });
    
    // Delegation de clique para avisar sobre funcionalidades em desenvolvimento
    postsContainer.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.js-dev-action');
      if (targetBtn) {
        alert('Esta funcionalidade ainda está em desenvolvimento!');
      }
    });

  } catch (error) {
    console.error('Erro ao carregar o feed:', error);
  }
}