document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  // for the digits count in phone number 
  const phoneNumberInput = document.getElementById('phone_number');

phoneNumberInput.addEventListener('input', () => {
  const phoneNumber = phoneNumberInput.value;
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength > 10) {
    phoneNumberInput.value = phoneNumber.slice(0, 10); // Truncate to 10 digits
  }

  if (phoneNumberLength === 10) {
    if (phoneNumber.startsWith('98') || phoneNumber.startsWith('97')) {
      phoneNumberInput.setCustomValidity(''); // Valid phone number
    } else {
      phoneNumberInput.setCustomValidity('Phone number must start with 98 or 97');
    }
  } else {
    phoneNumberInput.setCustomValidity('Phone number must be 10 digits');
  }
});

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
  });
});
