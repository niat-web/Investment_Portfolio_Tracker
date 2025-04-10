/* script.js */

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Form Validation and Investment Tracking
const investmentForm = document.getElementById('investmentForm');
const tickerInput = document.getElementById('ticker');
const quantityInput = document.getElementById('quantity');
const purchasePriceInput = document.getElementById('purchasePrice');
const purchaseDateInput = document.getElementById('purchaseDate');
const holdingsTableBody = document.getElementById('holdingsTableBody');
const noHoldingsMessage = document.getElementById('noHoldingsMessage');

const totalValueDisplay = document.getElementById('totalValue');
const totalGainLossDisplay = document.getElementById('totalGainLoss');
const annualReturnDisplay = document.getElementById('annualReturn');

// Local Storage Key
const LOCAL_STORAGE_KEY = 'investmentHoldings';

// Load holdings from local storage
let investmentHoldings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

// Function to save holdings to local storage
function saveHoldings() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(investmentHoldings));
}

// Function to display notification
function showNotification(message) {
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = message;
    const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
    notificationModal.show();
}

// Function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Function to format percentage
function formatPercentage(number) {
    return (number * 100).toFixed(2) + '%';
}

// Function to calculate current value (replace with API call later)
async function fetchCurrentPrice(ticker) {
    // This is a placeholder - replace with actual API call
    return new Promise(resolve => {
        // Simulate an API call with a random price
        const randomPrice = Math.random() * 200 + 50; // Random price between $50 and $250
        setTimeout(() => resolve(randomPrice), 500); // Simulate a 0.5 second delay
    });
}

// Function to render investment holdings
async function renderHoldings() {
    holdingsTableBody.innerHTML = '';
    let totalPortfolioValue = 0;
    let totalPortfolioGainLoss = 0;

    if (investmentHoldings.length === 0) {
        noHoldingsMessage.style.display = 'block';
    } else {
        noHoldingsMessage.style.display = 'none';

        for (const holding of investmentHoldings) {
            const { ticker, quantity, purchasePrice, purchaseDate } = holding;

            // Fetch current price (replace with actual API call)
            const currentPrice = await fetchCurrentPrice(ticker);
            const currentValue = quantity * currentPrice;
            const gainLoss = currentValue - (quantity * purchasePrice);

            totalPortfolioValue += currentValue;
            totalPortfolioGainLoss += gainLoss;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${ticker}</td>
                <td>${quantity}</td>
                <td>${formatCurrency(purchasePrice)}</td>
                <td>${purchaseDate}</td>
                <td>${formatCurrency(currentValue)}</td>
                <td>${formatCurrency(gainLoss)}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn" data-ticker="${ticker}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            holdingsTableBody.appendChild(row);
        }
    }

    // Calculate annual return (simple example)
    const initialInvestment = investmentHoldings.reduce((sum, holding) => sum + (holding.quantity * holding.purchasePrice), 0);
    const annualReturn = initialInvestment === 0 ? 0 : totalPortfolioGainLoss / initialInvestment;

    // Update summary values
    totalValueDisplay.textContent = formatCurrency(totalPortfolioValue);
    totalGainLossDisplay.textContent = formatCurrency(totalPortfolioGainLoss);
    annualReturnDisplay.textContent = formatPercentage(annualReturn);
}

// Event listener for form submission
investmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate form inputs
    if (!investmentForm.checkValidity()) {
        e.stopPropagation();
        investmentForm.classList.add('was-validated');
        return;
    }

    const ticker = tickerInput.value.toUpperCase();
    const quantity = parseFloat(quantityInput.value);
    const purchasePrice = parseFloat(purchasePriceInput.value);
    const purchaseDate = purchaseDateInput.value;

    const newInvestment = {
        ticker,
        quantity,
        purchasePrice,
        purchaseDate
    };

    investmentHoldings.push(newInvestment);
    saveHoldings();
    renderHoldings();

    // Clear form and reset validation
    investmentForm.reset();
    investmentForm.classList.remove('was-validated');

    showNotification(`Successfully added ${quantity} shares of ${ticker} to your portfolio.`);
});

// Event delegation for delete button
holdingsTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
        const tickerToDelete = e.target.dataset.ticker || e.target.closest('.delete-btn').dataset.ticker;
        investmentHoldings = investmentHoldings.filter(holding => holding.ticker !== tickerToDelete);
        saveHoldings();
        renderHoldings();
        showNotification(`Successfully removed ${tickerToDelete} from your portfolio.`);
    }
});


// Floating Action Button (Scroll to Top)
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener('click', function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


// Initial render
renderHoldings();