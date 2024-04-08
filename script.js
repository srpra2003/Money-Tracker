document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-btn');
    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmount = document.getElementById('total-amount');

    let expenses = [];

    addBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (category && amount && date) {
            expenses.push({ category, amount, date });
            renderExpenses();
            updateTotal();
            clearInputs();
        } else {
            alert('Please fill in all fields.');
        }
    });

    function renderExpenses() {
        expenseTableBody.innerHTML = '';
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.category}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td><button class="delete-btn" data-index="${expenses.indexOf(expense)}">Delete</button></td>
            `;
            expenseTableBody.appendChild(row);
        });
    
        attachDeleteEventListeners();
    }
    

    function updateTotal() {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }

    function clearInputs() {
        categorySelect.value = '';
        amountInput.value = '';
        dateInput.value = '';
    }

    function attachDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                expenses.splice(index, 1);
                renderExpenses();
                updateTotal();
            });
        });
    }
});
