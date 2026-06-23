document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(username !== "" && password !== "")
    {
        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "currentUser",
            username
        );

        window.location.href =
        "dashboard.html";
    }
    else
    {
        alert("Please enter username and password");
    }

});