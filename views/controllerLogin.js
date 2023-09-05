document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");
  const successMsg = document.getElementById("success-msg");
  const btnSubmit = document.getElementById("btn-submit");
  const togglePasswordBtn = document.getElementById("toggle-password");
  const passwordInput = loginForm.querySelector('input[name="pwd"]');
  const loadingOverlay = document.getElementById("loading-overlay");

  togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
    togglePasswordBtn.querySelector("svg").classList.toggle("bi-eye");
    togglePasswordBtn.querySelector("svg").classList.toggle("bi-eye-slash");
  });

  btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = loginForm.user.value;
    const password = passwordInput.value;

    if (user === "admin" && password === "200116") {
      loadingOverlay.classList.remove("visually-hidden");
      successMsg.classList.add("visually-hidden");
      errorMsg.classList.add("visually-hidden");

      await new Promise((resolve) => setTimeout(resolve, 1400));

      window.location.href = "product.html";
    } else {
      loadingOverlay.classList.add("visually-hidden");
      successMsg.classList.add("visually-hidden");
      errorMsg.classList.remove("visually-hidden");
    }
  });
});
