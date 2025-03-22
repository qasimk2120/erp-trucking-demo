let trucks = [
    { number: "Truck #1", status: "In Use", route: "Riyadh to Jeddah", maintenance: 200, driver: "John Doe", income: 5000, expenses: 1000, customer: "Customer A" },
    { number: "Truck #2", status: "Not Allocated", route: "-", maintenance: 300, driver: null, income: 1500, expenses: 200, customer: "-" },
    { number: "Truck #3", status: "In Maintenance", route: "Dammam to Riyadh", maintenance: 150, driver: null, income: 0, expenses: 0, customer: "-" },
    { number: "Truck #4", status: "In Use", route: "Jeddah to Dammam", maintenance: 250, driver: "Jane Smith", income: 6000, expenses: 1200, customer: "Customer B" },
    { number: "Truck #5", status: "Not Allocated", route: "-", maintenance: 100, driver: null, income: 0, expenses: 0, customer: "-" },
];

let drivers = [
    { name: "John Doe", license: "License 123", status: "Active", percentage: 10, truck: "Truck #1" },
    { name: "Jane Smith", license: "License 456", status: "Active", percentage: 12, truck: "Truck #4" },
    { name: "David Lee", license: "License 789", status: "Inactive", percentage: 8, truck: null },
    { name: "Alice Johnson", license: "License 101", status: "Active", percentage: 11, truck: null },
    { name: "Robert Brown", license: "License 202", status: "Active", percentage: 9, truck: null },
];

let expenses = [
    { truck: "Truck #1", type: "Fuel", amount: 500, percentage: 5 },
    { truck: "Truck #2", type: "Repairs", amount: 300, percentage: 6 },
    { truck: "Truck #1", type: "Tolls", amount: 100, percentage: 1 },
    { truck: "Truck #4", type: "Fuel", amount: 600, percentage: 5 },
    { truck: "Truck #2", type: "Maintenance", amount: 200, percentage: 3 },
];

let customers = [
    { name: "Customer A", contact: "contact@customera.com" },
    { name: "Customer B", contact: "contact@customerb.com" },
    { name: "Customer C", contact: "contact@customerc.com" },
    { name: "Customer D", contact: "contact@customerd.com" },
    { name: "Customer E", contact: "contact@customere.com" },
    { name: "Customer F", contact: "contact@customerf.com" },
    { name: "Customer G", contact: "contact@customerg.com" },
    { name: "Customer H", contact: "contact@customerh.com" },
    { name: "Customer I", contact: "contact@customeri.com" },
    { name: "Customer J", contact: "contact@customerj.com" },
];

// Function to update truck table
function updateTruckTable() {
    const truckTable = document.getElementById('truckTable');
    truckTable.innerHTML = `<tr><th>Truck Number</th><th>Status</th><th>Route</th><th>Maintenance Expenses</th><th>Driver</th><th>Income</th><th>Net Profit</th><th>Customer</th></tr>`;
    trucks.forEach(truck => {
        const newRow = truckTable.insertRow(-1);
        let status = truck.status;
        if (truck.driver) {
            status = 'In Use';
        } else if (truck.status !== "In Maintenance") {
            status = "Not Allocated";
        }

        const netProfit = truck.income - truck.expenses;

        newRow.innerHTML = `<td>${truck.number}</td><td>${status}</td><td>${truck.route}</td><td>$${truck.maintenance}</td><td>${truck.driver || '-'}</td><td>$${truck.income.toFixed(2)}</td><td>$${netProfit.toFixed(2)}</td><td>${truck.customer}</td>`;
    });
    updateAllocateTruckSelect();
}

// Function to update driver table
function updateDriverTable() {
    const driverTable = document.getElementById('driverTable');
    driverTable.innerHTML = `<tr><th>Driver Name</th><th>License</th><th>Status</th><th>Income Percentage</th><th>Truck</th></tr>`;
    drivers.forEach(driver => {
        const newRow = driverTable.insertRow(-1);
        newRow.innerHTML = `<td>${driver.name}</td><td>${driver.license}</td><td>${driver.status}</td><td>${driver.percentage}%</td><td>${driver.truck || '-'}</td>`;
    });
    updateAllocateDriverSelect();
}

// Function to update expense table
function updateExpenseTable() {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = `<tr><th>Truck</th><th>Expense Type</th><th>Amount</th><th>Percentage of Income (Tax)</th></tr>`;
    expenses.forEach(expense => {
        const newRow = expenseTable.insertRow(-1);
        newRow.innerHTML = `<td>${expense.truck}</td><td>${expense.type}</td><td>$${expense.amount}</td><td>${expense.percentage}%</td>`;
    });
}

// Function to update customer table
function updateCustomerTable() {
    const customerTable = document.getElementById('customerTable');
    customerTable.innerHTML = `<tr><th>Customer Name</th><th>Contact</th><th>Actions</th></tr>`;
    customers.forEach((customer, index) => {
        const newRow = customerTable.insertRow(-1);
        newRow.innerHTML = `<td>${customer.name}</td><td>${customer.contact}</td><td><button onclick="deleteCustomer(${index})">Delete</button></td>`;
    });
    updateAllocateCustomerSelect();
}

// Function to add a truck
function addTruck() {
    const number = prompt("Enter Truck Number:");
    const status = prompt("Enter Truck Status:");
    const route = prompt("Enter Truck Route:");
    const maintenance = prompt("Enter Maintenance Expenses:");

    if (number && status && route && maintenance) {
        trucks.push({ number, status, route, maintenance: parseFloat(maintenance), driver: null, income: 0, expenses: 0, customer: "-" });
        updateTruckTable();
    } else {
        alert("Please enter all truck details.");
    }
}

// Function to add a driver
function addDriver() {
    const name = prompt("Enter Driver Name:");
    const license = prompt("Enter License Number:");
    const status = prompt("Enter Driver Status:");
    const percentage = prompt("Enter Income Percentage:");

    if (name && license && status && percentage) {
        drivers.push({ name, license, status, percentage: parseFloat(percentage), truck: null });
        updateDriverTable();
    } else {
        alert("Please enter all driver details.");
    }
}

// Function to add an expense
function addExpense() {
    const truck = prompt("Enter Truck Number:");
    const type = prompt("Enter Expense Type:");
    const amount = prompt("Enter Expense Amount:");
    const percentage = prompt("Enter Percentage of Income (Tax):");

    if (truck && type && amount && percentage) {
        expenses.push({ truck, type, amount: parseFloat(amount), percentage: parseFloat(percentage) });
        updateExpenseTable();
    } else {
        alert("Please enter all expense details.");
    }
}

// Function to update allocate truck select
function updateAllocateTruckSelect() {
    const truckSelect = document.getElementById('truck');
    truckSelect.innerHTML = `<option value="">Select Truck</option>`;
    trucks.forEach(truck => {
        if (!truck.driver && truck.status !== "In Maintenance") {
            truckSelect.innerHTML += `<option value="<span class="math-inline">\{truck\.number\}"\></span>{truck.number}</option>`;
        }
    });
}

// Function to update allocate driver select
function updateAllocateDriverSelect() {
    const driverSelect = document.getElementById('driver');
    driverSelect.innerHTML = `<option value="">Select Driver</option>`;
    drivers.forEach(driver => {
        if (!driver.truck) {
            driverSelect.innerHTML += `<option value="<span class="math-inline">\{driver\.name\}"\></span>{driver.name}</option>`;
        }
    });
}

// Function to update allocate customer select
function updateAllocateCustomerSelect() {
    const customerSelect = document.getElementById('customer');
    customerSelect.innerHTML = `<option value="">Select Customer
</option>`;
    customers.forEach(customer => {
        customerSelect.innerHTML += `<option value="${customer.name}">${customer.name}</option>`;
    });
}

// Allocation form submission
document.getElementById('allocateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const truckNumber = document.getElementById('truck').value;
    const driverName = document.getElementById('driver').value;
    const customerName = document.getElementById('customer').value;
    const route = prompt("Enter Route for this truck:");

    if (truckNumber && driverName && customerName && route) {
        const truck = trucks.find(t => t.number === truckNumber);
        const driver = drivers.find(d => d.name === driverName);

        if (truck && driver) {
            truck.driver = driverName;
            truck.route = route;
            truck.customer = customerName;
            driver.truck = truckNumber;
            updateTruckTable();
            updateDriverTable();
            updateAllocateTruckSelect();
            updateAllocateDriverSelect();
            alert(`Truck ${truckNumber} allocated to driver ${driverName} for customer ${customerName} with route: ${route}.`);
        } else {
            alert("Truck or driver not found.");
        }
    } else {
        alert('Please select a truck, driver, and customer, and enter a route.');
    }
});

// Function to update dashboard values
function updateDashboard() {
    let totalIncome = 0;
    let totalExpenses = 0;

    trucks.forEach(truck => {
        totalIncome += truck.income;
        totalExpenses += truck.expenses;
    });

    const totalProfit = totalIncome - totalExpenses;

    document.getElementById('totalTrucks').textContent = trucks.length;
    document.getElementById('totalEarnings').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('totalProfit').textContent = totalProfit.toFixed(2);
}

// Function to update reports values
function updateReports() {
    let totalIncome = 0;
    let totalExpenses = 0;

    trucks.forEach(truck => {
        totalIncome += truck.income;
        totalExpenses += truck.expenses;
    });

    const totalProfit = totalIncome - totalExpenses;

    document.getElementById('reportTotalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('reportTotalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('reportProfit').textContent = totalProfit.toFixed(2);
    updateReportExpenseTable(); // Call this here!
}

function updateReportExpenseTable() {
    const reportExpenseTable = document.querySelector('#reports table');
    reportExpenseTable.innerHTML = `<tr><th>Truck</th><th>Expense Type</th><th>Amount</th></tr>`;

    expenses.forEach(expense => {
        const newRow = reportExpenseTable.insertRow(-1);
        newRow.innerHTML = `<td>${expense.truck}</td><td>${expense.type}</td><td>$${expense.amount}</td>`;
    });
}

// Chart.js setup for profit and income/expense charts from actual data
function updateCharts() {
    let totalIncome = 0;
    let totalExpenses = 0;

    trucks.forEach(truck => {
        totalIncome += truck.income;
        totalExpenses += truck.expenses;
    });

    const totalProfit = totalIncome - totalExpenses;

    const ctxProfit = document.getElementById('profitChart').getContext('2d');
    new Chart(ctxProfit, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses', 'Profit'],
            datasets: [{
                label: 'Amount ($)',
                data: [totalIncome, totalExpenses, totalProfit],
                backgroundColor: ['#4CAF50', '#F44336', '#FFEB3B'],
                borderColor: ['#388E3C', '#D32F2F', '#FBC02D'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const ctxIncomeExpense = document.getElementById('incomeExpenseChart').getContext('2d');
    new Chart(ctxIncomeExpense, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Income vs Expenses',
                data: [totalIncome, totalExpenses],
                backgroundColor: ['#4CAF50', '#F44336'],
            }]
        },
        options: {
            responsive: true,
        }
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

function showAddCustomerForm() {
    document.getElementById('addCustomerForm').style.display = 'block';
}

document.getElementById('customerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const customerContact = document.getElementById('customerContact').value;

    if (customerName && customerContact) {
        customers.push({ name: customerName, contact: customerContact });
        updateCustomerTable();
        document.getElementById('addCustomerForm').style.display = 'none';
        document.getElementById('customerName').value = '';
        document.getElementById('customerContact').value = '';
    } else {
        alert("Please enter both customer name and contact.");
    }
});

function deleteCustomer(index) {
    customers.splice(index, 1);
    updateCustomerTable();
}

// Initial updates
updateTruckTable();
updateDriverTable();
updateExpenseTable();
updateCustomerTable();
updateDashboard();
updateReports();
updateCharts();
showSection('dashboard');
updateAllocateCustomerSelect();