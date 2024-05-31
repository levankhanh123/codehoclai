javadocument.addEventListener('DOMContentLoaded', function () {
    const balanceForm = document.getElementById('balanceForm');
    const balanceInput = document.getElementById('currentBalance');
    const expenseForm = document.getElementById('expenseForm');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const expenseReasonInput = document.getElementById('expenseReason');
    const currentAmountSpan = document.getElementById('currentAmount');
    const expenseList = document.getElementById('expenseList');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.getElementById('loginContainer');
    const mainContainer = document.getElementById('mainContainer');

    let currentAmount = 0;
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [
        { username: 'user1', password: 'password1', balance: 0 },
        { username: 'user2', password: 'password2', balance: 0 },
        { username: 'user3', password: 'password3', balance: 0 },
        { username: 'user4', password: 'password4', balance: 0 },
        { username: 'user5', password: 'password5', balance: 0 }
    ];
    let currentUser = localStorage.getItem('currentUser');

    // Function to format currency with dot separator
    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Function to update current amount with dot separator
    function updateCurrentAmount(amount) {
        currentAmount += amount;
        currentAmountSpan.textContent = formatCurrency(currentAmount);
    }

    // Function to save accounts data to local storage
    function saveAccountsToLocalStorage() {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    // Function to load accounts data from local storage
    function loadAccountsFromLocalStorage() {
        const savedAccounts = localStorage.getItem('accounts');
        if (savedAccounts) {
            accounts = JSON.parse(savedAccounts);
        }
    }

    // Function to save current user to local storage
    function saveCurrentUserToLocalStorage(user) {
        localStorage.setItem('currentUser', user);
    }

    // Load accounts data from local storage when the page loads
    loadAccountsFromLocalStorage();

    // Display initial balance if available
    if (currentUser) {
        const currentUserAccount = accounts.find(account => account.username === currentUser);
        if (currentUserAccount) {
            currentAmount = currentUserAccount.balance;
            currentAmountSpan.textContent = formatCurrency(currentAmount);
        }
    }

    // Check if user is logged in
    if (currentUser) {
        loginContainer.style.display = 'none';
        mainContainer.style.display = 'block';
    } else {
        loginContainer.style.display = 'block';
        mainContainer.style.display = 'none';
    }

    // Event listener for login form submission
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const foundAccount = accounts.find(account => account.username === username && account.password === password);
        if (foundAccount) {
            saveCurrentUserToLocalStorage(username);
            currentAmount = foundAccount.balance;
            currentAmountSpan.textContent = formatCurrency(currentAmount);
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'block';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });

    // Event listener for balance form submission
    balanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const balance = parseFloat(balanceInput.value);
        if (balance) {
            const currentUserAccount = accounts.find(account => account.username === currentUser);
            if (currentUserAccount) {
                currentUserAccount.balance = balance;
                currentAmount = balance;
                currentAmountSpan.textContent = formatCurrency(currentAmount);
                saveAccountsToLocalStorage();
                balanceInput.value = '';
            }
        } else {
            alert('Vui lòng nhập số tiền hiện có!');
        }
    });

    // Function to add new expense
    function addExpense(amount, reason) {
        const listItem = document.createElement('li');
        listItem.textContent = `-$${formatCurrency(amount)} for ${reason}`;
        expenseList.appendChild(listItem);
    }

    // Event listener for expense form submission
    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(expenseAmountInput.value);
        const reason = expenseReasonInput.value.trim();
        if (amount && reason) {
            updateCurrentAmount(-amount);
            addExpense(amount, reason);
            // Reset form
            expenseAmountInput.value = '';
            expenseReasonInput.value = '';
        } else {
            alert('Vui lòng nhập số tiền và lý do tiêu tiền!');
        }
    });
});
