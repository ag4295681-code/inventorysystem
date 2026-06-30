const API = "http://localhost:8080/api/analytics/summary";
 
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
 
// ===== LOAD ANALYTICS =====
async function loadAnalytics() {
    try {
        const res = await fetch(API);
        const data = await res.json();
 
        document.getElementById("totalIn").innerText = data.totalIn;
        document.getElementById("totalOut").innerText = data.totalOut;
        document.getElementById("netStock").innerText = data.netStock;
        document.getElementById("totalTransactions").innerText = data.totalTransactions;
 
        renderChart(data.topProducts);
        renderBreakdown(data.topProducts);
 
    } catch (err) {
        console.error("Analytics load error:", err);
    }
}
 
// ===== CHART =====
function renderChart(topProducts) {
    const ctx = document.getElementById("movementChart");
 
    if (!topProducts || topProducts.length === 0) {
        return;
    }
 
    const labels = topProducts.map(p => p.product);
    const inData = topProducts.map(p => p.in);
    const outData = topProducts.map(p => p.out);
 
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Stock In",
                    data: inData,
                    backgroundColor: "#059669"
                },
                {
                    label: "Stock Out",
                    data: outData,
                    backgroundColor: "#ea580c"
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
 
// ===== BREAKDOWN TABLE =====
function renderBreakdown(topProducts) {
    const container = document.getElementById("productBreakdown");
 
    if (!topProducts || topProducts.length === 0) {
        container.innerHTML = `<p style="color:#94a3b8; font-size:13px;">No transaction data yet.</p>`;
        return;
    }
 
    container.innerHTML = topProducts.map(p => `
        <div class="activity-item">
            <span class="activity-dot ${p.in >= p.out ? 'green' : 'orange'}"></span>
            <div>
                <p class="activity-text">${p.product}</p>
                <p class="activity-time">In: ${p.in} | Out: ${p.out}</p>
            </div>
        </div>
    `).join("");
}
 
loadAnalytics();
 
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
 