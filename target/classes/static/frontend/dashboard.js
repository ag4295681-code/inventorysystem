// ===== AUTH CHECK =====
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/frontend/index.html";
}

// ===== WELCOME NAME =====
const user = localStorage.getItem("currentUser");
if (user) {
    document.getElementById("welcomeName").textContent = user;
    if (document.getElementById("welcome")) {
        document.getElementById("welcome").innerText = "Welcome, " + user;
    }
}

// ===== DATE =====
const now = new Date();
if (document.getElementById("currentDate")) {
    document.getElementById("currentDate").textContent =
        now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    window.location.href = "/frontend/index.html";
}

// ===== FETCH DATA FROM BACKEND =====
const API = "http://localhost:8080/api";

async function loadDashboard() {
    try {
        // Products count
        const productsRes = await fetch(`${API}/products`);
        const products = await productsRes.json();
        document.getElementById("totalProducts").innerText = products.length;
        if (document.getElementById("heroProducts"))
            document.getElementById("heroProducts").innerText = products.length;

        // Orders count
        const ordersRes = await fetch(`${API}/orders`);
        const orders = await ordersRes.json();
        document.getElementById("totalOrders").innerText = orders.length;
        if (document.getElementById("heroOrders"))
            document.getElementById("heroOrders").innerText = orders.length;

        // Customers count
        const customersRes = await fetch(`${API}/customers`);
        const customers = await customersRes.json();
        document.getElementById("totalCustomers").innerText = customers.length;
        if (document.getElementById("heroCustomers"))
            document.getElementById("heroCustomers").innerText = customers.length;

        // Revenue calculate karo
        let revenue = 0;
        products.forEach(p => {
            revenue += Number(p.price || 0) * Number(p.quantity || p.qty || 0);
        });
        document.getElementById("totalRevenue").innerText = "₹" + revenue.toLocaleString('en-IN');

    } catch (err) {
        console.error("Dashboard load error:", err);
    }
}

loadDashboard();

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