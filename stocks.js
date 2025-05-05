const API_KEY = "fni4galfucbifvSrtqVDFgy07jKz1Nwx"
const chartCtx = document.getElementById('stockChart').getContext('2d');
let stockChart;

document.getElementById('customButton').addEventListener('click', () => {
  const ticker = document.getElementById('stockInput').value.toUpperCase();
  const days = document.getElementById('dayRange').value;
  if (ticker) fetchStockData(ticker, days);
});

async function fetchStockData(ticker, days) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const from = startDate.toISOString().split('T')[0];
  const to = endDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=${days}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) {
      alert("No data found for ticker");
      return;
    }

    const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
    const prices = data.results.map(d => d.c);

    updateChart(ticker, labels, prices);
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
}

function updateChart(ticker, labels, data) {
  if (stockChart) stockChart.destroy();

  stockChart = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${ticker} Closing Price`,
        data: data,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });
}

async function fetchRedditStocks() {
  const response = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
  const data = await response.json();
  const top5 = data.slice(0, 5);

  const tbody = document.querySelector("#redditTable tbody");
  tbody.innerHTML = "";

  top5.forEach(stock => {
    const row = document.createElement("tr");
    const sentimentClass = stock.sentiment.toLowerCase() === "bullish" ? "bullish" : "bearish";

    row.innerHTML = `
      <td><a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a></td>
      <td>${stock.no_of_comments}</td>
      <td class="${sentimentClass}">${stock.sentiment}</td>
    `;

    tbody.appendChild(row);
  });
}
function startAnnyang() {
    if (annyang) {
      const commands = {
        'hello': () => alert('Hello World'),
        'change the color to *color': color => {
          document.body.style.backgroundColor = color;
        },
        'navigate to *page': page => {
          const lowerPage = page.toLowerCase();
          if (['home', 'index'].includes(lowerPage)) window.location.href = 'index.html';
          else if (lowerPage === 'about') window.location.href = 'about.html';
          else if (lowerPage === 'contact') window.location.href = 'contact.html';
          else alert('Page not found');
        }
      };
  
      annyang.addCommands(commands);
      annyang.start({ autoRestart: true, continuous: false });
    }
  }
  
  function stopAnnyang() {
    if (annyang) {
      annyang.abort();
    }
  }
  
fetchRedditStocks();

