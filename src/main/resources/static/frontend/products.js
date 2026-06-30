const API = "http://localhost:8080/api/products";

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

// ===== FETCH ALL PRODUCTS =====
async function fetchProducts() {
    try {
        const res = await fetch(API);
        const products = await res.json();
        displayProducts(products);
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DISPLAY PRODUCTS =====
function displayProducts(products) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    if (products.length === 0) {
        table.innerHTML = `<tr><td colspan="11" style="text-align:center; color:#94a3b8; padding:20px;">No products found</td></tr>`;
        return;
    }

    products.forEach(p => {
        const isLow = p.quantity <= (p.lowStockThreshold || 10);
        const statusColor = p.legalStatus === 'LICENSED' ? '#16a34a' :
                           p.legalStatus === 'RESTRICTED' ? '#ea580c' : '#dc2626';

        table.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td><strong>${p.name}</strong></td>
            <td style="color:${isLow ? '#ef4444' : '#374151'}; font-weight:${isLow ? '700' : '400'}">
                ${p.quantity} ${isLow ? '⚠️' : ''}
            </td>
            <td>₹${p.price}</td>
            <td>${p.category || '-'}</td>
            <td>${p.companyName || '-'}</td>
            <td>${p.licenseNumber || '-'}</td>
            <td>${p.expiryDate || '-'}</td>
            <td><span style="background:${statusColor}22; color:${statusColor}; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600;">${p.legalStatus}</span></td>
            <td>${isLow ? '<span style="color:#ef4444; font-size:12px; font-weight:600;">LOW STOCK</span>' : '<span style="color:#16a34a; font-size:12px;">OK</span>'}</td>
            <td>
                <button onclick="deleteProduct(${p.id})"
                    style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px;">
                    🗑️ Delete
                </button>
            </td>
        </tr>`;
    });
}

// ===== ADD PRODUCT =====
async function addProduct() {
    const name     = document.getElementById("productName").value;
    const quantity = document.getElementById("productQty").value;
    const price    = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;
    const companyName    = document.getElementById("productCompany").value;
    const licenseNumber  = document.getElementById("productLicense").value;
    const expiryDate     = document.getElementById("productExpiry").value;
    const legalStatus    = document.getElementById("productLegalStatus").value;
    const lowStockThreshold = document.getElementById("productLowStock").value || 10;

    if (!name || !quantity || !price) {
        alert("Name, Quantity aur Price zaroori hain!");
        return;
    }

    try {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, quantity: parseInt(quantity),
                price: parseFloat(price),
                category, companyName, licenseNumber,
                expiryDate, legalStatus,
                lowStockThreshold: parseInt(lowStockThreshold)
            })
        });

        if (res.ok) {
            // Form clear karo
            ["productName","productQty","productPrice","productCategory",
             "productCompany","productLicense","productExpiry","productLowStock"]
            .forEach(id => document.getElementById(id).value = "");
            document.getElementById("productLegalStatus").value = "LICENSED";
            fetchProducts();
        } else {
            alert("Product add nahi hua!");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== DELETE PRODUCT =====
async function deleteProduct(id) {
    if (!confirm("Delete karna chahte ho?")) return;
    try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        if (res.ok) fetchProducts();
        else alert("Delete nahi hua!");
    } catch (err) {
        console.error("Error:", err);
    }
}

// ===== SEARCH =====
function searchProduct() {
    const query = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#productTable tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
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
fetchProducts();