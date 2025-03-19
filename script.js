// User Authentication
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
  
    // Set authToken cookie with 7-day expiration
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `authToken=${username}; expires=${expirationDate.toUTCString()}; Secure; HttpOnly; path=/`;
  
    // Show logged-in section
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("loggedInSection").style.display = "block";
    document.getElementById("loggedInUser").textContent = username;
    document.getElementById("loginForm").reset();
  });
  
  // Logout
  document.getElementById("logoutButton").addEventListener("click", function () {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.getElementById("loggedInSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
    alert("Logged out successfully!");
  });
  
  // Theme Customization
  const savedSettings = JSON.parse(localStorage.getItem("settings")) || { theme: "light", fontSize: 16 };
  document.body.classList.add(savedSettings.theme);
  
  document.getElementById("themeToggle").addEventListener("click", function () {
    const currentTheme = document.body.classList.contains("light") ? "dark" : "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(currentTheme);
  
    // Save theme preference
    const settings = { theme: currentTheme, fontSize: savedSettings.fontSize };
    localStorage.setItem("settings", JSON.stringify(settings));
  });
  
  // Shopping Cart
  document.getElementById("addToCart").addEventListener("click", function () {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push({ product: "Book", quantity: 1 });
    sessionStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  });
  
  function updateCartDisplay() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = cart.map(item => `<li>${item.product} (Quantity: ${item.quantity})</li>`).join("");
  }
  
  updateCartDisplay();
  
  // Security Measures
  document.getElementById("secureForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const userInput = document.getElementById("userInput").value;
    const sanitizedInput = encodeURIComponent(userInput);
    document.getElementById("output").textContent = sanitizedInput;
  });
  
  // Add CSRF token to form
  const csrfToken = Math.random().toString(36).substr(2);
  document.getElementById("secureForm").innerHTML += `<input type="hidden" name="csrfToken" value="${csrfToken}">`;