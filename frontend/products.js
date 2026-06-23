let products =
JSON.parse(
localStorage.getItem("products")
) || [];

function addProduct()
{
    const name =
    document.getElementById(
    "productName").value;

    const qty =
    document.getElementById(
    "productQty").value;

    const price =
    document.getElementById(
    "productPrice").value;

    if(
        name === "" ||
        qty === "" ||
        price === ""
    )
    {
        alert("Fill all fields");
        return;
    }

    products.push({
        name:name,
        qty:qty,
        price:price
    });

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();

    document.getElementById(
    "productName").value = "";

    document.getElementById(
    "productQty").value = "";

    document.getElementById(
    "productPrice").value = "";
}

function displayProducts()
{
    const table =
    document.getElementById(
    "productTable");

    table.innerHTML = "";

    products.forEach((product,index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${product.name}</td>
            <td>${product.qty}</td>
            <td>₹${product.price}</td>

            <td>
                <button
                onclick="deleteProduct(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteProduct(index)
{
    products.splice(index,1);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    displayProducts();
}

displayProducts();