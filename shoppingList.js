const shoppingList = [];

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value) || 1; // Define 1 como quantidade padrão
    const itemPrice = parseFloat(document.getElementById('itemPrice').value) || 0; // Define 0 como preço padrão

    if (itemName) {
        const itemTotal = itemQuantity * itemPrice;
        shoppingList.push({ name: itemName, quantity: itemQuantity, price: itemPrice, total: itemTotal, completed: false });
        updateTable();
        clearInputs();
    } else {
        alert('Por favor, insira um nome para o item.');
    }
}

function updateTable() {
    const tableBody = document.getElementById('shoppingList');
    tableBody.innerHTML = '';

    let grandTotal = 0;

    shoppingList.forEach((item, index) => {
        grandTotal += item.total;
        const row = `
            <tr class="${item.completed ? 'completed' : ''}">
                <td>${item.name}</td>
                <td contenteditable="true" onblur="updateQuantity(${index}, this.textContent)">${item.quantity}</td>
                <td contenteditable="true" onblur="updatePrice(${index}, this.textContent)">R$ ${item.price.toFixed(2)}</td>
                <td>R$ ${item.total.toFixed(2)}</td>
                <td><input type="checkbox" ${item.completed ? 'checked' : ''} onclick="toggleCompleted(${index})"></td>
                <td>
                    <button onclick="removeItem(${index})">Remover</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

function clearInputs() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemQuantity').value = '';
    document.getElementById('itemPrice').value = '';
}

function removeItem(index) {
    shoppingList.splice(index, 1);
    updateTable();
}

function toggleCompleted(index) {
    shoppingList[index].completed = !shoppingList[index].completed;
    updateTable();
}

function updatePrice(index, newPrice) {
    const parsedPrice = parseFloat(newPrice.replace('R$', '').trim());
    if (!isNaN(parsedPrice) && parsedPrice >= 0) {
        shoppingList[index].price = parsedPrice;
        shoppingList[index].total = shoppingList[index].quantity * parsedPrice;
        updateTable();
    } else {
        alert('Por favor, insira um valor de preço válido.');
        updateTable(); // Atualiza a tabela para voltar ao preço anterior, se inválido
    }
}

function updateQuantity(index, newQuantity) {
    const parsedQuantity = parseInt(newQuantity.trim());
    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
        shoppingList[index].quantity = parsedQuantity;
        shoppingList[index].total = shoppingList[index].quantity * shoppingList[index].price;
        updateTable();
    } else {
        alert('Por favor, insira uma quantidade válida.');
        updateTable(); // Atualiza a tabela para voltar à quantidade anterior, se inválida
    }
}
