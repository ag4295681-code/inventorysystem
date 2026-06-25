let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

function addOrder()
{
    const customer =
    document.getElementById(
    "customerName").value;

    const product =
    document.getElementById(
    "productOrdered").value;

    if(customer === "" || product === "")
    {
        alert("Fill all fields");
        return;
    }

    orders.push({
        customer: customer,
        product: product
    });

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();

    document.getElementById(
    "customerName").value = "";

    document.getElementById(
    "productOrdered").value = "";
}

function displayOrders()
{
    const table =
    document.getElementById(
    "orderTable");

    table.innerHTML = "";

    orders.forEach((order,index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>

            <td>
                <button onclick=
                "deleteOrder(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteOrder(index)
{
    orders.splice(index,1);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    displayOrders();
}

displayOrders();