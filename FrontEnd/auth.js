const API = "http://localhost:5000/api/auth";

// ================= LOGIN STATE =================
function isLoggedIn() {
  return !!localStorage.getItem("token");
}


function getUserName() {
  return localStorage.getItem("userName") || sessionStorage.getItem("userName");
}
function updateNavbar() {
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const profileMenu = document.getElementById("profileMenu");
  const profileName = document.getElementById("profileName");
  const navProfileImg = document.getElementById("navProfileImg");


  if (isLoggedIn()) {
    profileMenu.style.display = "flex"; // Changed to flex for alignment
    profileMenu.style.alignItems = "center";


    const name = getUserName();
    profileName.innerText = name;


    // Load image
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage && navProfileImg) {
      navProfileImg.src = savedImage;
      navProfileImg.style.display = "block";
    } else if (navProfileImg) {
      navProfileImg.src = "default-avatar.png"; // Fallback
    }


    loginLink.style.display = "none";
    signupLink.style.display = "none";
  } else {
    profileMenu.style.display = "none";
    loginLink.style.display = "inline";
    signupLink.style.display = "inline";
  }
}


document.addEventListener("DOMContentLoaded", updateNavbar);


// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown && dropdown.style.display === "block" && !e.target.closest(".profile-menu")) {
    dropdown.style.display = "none";
  }
});
function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
}
// ================= SIGNUP =================
async function signupUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }
if (!isStrongPassword(password)) {
  alert("Password must be 8+ chars, include uppercase, number & special char");
  return;
}
  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Signup failed");
    }
  } catch {
    alert("Server not reachable");
  }
}

// ================= LOGIN =================
async function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email and password required");
    return;
  }

  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // 🔐 REAL AUTH (used by cart & backend)
      localStorage.setItem("token", data.token);

      // 👤 UI LOGIN STATE (used by header)
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userName", data.user?.name || data.name);
      localStorage.setItem("userName", data.user?.name || data.name);
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch {
    alert("Server error");
  }
}
function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// ================= LOGOUT =================
function logout() {
  // 🔥 REMOVE REAL AUTH
  localStorage.removeItem("token");
  localStorage.removeItem("userName");

  // 🔥 REMOVE UI STATE
  sessionStorage.clear();
  alert("Logged Out Successfully")
  window.location.href = "login.html";
}