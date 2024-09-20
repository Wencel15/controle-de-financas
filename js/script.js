document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;
    
    addTransaction(description, amount, type, date);
    updateTotals();
});

let transactions = [];

function addTransaction(description, amount, type, date) {
    const transaction = {
        description,
        amount: type === 'expense' ? -amount : amount,
        type,
        date
    };

    transactions.push(transaction);
    updateTransactionList();
}

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} - ${transaction.description} - $${transaction.amount.toFixed(2)} (${transaction.type})`;
        transactionList.appendChild(li);
    });
}

function updateTotals() {
    const totalIncome = transactions
        .filter(t => t.type === 'receita')
        .reduce((total, t) => total + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'despesa')
        .reduce((total, t) => total + Math.abs(t.amount), 0);

    const totalBalance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('total-balance').textContent = totalBalance.toFixed(2);
}
