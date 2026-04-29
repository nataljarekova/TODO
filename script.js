const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('shoppingList');
const clearBtn = document.getElementById('clearAllBtn');
const dateDisplay = document.getElementById('dateDisplay');

// Вывод даты
const options = { weekday: 'long', day: 'numeric', month: 'long' };
dateDisplay.innerText = new Date().toLocaleDateString('ru-RU', options);

let shoppingItems = JSON.parse(localStorage.getItem('premiumStore')) || [];

function renderList() {
    list.innerHTML = '';
    
    shoppingItems.forEach((item, index) => {
        const li = document.createElement('li');
        if (item.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleItem(${index})">
                <span class="item-text">${item.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteItem(${index})">✕</button>
        `;
        list.appendChild(li);
    });

    localStorage.setItem('premiumStore', JSON.stringify(shoppingItems));
}

function addItem() {
    const text = input.value.trim();
    if (text !== "") {
        shoppingItems.push({ text: text, completed: false });
        input.value = "";
        renderList();
    }
}

window.toggleItem = (index) => {
    shoppingItems[index].completed = !shoppingItems[index].completed;
    renderList();
};

window.deleteItem = (index) => {
    shoppingItems.splice(index, 1);
    renderList();
};

clearBtn.addEventListener('click', () => {
    if (shoppingItems.length > 0 && confirm('Удалить весь список?')) {
        shoppingItems = [];
        renderList();
    }
});

addBtn.addEventListener('click', addItem);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addItem(); });

renderList();
