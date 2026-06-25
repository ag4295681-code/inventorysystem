async function loadTransactions() {
    try {
        const response = await fetch("http://localhost:8080/api/products");
        const products = await response.json();
        
        const table = document.getElementById("transactionTable");
        table.innerHTML = "";

        if (products.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="4">Koi product nahi hai abhi</td>
                </tr>`;
            return;
        }

        products.forEach((product, index) => {
            table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>Product Added</td>
                <td>${product.name}</td>
                <td>${new Date().toLocaleDateString()}</td>
            </tr>`;
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

loadTransactions();