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
 
// ===== LOAD WAREHOUSE DATA =====
async function loadWarehouse() {
    try {
        const res = await fetch(API);
        const products = await res.json();
 
        const table = document.getElementById("warehouseTable");
        table.innerHTML = "";
 
        let healthy = 0;
        let low = 0;
 
        if (products.length === 0) {
            table.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8; padding:20px;">No products found</td></tr>`;
        }
 
        products.forEach(p => {
            const threshold = p.lowStockThreshold || 10;
            const isLow = p.quantity <= threshold;
            if (isLow) low++; else healthy++;
 
            table.innerHTML += `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.category || '-'}</td>
                <td style="color:${isLow ? '#ef4444' : '#374151'}; font-weight:${isLow ? '700' : '400'}">
                    ${p.quantity}
                </td>
                <td>
                    ${isLow
                        ? '<span style="background:#fee2e2; color:#dc2626; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600;">⚠️ LOW STOCK</span>'
                        : '<span style="background:#dcfce7; color:#16a34a; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600;">OK</span>'}
                </td>
            </tr>`;
        });
 
        document.getElementById("totalItems").innerText = products.length;
        document.getElementById("healthyStock").innerText = healthy;
        document.getElementById("lowStockCount").innerText = low;
 
    } catch (err) {
        console.error("Warehouse load error:", err);
    }
}
 
loadWarehouse();
 
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
 