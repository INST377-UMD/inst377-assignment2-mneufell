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
  function loadQuote() {
    fetch('https://zenquotes.io/api/random/[your_key]')
      .then(response => response.json())
      .then(data => {
        const quote = data[0];
        document.getElementById('quote-text').textContent = `"${quote.q}"`;
        document.getElementById('quote-author').textContent = `– ${quote.a}`;
      })
      .catch(error => {
        document.getElementById('quote-text').textContent = 'Could not load quote.';
        document.getElementById('quote-author').textContent = '';
        console.error('Quote load error:', error);
      });
  }
  

  window.addEventListener('DOMContentLoaded', loadQuote);