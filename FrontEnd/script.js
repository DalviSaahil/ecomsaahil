function requireLoginPopup() {
  if (!localStorage.getItem("currentUser")) {
    if (typeof openModal === "function") {
      openModal();
    }
    return false;
  }
  return true;
}

function addToCart(name, price) {
  if (!requireLoginPopup()) return;

  let qtyInput = document.getElementById("qty");
  let qty = qtyInput ? parseInt(qtyInput.value) : 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, qty });

  alert("Added to cart 🛒");
}

function openProduct(id) {
  window.location.href = "singleProduct.html?id=" + id;
}

function searchProducts() {
  let value = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });
}

function filterCategory(cat) {
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      cat === "all" || card.dataset.category === cat
        ? "block"
        : "none";
  });
}

async function addToWishlist(product) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      })
    });

    if (res.ok) {
      alert("Added to wishlist ❤️");
    } else {
      alert("Failed to add to wishlist");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
}
