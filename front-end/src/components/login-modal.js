export function renderLoginModal() {
  const container = document.getElementById("login-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="loginModal">
      <div class="auth-card">
        <div class="auth-header">
          <h3>Entrar na Conta</h3>
          <button class="close-modal" id="closeLoginBtn" type="button">&times;</button>
        </div>
        <form class="auth-form" id="loginForm">
          <div class="form-group">
            <label for="loginEmail">E-mail</label>
            <input type="email" id="loginEmail" placeholder="seu@email.com" required>
          </div>
          <div class="form-group">
            <label for="loginPassword">Senha</label>
            <input type="password" id="loginPassword" placeholder="••••••••" required>
          </div>
          <button class="btn-submit" type="submit">Entrar</button>
        </form>
        <div class="auth-toggle-text">
          Ainda não tem conta? <span id="switchToRegister">Cadastre-se</span>
        </div>
      </div>
    </div>
  `;

  // Eventos internos do modal de Login
  const modal = document.getElementById("loginModal");
  const closeBtn = document.getElementById("closeLoginBtn");
  const form = document.getElementById("loginForm");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Exibe a mensagem de erro que veio do back-end (ex: "E-mail ou senha incorretos!")
          alert(data.error || "Erro ao realizar login.");
          return;
        }

        // Sucesso
        alert(`Bem-vindo(a), ${data.user.name}!`);

        // Salva os dados da sessão no navegador
        localStorage.setItem("user_session", JSON.stringify(data.user));

        modal.classList.remove("active");
        form.reset();

        // Recarrega a página para atualizar o estado da Navbar e ir para o Feed
        window.location.reload();
      } catch (error) {
        console.error("[LOGIN ERROR]", error);
        alert(
          "Não foi possível conectar ao servidor. Verifique se o back-end está rodando.",
        );
      }
    });
  }
}
