document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("frm-login");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorDisplay = document.getElementById("frm-login-error");

  // Check login status when page loads
  checkLoginStatus();

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email and password
    const user = users.find(
      (u) => u.email === emailInput.value && u.password === passwordInput.value
    );

    if (user) {
      // Store logged-in user data in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Redirect to the homepage (index.html)
      window.location.href = "../index.html";
    } else {
      // Display error message if user not found
      errorDisplay.textContent = "Invalid email or password.";
    }
  });

  // Function to check the login status
  function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const loginNav = document.getElementById("nav-item-login");
    const logoutNav = document.getElementById("nav-item-logout");
    const userWelcome = document.getElementById("user-welcome");
    const usernameDisplay = document.getElementById("username");
    const profileLink = document.getElementById("profile-link");

    if (loggedInUser) {
      // User is logged in
      if (userWelcome) userWelcome.classList.remove("d-none");
      if (usernameDisplay) usernameDisplay.textContent = loggedInUser.email;
      if (loginNav) loginNav.classList.add("d-none");
      if (logoutNav) logoutNav.classList.remove("d-none");
      if (profileLink) profileLink.classList.remove("d-none");
    } else {
      // User is not logged in
      if (userWelcome) userWelcome.classList.add("d-none");
      if (loginNav) loginNav.classList.remove("d-none");
      if (logoutNav) logoutNav.classList.add("d-none");
      if (profileLink) profileLink.classList.add("d-none");
    }
  }

  // Logout function
  window.logout = function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "login.html";
  };
});