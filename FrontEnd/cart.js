// ================= CONFIG =================
const CART_API = "http://localhost:5000/api/cart";
const cartBox = document.getElementById("cartItems"); // Matches cart.html
const totalAmountSpan = document.getElementById("totalAmount");

// ================= LOGIN CHECK =================
const token = localStorage.getItem("token");
if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// ================= FETCH CART =================
async function fetchCart() {
  try {
    const res = await fetch(CART_API, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (res.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      sessionStorage.clear();
      window.location.href = "login.html";
      return;
    }

    const data = await res.json();
    renderCart(data.items || []);
  } catch (err) {
    console.error("Failed to fetch cart", err);
  }
}


// ================= RENDER CART =================
function renderCart(items) {
  cartBox.innerHTML = "";

  if (!items.length) {
    cartBox.innerHTML = "<p>Your cart is empty 🛒</p>";
    totalAmountSpan.innerText = "0";
    return;
  }

  let total = 0;

  items.forEach(item => {
    // Ensure item.price is a number
    const price = Number(item.price) || 0;
    const quantity = item.quantity || 1;
    const itemTotal = price * quantity;
    total += itemTotal;

    cartBox.innerHTML += `
      <div class="cart-item">
        <img src="${item.image || 'logo.png'}" class="cart-img">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>Price: $${price} x ${quantity}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.productId}')">
          Remove
        </button>
      </div>
    `;
  });

  totalAmountSpan.innerText = total;
}

// ================= REMOVE ITEM =================
async function removeFromCart(productId) {
  try {
    await fetch(`${CART_API}/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchCart();
  } catch (err) {
    console.error("Remove from cart failed", err);
  }
}

// ================= INIT =================
fetchCart();
