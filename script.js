// Initial user balance
let balance = 500.00;

// Get the balance element
const balanceElement = document.getElementById('balance');

// Function to update the balance on the page
function updateBalance(newBalance) {
    balance = newBalance;
    balanceElement.textContent = newBalance.toFixed(2) + 'zł';
}

// Function to display a notification
function showNotification(message, type) {
    // Create the notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`; // Type can be 'success' or 'error'
    notification.textContent = message;
    
    // Append the notification to the body
    document.body.appendChild(notification);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to buy a case
function buyCase(casePrice) {
    if (balance >= casePrice) {
        // Decrease the balance
        const newBalance = balance - casePrice;
        updateBalance(newBalance);
        
        // Show success notification
        showNotification(`Case purchased for ${casePrice.toFixed(2)}zł!`, 'success');
    } else {
        // Show error notification
        showNotification('Insufficient balance!', 'error');
    }
}

// Function to assign click events to cases
function initializeCases() {
    // Get all cases
    const cases = document.querySelectorAll('.case');
    
    // Assign a click event for each case
    cases.forEach((caseElement) => {
        // Get the case price from the text (e.g., 7.14zł -> 7.14)
        const priceText = caseElement.querySelector('span').textContent;
        const casePrice = parseFloat(priceText.replace('zł', ''));
        
        // Assign the click function to purchase the case
        caseElement.addEventListener('click', () => {
            buyCase(casePrice);
        });
    });
}

// Call the function to assign events to cases
initializeCases();