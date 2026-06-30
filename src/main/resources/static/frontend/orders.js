const API = "http://localhost:8080/api/orders";

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

// ===== FETCH ALL ORDERS =====
async function fetchOrders() {
    try {
        const res = await fetch(API);
        const orders = await res.json();
        displayOrders(orders);
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DISPLAY ORDERS =====
function displayOrders(orders) {
    const table = document.getElementById("orderTable");
    table.innerHTML = "";

    if (orders.length === 0) {
        table.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#94a3b8; padding:20px;">No orders found</td></tr>`;
        return;
    }

    orders.forEach(o => {
        const statusColor = {
            PENDING:   '#ea580c',
            CONFIRMED: '#2563eb',
            DELIVERED: '#16a34a',
            CANCELLED: '#dc2626'
        }[o.status] || '#64748b';

        const date = o.orderDate ? new Date(o.orderDate).toLocaleDateString('en-IN') : '-';

        table.innerHTML += `
        <tr>
            <td>${o.id}</td>
            <td>${o.customerName || '-'}</td>
            <td>${o.productName || '-'}</td>
            <td>${o.companyName || '-'}</td>
            <td>${o.quantity}</td>
            <td>₹${o.totalPrice}</td>
            <td>${date}</td>
            <td>
                <span style="background:${statusColor}22; color:${statusColor}; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600;">
                    ${o.status}
                </span>
            </td>
            <td style="display:flex; gap:6px;">
                <select onchange="updateStatus(${o.id}, this.value)"
                    style="padding:5px; border:1px solid #e2e8f0; border-radius:6px; font-size:12px;">
                    <option ${o.status==='PENDING'?'selected':''} value="PENDING">Pending</option>
                    <option ${o.status==='CONFIRMED'?'selected':''} value="CONFIRMED">Confirmed</option>
                    <option ${o.status==='DELIVERED'?'selected':''} value="DELIVERED">Delivered</option>
                    <option ${o.status==='CANCELLED'?'selected':''} value="CANCELLED">Cancelled</option>
                </select>
                <button onclick="deleteOrder(${o.id})"
                    style="padding:5px 10px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;">
                    🗑️
                </button>
            </td>
        </tr>`;
    });
}

// ===== ADD ORDER =====
async function addOrder() {
    const customerName = document.getElementById("customerName").value;
    const customerId   = document.getElementById("customerId").value;
    const productName  = document.getElementById("productName").value;
    const productId    = document.getElementById("productId").value;
    const companyName  = document.getElementById("companyName").value;
    const quantity     = document.getElementById("quantity").value;
    const totalPrice   = document.getElementById("totalPrice").value;
    const status       = document.getElementById("status").value;

    if (!customerName || !productName || !quantity) {
        alert("Customer Name, Product Name aur Quantity zaroori hain!");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerName, customerId: customerId || null,
                productName, productId: productId || null,
                companyName, quantity: parseInt(quantity),
                totalPrice: parseFloat(totalPrice) || 0,
                status
            })
        });

        if (res.ok) {
            ["customerName","customerId","productName","productId",
             "companyName","quantity","totalPrice"]
            .forEach(id => document.getElementById(id).value = "");
            document.getElementById("status").value = "PENDING";
            fetchOrders();
        } else {
            alert("Order add nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== UPDATE STATUS =====
async function updateStatus(id, status) {
    try {
        await fetch(`${API}/${id}/status?status=${status}`, {
            method: "PUT"
        });
        fetchOrders();
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DELETE ORDER =====
async function deleteOrder(id) {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (res.ok) fetchOrders();
        else alert("Delete nahi hua!");
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== SEARCH =====
function searchOrder() {
    const query = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#orderTable tr");
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
fetchOrders();