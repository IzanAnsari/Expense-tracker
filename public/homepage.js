fetch('/addexpence')
.then(response => response.json())
.then(expences => {
  const expenceList = document.getElementById('expenceList');
  const totalexpenceamount = document.getElementById('totalexpence');
  
  let totalexpence = 0;
  
  expences.forEach(expence => {
    totalexpence += expence.amount;
    
    const li = document.createElement('li');
    li.textContent = `Expense: ₹${expence.amount} - Description: ${expence.description}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteexpence(expence._id));
    
    li.appendChild(deleteButton);
    expenceList.appendChild(li);
  });
  
  totalexpenceamount.textContent = `₹${totalexpence}`;
})
.catch(error => {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
});

// Expense pagination
const expenceList = document.getElementById('expenceList');
const expencePageLimit = 5; // Set the number of entries per page
let expenceCurrentPage = 1;

function displayExpences(expences) {
expenceList.innerHTML = '';

expences.forEach(expence => {
  const li = document.createElement('li');
  li.textContent = `Expense: ₹${expence.amount} - Description: ${expence.description}`;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteexpence(expence._id));
  
  li.appendChild(deleteButton);
  expenceList.appendChild(li);
});
}

function paginateExpences(expences) {
const totalPages = Math.ceil(expences.length / expencePageLimit);
const startIndex = (expenceCurrentPage - 1) * expencePageLimit;
const endIndex = startIndex + expencePageLimit;
const paginatedExpences = expences.slice(startIndex, endIndex);

displayExpences(paginatedExpences);

// Display pagination buttons
const expencePagination = document.getElementById('expencePagination');
expencePagination.innerHTML = '';

for (let i = 1; i <= totalPages; i++) {
  const button = document.createElement('button');
  button.textContent = i;
  
  if (i === expenceCurrentPage) {
    button.classList.add('active');
  }
  
  button.addEventListener('click', () => {
    expenceCurrentPage = i;
    paginateExpences(expences);
  });
  
  expencePagination.appendChild(button);
}
}

fetch('/addexpence')
.then(response => response.json())
.then(expences => {
  paginateExpences(expences);
})
.catch(error => {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
});





// Delete an expense
function deleteexpence(expenceId) {
fetch(`/addexpence/${expenceId}`, { method: 'DELETE' })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Refresh the expense list after deleting an expense
    location.reload();
  })
  .catch(error => console.log(error));
}



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//razorpay implementation

function openRazorpayPayment(event) {
  event.preventDefault();
  
  
  // Make a POST request to your server to create a new order
  fetch('/createorder', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 29900, // Set the amount to 25 rupees (amount in paise, so 25 * 100 = 2500)
    currency: 'INR', // Set the currency to Indian Rupees
    // Provide any necessary data for creating the order
  
  })
  })
  .then(response => response.json())
  .then(data => {
    // Once you receive the order ID, use it to open the Razorpay payment popup
    const options = {
      key: 'rzp_test_8KoVw8lokRi8WV',
      amount: data.amount, // Amount in the smallest currency unit (e.g., paise in India)
      currency: data.currency,
      name: 'Expense Tracker Pro',
      description: 'Upgrade to Expense Tracker Pro',
      order_id: data.order_id,
      handler: function (response) {
        // Handle the payment success response
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        //alert(response.razorpay_signiture)
        alert("YOOOO! YOUR PAYMENT IS SUCCESSFULL-- YOUr NOW PRO USER! ")
        // Perform any necessary actions after a successful payment
  // Save membership1 data and update isPro field
  fetch('/save-membership', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Redirect the user to the Pro User page
    window.location.href = '/leader';
  })
  .catch(error => console.error(error));
  },
    };
  
    const rzp = new Razorpay(options);
    rzp.open();
  })
  .catch(error => console.error(error));
  }




