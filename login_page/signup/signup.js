document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  // Toggle password visibility for both password fields
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const passwordInput = document.getElementById(targetId);
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        passwordInput.type = "password";
        this.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  // Form submission: Check if passwords match
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual submission

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match!";
      errorMessage.style.display = "block";
      return;
    }

    // If needed, you can add further validations or backend calls here.
    alert("Account created successfully!");
    // window.location.href = "dashboard.html"; // Redirect after successful sign up (optional)
  });
});
