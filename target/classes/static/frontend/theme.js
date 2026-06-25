function toggleTheme()
{
    document.body.classList.toggle("dark-mode");

    const btn =
    document.getElementById("themeToggle");

    if(document.body.classList.contains("dark-mode"))
    {
        localStorage.setItem("theme", "dark");
        btn.innerHTML = "☀️";
    }
    else
    {
        localStorage.setItem("theme", "light");
        btn.innerHTML = "🌙";
    }
}

window.onload = function()
{
    const btn =
    document.getElementById("themeToggle");

    if(btn)
    {
        if(localStorage.getItem("theme") === "dark")
        {
            document.body.classList.add("dark-mode");
            btn.innerHTML = "☀️";
        }
        else
        {
            btn.innerHTML = "🌙";
        }
    }
};