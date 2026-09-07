export function renderRegisterModal() {
  const container = document.getElementById("register-modal-container");
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="registerModal">
      <div class="auth-card">
        <div class="auth-header">
          <h3>Criar Nova Conta</h3>
          <button class="close-modal" id="closeRegisterBtn" type="button">&times;</button>
        </div>
        <form class="auth-form" id="registerForm">
          <div class="form-group">
            <label for="regName">Nome Completo</label>
            <input type="text" id="regName" placeholder="Seu nome" required>
          </div>
          <div class="form-group">
            <label for="regEmail">E-mail</label>
            <input type="email" id="regEmail" placeholder="seu@email.com" required>
          </div>
          <div class="form-group">
            <label for="regPassword">Senha</label>
            <input type="password" id="regPassword" placeholder="Mínimo 6 caracteres" required>
          </div>
          <button class="btn-submit" type="submit">Criar Conta</button>
        </form>
        <div class="auth-toggle-text">
          Já possui uma conta? <span id="switchToLogin">Entre aqui</span>
        </div>
      </div>
    </div>
  `;

  // Eventos internos do modal de Cadastro
  const modal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeRegisterBtn");
  const form = document.getElementById("registerForm");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }

  // Bloco atualizado com fetch para o back-end em memória
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Exibe erros informados pelo back-end (ex: "E-mail já cadastrado!")
          alert(data.error || "Erro ao realizar o cadastro.");
          return;
        }

        // Sucesso no cadastro
        alert(
          data.message ||
            "Conta criada com sucesso! Faça login para continuar.",
        );

        form.reset();
        modal.classList.remove("active");

        // Dispara o modal de login automaticamente para facilitar a vida do usuário
        const openLoginBtn = document.getElementById("openLoginBtn");
        if (openLoginBtn) openLoginBtn.click();
      } catch (error) {
        console.error("[REGISTER ERROR]", error);
        alert(
          "Não foi possível conectar ao servidor. Verifique se o back-end está rodando.",
        );
      }
    });
  }
}
