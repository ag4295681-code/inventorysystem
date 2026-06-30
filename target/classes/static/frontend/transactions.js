const API = "http://localhost:8080/api/transactions";

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

// ===== FETCH ALL TRANSACTIONS =====
async function fetchTransactions() {
    try {
        const res = await fetch(API);
        const transactions = await res.json();
        displayTransactions(transactions);
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DISPLAY TRANSACTIONS =====
function displayTransactions(transactions) {
    const table = document.getElementById("transactionTable");
    table.innerHTML = "";

    if (transactions.length === 0) {
        table.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8; padding:20px;">No transactions found</td></tr>`;
        return;
    }

    transactions.forEach(t => {
        const isIN = t.type === 'IN';
        const typeColor = isIN ? '#16a34a' : '#dc2626';
        const typeLabel = isIN ? '📥 IN' : '📤 OUT';
        const date = t.date ? new Date(t.date).toLocaleDateString('en-IN') : '-';

        table.innerHTML += `
        <tr>
            <td>${t.id}</td>
            <td>
                <span style="background:${typeColor}22; color:${typeColor}; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600;">
                    ${typeLabel}
                </span>
            </td>
            <td><strong>${t.productName || '-'}</strong></td>
            <td>${t.companyName || '-'}</td>
            <td>${t.quantity}</td>
            <td>${t.note || '-'}</td>
            <td>${date}</td>
            <td>
                <button onclick="deleteTransaction(${t.id})"
                    style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;">
                    🗑️
                </button>
            </td>
        </tr>`;
    });
}

// ===== ADD TRANSACTION =====
async function addTransaction() {
    const productId   = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const companyName = document.getElementById("companyName").value;
    const type        = document.getElementById("type").value;
    const quantity    = document.getElementById("quantity").value;
    const note        = document.getElementById("note").value;

    if (!productName || !quantity || !type) {
        alert("Product Name, Type aur Quantity zaroori hain!");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: productId || null,
                productName, companyName,
                type, quantity: parseInt(quantity),
                note
            })
        });

        if (res.ok) {
            ["productId","productName","companyName","quantity","note"]
                .forEach(id => document.getElementById(id).value = "");
            document.getElementById("type").value = "IN";
            fetchTransactions();
        } else {
            alert("Transaction add nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DELETE TRANSACTION =====
async function deleteTransaction(id) {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (res.ok) fetchTransactions();
        else alert("Delete nahi hua!");
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== SEARCH =====
function searchTransaction() {
    const query = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#transactionTable tr");
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
fetchTransactions();