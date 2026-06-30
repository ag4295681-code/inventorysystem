const AUTH_API = "http://localhost:8080/api/auth";

// ===== AUTH CHECK =====
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/frontend/index.html";
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    window.location.href = "/frontend/index.html";
}

// ===== LOAD PROFILE =====
async function loadProfile() {
    const name    = localStorage.getItem("currentUser");
    const email   = localStorage.getItem("userEmail");
    const userId  = localStorage.getItem("userId");

    // Display name aur email
    if (document.getElementById("profileName"))
        document.getElementById("profileName").innerText = name || "User";
    if (document.getElementById("profileEmail"))
        document.getElementById("profileEmail").innerText = email || "";

    // Edit form pre-fill
    if (document.getElementById("editName"))
        document.getElementById("editName").value = name || "";
    if (document.getElementById("editEmail"))
        document.getElementById("editEmail").value = email || "";

    // Avatar update
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
        document.getElementById("profileImage").src = savedImage;
    } else if (name) {
        document.getElementById("profileImage").src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=120`;
    }

    // Backend se bhi load karo agar userId hai
    if (userId) {
        try {
            const res = await fetch(`${AUTH_API}/profile/${userId}`);
            const data = await res.json();
            if (data.name) {
                document.getElementById("profileName").innerText = data.name;
                document.getElementById("editName").value = data.name;
            }
            if (data.email) {
                document.getElementById("profileEmail").innerText = data.email;
                document.getElementById("editEmail").value = data.email;
            }
        } catch (err) {
            console.error("Profile load error:", err);
        }
    }
}

// ===== UPDATE PROFILE =====
async function updateProfile() {
    const userId = localStorage.getItem("userId");
    const name   = document.getElementById("editName").value;
    const email  = document.getElementById("editEmail").value;

    if (!name || !email) {
        alert("Name aur Email zaroori hain!");
        return;
    }

    if (!userId) {
        // Sirf localStorage update karo
        localStorage.setItem("currentUser", name);
        localStorage.setItem("userEmail", email);
        document.getElementById("profileName").innerText = name;
        document.getElementById("profileEmail").innerText = email;
        alert("Profile updated!");
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}/profile/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("currentUser", data.name);
            localStorage.setItem("userEmail", data.email);
            document.getElementById("profileName").innerText = data.name;
            document.getElementById("profileEmail").innerText = data.email;
            alert("✅ Profile updated successfully!");
        } else {
            alert(data.message || "Update nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== CHANGE PASSWORD =====
async function changePassword() {
    const userId      = localStorage.getItem("userId");
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    if (!oldPassword || !newPassword) {
        alert("Dono passwords zaroori hain!");
        return;
    }

    if (!userId) {
        alert("Login karke try karo!");
        return;
    }

    try {
        const res = await fetch(`${AUTH_API}/change-password/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        const data = await res.json();
        if (res.ok) {
            alert("✅ Password changed successfully!");
            document.getElementById("oldPassword").value = "";
            document.getElementById("newPassword").value = "";
        } else {
            alert(data.message || "Password change nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== PROFILE IMAGE UPLOAD =====
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileImage").src = e.target.result;
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// ===== THEME =====
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// ===== LOAD =====
loadProfile();