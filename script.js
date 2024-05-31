// Mock user data
const users = [
    { username: "user1", password: "password1", balance: 100, expenses: [] },
    { username: "user2", password: "password2", balance: 200, expenses: [] }
];

let currentUser = null;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Tìm người dùng trong dữ liệu giả mạo
    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainPage").style.display = "block";
        document.getElementById("loggedInUser").innerText = currentUser.username;
        updateBalance();
        displayExpenses();
    } else {
        alert("Invalid username or password");
    }
}

function updateBalance() {
    document.getElementById("balance").innerText = `Balance: $${currentUser.balance.toFixed(2)}`;
}

function setNewBalance() {
    const newBalance = parseFloat(document.getElementById("balanceAmount").value);
    if (!isNaN(newBalance)) {
        currentUser.balance = newBalance;
        updateBalance();
    } else {
        alert("Please enter a valid balance amount");
    }
}

function addExpense() {
    const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
    const expensePurpose = document.getElementById("expensePurpose").value;

    if (!isNaN(expenseAmount) && expensePurpose.trim() !== "") {
        // Trừ số tiền chi tiêu từ số dư hiện có
        currentUser.balance -= expenseAmount;

        // Ghi lại giao dịch chi tiêu
        currentUser.expenses.push({ amount: expenseAmount, purpose: expensePurpose });

        // Cập nhật số dư và hiển thị danh sách giao dịch
        updateBalance();
        displayExpenses();
    } else {
        alert("Please enter valid expense amount and purpose");
    }
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    // Hiển thị các giao dịch chi tiêu gần đây
    currentUser.expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `-$${expense.amount.toFixed(2)} for ${expense.purpose}`;
        expenseList.appendChild(li);
    });
}
