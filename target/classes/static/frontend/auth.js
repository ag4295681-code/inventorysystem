document
  .getElementById("loginForm")
  .addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("username").value; // field ka naam username hai but email bhejenge
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })  // email bhej rahe hain
      });

      const data = await response.json();

      if (response.ok) {
        // User info save karo
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", data.name);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userEmail", data.email);

        window.location.href = "dashboard.html";

      } else {
        alert(data.message); // "Email not found" ya "Incorrect password"
      }

    } catch (error) {
      alert("Server se connect nahi ho pa raha!");
      console.error(error);
    }
});