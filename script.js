// LOGIN LOGIC
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
  loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if(username){
      localStorage.setItem('username', username);
      localStorage.setItem('balance', 1000); // starting balance
      window.location.href = 'dashboard.html';
    } else {
      alert('Please enter your name');
    }
  });
}

// DASHBOARD LOGIC
const welcomeMsg = document.getElementById('welcomeMsg');
const balanceEl = document.getElementById('balance');
const investBtn = document.getElementById('investBtn');
const chartCanvas = document.getElementById('portfolioChart');

if(welcomeMsg){
  const username = localStorage.getItem('username') || 'User';
  welcomeMsg.innerText = `Welcome, ${username}!`;
}

let balance = parseInt(localStorage.getItem('balance')) || 1000;
if(balanceEl) balanceEl.innerText = balance;

let portfolioData = [balance];
let labels = [0];

if(investBtn){
  investBtn.addEventListener('click', () => {
    balance += 100 + Math.floor(Math.random() * 100); // simulate growth
    localStorage.setItem('balance', balance);
    balanceEl.innerText = balance;
    portfolioData.push(balance);
    labels.push(labels.length);
    portfolioChart.update();
  });
}

// CHART.JS
let portfolioChart;
if(chartCanvas){
  const ctx = chartCanvas.getContext('2d');
  portfolioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Portfolio',
        data: portfolioData,
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.2)',
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#e0e6f7' }
        }
      },
      scales: {
        x: { ticks: { color: '#e0e6f7' } },
        y: { ticks: { color: '#e0e6f7' } }
      }
    }
  });
}
