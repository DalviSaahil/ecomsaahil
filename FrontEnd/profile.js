document.addEventListener("DOMContentLoaded", fetchUserProfile);

async function fetchUserProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            if (res.status === 401) {
                logout();
                return;
            }
            throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        document.getElementById("userName").innerText = data.user.name;
        document.getElementById("userEmail").innerText = data.user.email;



    } catch (error) {
        console.error("Profile Fetch Error:", error);
        document.getElementById("userName").innerText = "Error: " + error.message;
        document.getElementById("userEmail").innerText = "Please check console/network";
    }
}
