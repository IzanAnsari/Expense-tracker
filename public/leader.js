// Fetch and display expenses and leaderboard
fetch('/addexpence1')
.then(response => response.json())
.then(expences => {
  const expenceList = document.getElementById('expenceList');
  const totalexpenceamount = document.getElementById('totalexpence');
  
  let totalexpence = 0;
  
  expences.forEach(expence => {
    totalexpence += expence.amount;
    
    const li = document.createElement('li');
    li.textContent = `Expense: ₹${expence.amount} - Used For: ${expence.description}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteexpence(expence._id));
    
    li.appendChild(deleteButton);
    expenceList.appendChild(li);
  });
  
  totalexpenceamount.textContent = `Total ₹${totalexpence}`;
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

fetch('/addexpence1')
.then(response => response.json())
.then(expences => {
  paginateExpences(expences);
})
.catch(error => {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
});

// Leaderboard pagination>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const leaderboardList = document.getElementById('leaderboardList');
const leaderboardPageLimit = 10; // Set the number of entries per page
let leaderboardCurrentPage = 1;

function displayLeaderboard(entries) {
leaderboardList.innerHTML = '';

entries.forEach(entry => {
  const user = entry.user;
  const totalamount = entry.totalamount;
  
  const li = document.createElement('li');
  li.textContent = `Name: ${user} - Total Expense: ₹${totalamount}`;
  
  leaderboardList.appendChild(li);
});
}

function paginateLeaderboard(leaderboard) {
const totalPages = Math.ceil(leaderboard.length / leaderboardPageLimit);
const startIndex = (leaderboardCurrentPage - 1) * leaderboardPageLimit;
const endIndex = startIndex + leaderboardPageLimit;
const paginatedEntries = leaderboard.slice(startIndex, endIndex);

displayLeaderboard(paginatedEntries);

// Display pagination buttons
const leaderboardPagination = document.getElementById('leaderboardPagination');
leaderboardPagination.innerHTML = '';

for (let i = 1; i <= totalPages; i++) {
  const button = document.createElement('button');
  button.textContent = i;
  
  if (i === leaderboardCurrentPage) {
    button.classList.add('active');
  }
  
  button.addEventListener('click', () => {
    leaderboardCurrentPage = i;
    paginateLeaderboard(leaderboard);
  });
  
  leaderboardPagination.appendChild(button);
}
}

fetch('/addexpence1/leaderboard')
.then(response => response.json())
.then(data => {
  const leaderboard = data.leaderboard;
  paginateLeaderboard(leaderboard);
})
.catch(error => {
  console.error(error);
  res.status(500).json({ error: 'An error occurred' });
});

// Delete an expense
function deleteexpence(expenceId) {
fetch(`/addexpence1/${expenceId}`, { method: 'DELETE' })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Refresh the expense list after deleting an expense
    location.reload();
  })
  .catch(error => console.error(error));
}


// //downloading expence

// document.addEventListener('DOMContentLoaded', () => {
//   const downloadButton = document.getElementById('downloadButton');
//   downloadButton.addEventListener('click', downloadexpences);
// });
// async function downloadexpences() {
//   try {
//       const response = await fetch('/expences1/download');
//       const data = await response.text();
//       const downloadLink = document.createElement('a');
//       downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
//       downloadLink.download = 'expences.txt';
//       downloadLink.click();
//   } catch (error) {
//       console.log(error);
//   }
// }