function logout()
{
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "index.html";
}