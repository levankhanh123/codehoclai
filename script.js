let users = [
    { username: "user1", password: "password1", balance: 0, expenses: [] },
    { username: "user2", password: "password2", balance: 0, expenses: [] }
];

let currentUser = null;

// Hàm này sẽ kiểm tra xem đã có dữ liệu về tài khoản trong localStorage hay chưa
function initializeUsers() {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
        // Nếu có dữ liệu trong localStorage, gán nó cho biến users
        users = storedUsers;
    } else {
        // Nếu chưa có dữ liệu trong localStorage, lưu dữ liệu mặc định vào localStorage
        updateLocalStorage();
    }
}

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
        alert("Tên đăng nhập hoặc mật khẩu không hợp lệ");
    }
}

function updateBalance() {
    const balanceText = formatCurrency(currentUser.balance);
    document.getElementById("balance").innerText = `Số Dư: ${balanceText}`;
}

function updateLocalStorage() {
    // Lưu lại dữ liệu tài khoản vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
}

function setNewBalance() {
    const newBalance = parseFloat(document.getElementById("balanceAmount").value);
    if (!isNaN(newBalance)) {
        currentUser.balance = newBalance;
        updateBalance();
        updateLocalStorage(); // Cập nhật số dư vào localStorage
    } else {
        alert("Vui lòng nhập số dư hợp lệ");
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
        updateLocalStorage(); // Cập nhật số tiền chi tiêu vào localStorage
    } else {
        alert("Vui lòng nhập số tiền chi tiêu và mục đích hợp lệ");
    }
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    // Hiển thị các giao dịch chi tiêu gần đây
    currentUser.expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `-$${formatCurrency(expense.amount)} cho ${expense.purpose}`;
        expenseList.appendChild(li);
    });
}

function formatCurrency(amount) {
    // Định dạng số tiền thành chuỗi với dấu chấm ngăn cách hàng nghìn
    return amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&.');
}

// Khởi tạo dữ liệu tài khoản khi trang web được tải
initializeUsers();
