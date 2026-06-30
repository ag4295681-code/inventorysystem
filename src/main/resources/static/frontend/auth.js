// ===== EMAIL LOGIN =====
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("currentUser", data.name);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("loginType", "email");
            window.location.href = "/frontend/dashboard.html";
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Server se connect nahi ho pa raha!");
        console.error(error);
    }
});

// ===== GOOGLE LOGIN =====
function handleGoogleLogin(response) {
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", payload.name);
    localStorage.setItem("userEmail", payload.email);
    localStorage.setItem("loginType", "google");
    window.location.href = "/frontend/dashboard.html";
}

// ===== GITHUB LOGIN =====
function githubLogin() {
    const clientId = "Ov23li3NWUYr3vNMmdN3";
    const redirectUri = encodeURIComponent("http://localhost:8080/frontend/github-callback.html");
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
}