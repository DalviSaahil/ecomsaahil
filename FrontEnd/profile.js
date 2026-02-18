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
// ----------------
// Load saved image
document.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem("profileImage");

    const uploadButton=document.getElementById("uploadbtn")
    if (savedImage) {
        document.getElementById("profileImage").src = savedImage;
        if(uploadButton){
            uploadButton.style.display="none"
        }
    }
});

// Upload image from device
const imageInput = document.getElementById("imageUpload");

if (imageInput) {
    imageInput.addEventListener("change", function () {

        const file = this.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageData = e.target.result;
            document.getElementById("profileImage").src = imageData;
            localStorage.setItem("profileImage", imageData);
        };

        reader.readAsDataURL(file);
    });
}