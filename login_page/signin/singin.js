document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    // Fake user database (Replace with actual backend check)
    const users = {
        "lamsaldiwas1118@gmail.com": "password123",
        "user@example.com": "mypassword"
    };

    // Show/Hide Password Toggle
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");
        }
    });

    // Form submission event
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting

        const email = document.getElementById("email").value;
        const password = passwordInput.value;

        if (users[email] && users[email] === password) {
            console.log("Login successful!");
            window.location.href = "../../main_page/index.html"; // Redirect on success
        } else {
            errorMessage.textContent = "Invalid email or password!";
            errorMessage.style.display = "block";
        }
    });
});
