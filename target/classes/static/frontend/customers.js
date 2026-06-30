const API = "http://localhost:8080/api/customers";

// ===== AUTH CHECK =====
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "/frontend/index.html";
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "/frontend/index.html";
}

// ===== FETCH ALL CUSTOMERS =====
async function fetchCustomers() {
    try {
        const res = await fetch(API);
        const customers = await res.json();
        displayCustomers(customers);
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DISPLAY CUSTOMERS =====
function displayCustomers(customers) {
    const table = document.getElementById("customerTable");
    table.innerHTML = "";

    if (customers.length === 0) {
        table.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8; padding:20px;">No customers found</td></tr>`;
        return;
    }

    customers.forEach(c => {
        table.innerHTML += `
        <tr>
            <td>${c.id}</td>
            <td><strong>${c.name}</strong></td>
            <td>${c.email}</td>
            <td>${c.phone || '-'}</td>
            <td>${c.address || '-'}</td>
            <td>
                <button onclick="deleteCustomer(${c.id})"
                    style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;">
                    🗑️ Delete
                </button>
            </td>
        </tr>`;
    });
}

// ===== ADD CUSTOMER =====
async function addCustomer() {
    const name    = document.getElementById("customerName").value;
    const email   = document.getElementById("customerEmail").value;
    const phone   = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    if (!name || !email) {
        alert("Name aur Email zaroori hain!");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, address })
        });

        if (res.ok) {
            ["customerName","customerEmail","customerPhone","customerAddress"]
                .forEach(id => document.getElementById(id).value = "");
            fetchCustomers();
        } else {
            const data = await res.json();
            alert(data.message || "Customer add nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DELETE CUSTOMER =====
async function deleteCustomer(id) {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (res.ok) fetchCustomers();
        else alert("Delete nahi hua!");
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== SEARCH =====
function searchCustomer() {
    const query = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#customerTable tr");
    rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
    });
}

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
fetchCustomers();