let customers =
JSON.parse(
localStorage.getItem("customers")
) || [];

function addCustomer()
{
    const name =
    document.getElementById(
    "customerName").value;

    const email =
    document.getElementById(
    "customerEmail").value;

    if(name === "" || email === "")
    {
        alert("Fill all fields");
        return;
    }

    customers.push({
        name:name,
        email:email
    });

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    displayCustomers();

    document.getElementById(
    "customerName").value = "";

    document.getElementById(
    "customerEmail").value = "";
}

function displayCustomers()
{
    const table =
    document.getElementById(
    "customerTable");

    table.innerHTML = "";

    customers.forEach((customer,index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>

            <td>
                <button onclick=
                "deleteCustomer(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteCustomer(index)
{
    customers.splice(index,1);

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    displayCustomers();
}

displayCustomers();