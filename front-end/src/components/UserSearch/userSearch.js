export function initUserSearch() {
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('resultsContainer');
  let debounceTimer = null;

  if (!searchInput || !resultsContainer) return;

  async function searchUsers(query) {
    if (!query.trim()) {
      resultsContainer.innerHTML = '<div class="state-message">Digite algo para iniciar a busca.</div>';
      return;
    }

    resultsContainer.innerHTML = '<div class="state-message">Buscando...</div>';

    try {
      const response = await fetch(`/api/users/search?name=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Falha na requisição');
      }

      const users = await response.json();
      renderResults(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      resultsContainer.innerHTML = '<div class="state-message">Ocorreu um erro ao buscar usuários.</div>';
    }
  }

  function renderResults(users) {
    if (users.length === 0) {
      resultsContainer.innerHTML = '<div class="state-message">Nenhum usuário encontrado.</div>';
      return;
    }

    resultsContainer.innerHTML = users.map(user => `
      <div class="user-card">
        <div class="user-info">
          <div class="avatar-placeholder">
            ${user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div class="user-details">
            <div class="user-name">${user.name}</div>
            <div class="user-email">${user.email || ''}</div>
          </div>
        </div>
        <a href="/perfil.html?id=${user.id}" class="btn-view-profile">Ver perfil</a>
      </div>
    `).join('');
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value;
    debounceTimer = setTimeout(() => {
      searchUsers(query);
    }, 300);
  });
}