// register

function signUp() {
    let user = {
        uname: uname.value,
        email: email.value,
        pass: pass.value
    }

    if (!user.uname || !user.email || !user.pass) {
        alert('Please fill in all the fields')
    }
    else if (localStorage.getItem(user.email)) {
        alert('Email already exists')
    }
    else {
        localStorage.setItem(user.email, JSON.stringify(user))
        alert('Account created successfully')
        window.location.href = 'index.html'
    }
}

function signIn() {
    let email = document.getElementById('mail').value;
    let password = document.getElementById('password').value

    if (!email || !password) {
        alert('Please fill in all the fields')
    }
    let storedUser = localStorage.getItem(email)

    if (!storedUser) {
        alert('Please enter the registered email address')
    }

    let user = JSON.parse(storedUser);
    if (user.pass == password) {
        alert(`Login Successfull`)
        window.location = "/home.html";
    }
    else {
        alert('Incorrect Password!')
    }


}

let balance = 0;
let balanced = document.getElementById('balance');

// Store all transaction data
let chartLabels = [];
let chartData = [];
let chartColors = [];

// Chart.js setup
let ctx = document.getElementById('pieChart').getContext('2d');
let pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: chartLabels,
        datasets: [{
            data: chartData,
            backgroundColor: chartColors
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

function updateChart() {
    pieChart.update();
}

// Function to generate random colors
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addIncome() {
    let type = document.getElementById("income-type").value;
    let amount = parseFloat(document.getElementById("income-amount").value);
    if (!type || isNaN(amount)) return alert("Enter details");

    // Add to table
    let table = document.getElementById("incomeTable");
    table.innerHTML += `<tr>
        <td class='border px-2 py-1'>${type}</td>
        <td class='border px-2 py-1'>${amount}</td>
    </tr>`;

    // Update balance
    balance += amount;
    balanced.textContent = balance;

    // Add to chart with unique color
    chartLabels.push(type + " (Income)");
    chartData.push(amount);
    chartColors.push(getRandomColor());
    updateChart();

    // Reset inputs
    document.getElementById("income-type").value = "";
    document.getElementById("income-amount").value = "";
}

function addExpense() {
    let type = document.getElementById("expense-type").value;
    let amount = parseFloat(document.getElementById("expense-amount").value);
    if (!type || isNaN(amount)) return alert("Enter details");

    // Add to table
    let table = document.getElementById("expenseTable");
    table.innerHTML += `<tr>
        <td class='border px-2 py-1'>${type}</td>
        <td class='border px-2 py-1'>${amount}</td>
    </tr>`;

    // Update balance
    balance -= amount;
    balanced.textContent = balance;

    // Add to chart with unique color
    chartLabels.push(type + " (Expense)");
    chartData.push(amount);
    chartColors.push(getRandomColor());
    updateChart();

    // Reset inputs
    document.getElementById("expense-type").value = "";
    document.getElementById("expense-amount").value = "";
}

function logout() {
    // Optionally, you can clear a login flag from localStorage if you implement one
    // localStorage.removeItem('loggedInUser'); 

    alert("You have been logged out");
    window.location.href = "index.html"; // redirect to login page
}