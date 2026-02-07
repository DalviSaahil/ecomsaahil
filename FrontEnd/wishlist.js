// ================= CONFIG =================
const WISHLIST_API = "http://localhost:5000/api/wishlist";
const wishlistBox = document.getElementById("wishlistItems");

// ================= LOGIN CHECK =================
const token = localStorage.getItem("token");
if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

// ================= FETCH WISHLIST =================
async function fetchWishlist() {
  try {
    const res = await fetch(WISHLIST_API, {
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
    console.log("Wishlist Data:", data); // Debugging
    renderWishlist(data.products || data);
  } catch (err) {
    console.error("Wishlist fetch failed", err);
  }
}

// ================= RENDER WISHLIST =================
function renderWishlist(products) {
  wishlistBox.innerHTML = "";

  if (!products || products.length === 0) {
    wishlistBox.innerHTML = "<p>Your wishlist is empty ❤️</p>";
    return;
  }

  products.forEach(item => {
    wishlistBox.innerHTML += `
      <div class="wishlist-card">
        <img src="${item.image || 'logo.png'}" class="wishlist-img">
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
        
        <div class="wishlist-actions">
           <button class="remove-btn" onclick="removeFromWishlist('${item.productId || item._id}')">
            Remove
          </button>
        </div>
      </div>
    `;
  });
}

// ================= REMOVE ITEM =================
async function removeFromWishlist(productId) {
  try {
    const res = await fetch(`${WISHLIST_API}/remove/${productId}`, {
      method: "DELETE",
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

    if (!res.ok) {
      const errData = await res.json();
      console.error("Remove error response:", errData);
      alert("Remove failed: " + errData.message);
      return;
    }

    fetchWishlist();
  } catch (err) {
    console.error("Remove failed", err);
  }
}

// ================= INIT =================
fetchWishlist();
