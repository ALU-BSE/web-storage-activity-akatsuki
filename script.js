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
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
      const product = button.getAttribute("data-product");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.parentElement.querySelector("img").src;

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.product === product);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ product, price, quantity: 1, image });
      }

      sessionStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = cart
      .map(
          (item, index) => `
      <li>
          <img src="${item.image}" alt="${item.product}">
          <span>${item.product} - $${item.price.toFixed(2)}</span>
          <div class="quantity">
              <button onclick="adjustQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="adjustQuantity(${index}, 1)">+</button>
          </div>
          <button class="removeItem" onclick="removeItem(${index})">Remove</button>
      </li>
  `
      )
      .join("");

  // Update total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

function adjustQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1; // Prevent quantity from going below 1
  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function removeItem(index) {
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// Initialize cart display on page load
updateCartDisplay();

// Security Demo
document.getElementById("secureForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const userInput = document.getElementById("userInput").value;
  const sanitizedInput = encodeURIComponent(userInput);
  document.getElementById("output").textContent = sanitizedInput;
});