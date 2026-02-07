const PRODUCTS_API = "http://localhost:5000/api/products";
const WISHLIST_API = "http://localhost:5000/api/wishlist/add";


const productBox = document.getElementById("productList");
document.addEventListener("DOMContentLoaded", loadProducts);


// ================= FETCH PRODUCTS =================
async function loadProducts() {
  try {
    const res = await fetch(PRODUCTS_API);

    const products = await res.json();

    productBox.innerHTML = "";

    products.forEach(p => {
      productBox.innerHTML += `
        <div class="card" data-category="${p.category}">
          <img src="${p.image || 'logo.png'}">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>

          <button onclick="openProduct('${p._id}')">View</button>

          <button onclick='protectedWishlist(${JSON.stringify(p)})'>
            ❤️ Wishlist
          </button>
        </div>
      `;
    });
  } catch (err) {
    console.error("Failed to load products", err);
    productBox.innerHTML = "<p>Failed to load products</p>";
  }
}

// ================= OPEN PRODUCT =================
function openProduct(id) {
  window.location.href = `singleproduct.html?id=${id}`;
}

// ================= ADD TO WISHLIST =================
function addToWishlist(product) {
  fetch(WISHLIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    }),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.success ? "❤️ Added to wishlist" : data.message);
    })
    .catch(() => alert("Wishlist error"));
}

// ================= AUTH GUARD =================
function protectedWishlist(product) {
  if (!isLoggedIn()) {
    openModal();
    return;
  }
  addToWishlist(product);
}
