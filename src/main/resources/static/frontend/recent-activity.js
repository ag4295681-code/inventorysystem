// ===== RECENT ACTIVITY =====
 
const ACTIVITY_API = "http://localhost:8080/api/dashboard/recent-activity";
 
// Color dot class har activity type ke liye (tumhare style.css mein already defined hain)
const activityColors = {
    PRODUCT:     "blue",
    ORDER:       "green",
    CUSTOMER:    "purple",
    TRANSACTION: "orange"
};
 
// "2026-06-27T15:38:45" ko "2 mins ago" jaisa banane wala function
function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
 
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
 
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
 
async function loadRecentActivity() {
    const container = document.getElementById("recentActivity");
    if (!container) return; // agar yeh page pe nahi hai to kuch na karo
 
    try {
        const res = await fetch(ACTIVITY_API);
        const activities = await res.json();
 
        if (activities.length === 0) {
            container.innerHTML = `<p class="activity-text" style="color:#94a3b8;">No recent activity yet.</p>`;
            return;
        }
 
        container.innerHTML = activities.map(activity => {
            const dotColor = activityColors[activity.type] || "blue";
            return `
                <div class="activity-item">
                    <span class="activity-dot ${dotColor}"></span>
                    <div>
                        <p class="activity-text">${activity.message}</p>
                        <p class="activity-time">${timeAgo(activity.timestamp)}</p>
                    </div>
                </div>
            `;
        }).join("");
 
    } catch (err) {
        console.error("Error fetching recent activity:", err);
        container.innerHTML = `<p class="activity-text" style="color:#ef4444;">Could not load activity.</p>`;
    }
}
 
// Page load hote hi activity fetch karo
document.addEventListener("DOMContentLoaded", loadRecentActivity);
 
// Optional: har 30 second mein auto-refresh ho jaye
setInterval(loadRecentActivity, 30000);
 