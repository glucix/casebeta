// List of case items with their values
const caseItems = [
    { name: "M4A4 | Desolate Space", img: "photos/cs-fracture-case.png", chance: 20, value: 50 },
    { name: "AWP | Atheris", img: "photos/cs-fracture-case.png", chance: 20, value: 100 },
    { name: "Five-SeveN | Boost Protocol", img: "photos/cs-fracture-case.png", chance: 20, value: 150 },
    { name: "M4A1-S | Leaded Glass", img: "photos/cs-fracture-case.png", chance: 20, value: 200 },
    { name: "Butterfly Knife | Gamma Doppler", img: "photos/butterfly.png", chance: 90, value: 120000000 },
    { name: "USP-S | Cortex", img: "photos/cs-fracture-case.png", chance: 20, value: 120 },
    // Add more items as needed
];

// Load sounds
const caseOpenSound = document.getElementById('caseOpenSound');
const caseFinishSound = document.getElementById('caseFinishSound');

let balance = 1000; // Starting balance

// Function to get a random case item
function getRandomCaseItem() {
    const totalChance = caseItems.reduce((sum, item) => sum + item.chance, 0);
    let randomChance = Math.random() * totalChance;

    for (let i = 0; i < caseItems.length; i++) {
        randomChance -= caseItems[i].chance;
        if (randomChance <= 0) {
            return caseItems[i];
        }
    }
}

// Function to display the final drawn items
function displayDrawnItems(finalDraw) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = '';

    finalDraw.forEach(item => {
        const drawnItemElement = document.createElement('div');
        drawnItemElement.classList.add('drawn-item');
        drawnItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
        `;
        resultContainer.appendChild(drawnItemElement);

        showNotification(item);
    });

    caseFinishSound.play();
}

// Show notification for the drawn item
function showNotification(item) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const sellPrice = document.getElementById('sell-price');

    notificationMessage.textContent = `You got: ${item.name}`;
    sellPrice.textContent = item.value.toFixed(2);

    notification.style.display = 'block';

    document.getElementById('sell-item-btn').onclick = function() {
        sellItem(item.value);
        notification.style.display = 'none';
    };

    document.getElementById('keep-item-btn').onclick = function() {
        notification.style.display = 'none';
    };
}

// Sell item and update balance
function sellItem(price) {
    balance += price;
    updateBalance();
}

// Update displayed balance
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = balance.toFixed(2);
}

// Animate cases opening
function animateCases(numCases) {
    const resultContainer = document.querySelector('.result');
    resultContainer.innerHTML = '';

    caseOpenSound.play();

    const roller = document.createElement('div');
    roller.classList.add('roller');

    for (let i = 0; i < 100; i++) {
        const randomItem = getRandomCaseItem();
        const itemElement = document.createElement('div');
        itemElement.classList.add('rolling-item');
        itemElement.innerHTML = `
            <img src="${randomItem.img}" alt="${randomItem.name}">
            <p>${randomItem.name}</p>
        `;
        roller.appendChild(itemElement);
    }

    resultContainer.appendChild(roller);

    roller.style.transition = `transform 5s cubic-bezier(0.25, 1, 0.5, 1)`;
    roller.style.transform = `translateX(-${Math.random() * 2000 + 1000}px)`;

    setTimeout(() => {
        const finalDraw = [];
        for (let i = 0; i < numCases; i++) {
            finalDraw.push(getRandomCaseItem());
        }
        displayDrawnItems(finalDraw);
    }, 5000);
}

// Open cases and check balance
function openCases(numCases) {
    const cost = numCases * 100;
    if (balance >= cost) {
        balance -= cost;
        updateBalance();
        animateCases(numCases);
    } else {
        alert("Not enough balance to open cases.");
    }
}

// Event listeners for buttons
document.querySelector('.open-one-btn').addEventListener('click', () => openCases(1));
document.querySelector('.open-two-btn').addEventListener('click', () => openCases(2));
document.querySelector('.open-three-btn').addEventListener('click', () => openCases(3));
