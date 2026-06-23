if(localStorage.getItem("loggedIn") !== "true")
{
    window.location.href = "index.html";
}

const user =
localStorage.getItem("currentUser");

document.getElementById("welcome")
.innerText =
"Welcome, " + user;

function logout()
{
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href =
    "index.html";
}

/* Products Count */

const products =
JSON.parse(
localStorage.getItem("products")
) || [];

document.getElementById(
"totalProducts"
).innerText =
products.length;

/* Orders Count */

const orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

document.getElementById(
"totalOrders"
).innerText =
orders.length;

/* Customers Count */

const customers =
JSON.parse(
localStorage.getItem("customers")
) || [];

document.getElementById(
"totalCustomers"
).innerText =
customers.length;
let revenue = 0;

products.forEach(product => {

    revenue +=
    Number(product.qty) *
    Number(product.price);

});

document.getElementById(
    "totalRevenue"
).innerText =
"₹" + revenue;

function toggleTheme()
{
    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    )
    {
        localStorage.setItem(
            "theme",
            "dark"
        );
    }
    else
    {
        localStorage.setItem(
            "theme",
            "light"
        );
    }
}

if(
    localStorage.getItem("theme")
    === "dark"
)
{
    document.body.classList.add(
        "dark-mode"
    );
}