document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("frm-register");
    const nameInput = document.getElementById("frm-register-name");
    const emailInput = document.getElementById("frm-register-email");
    const passwordInput = document.getElementById("frm-register-password");
    const passwordConfirmInput = document.getElementById(
      "frm-register-password-confirm"
    );
    const errorDisplay = document.getElementById("frm-register-error");
  
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      if (passwordInput.value !== passwordConfirmInput.value) {
        errorDisplay.innerHTML = "Passwords do not match";
        return;
      }
  
      // Create a new user
      const userData = {
        fullName: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find((user) => user.email === userData.email)) {
        errorDisplay.innerHTML = "Email is already registered";
        return;
      }
  
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("User registered successfully! Please login.");
      window.location.href = "login.html";
    });
  });