function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const box = document.querySelector('#quote');

        const lineBreak = document.createElement('br');
  
        const quoteText = document.createTextNode(data.content);

        const openParen = document.createTextNode(" - (");

        const closeParen = document.createTextNode(")");
  
        const authorText = document.createTextNode(data.author);
        
        box.appendChild(lineBreak);
        // box.appendChild(lineBreak);
        box.appendChild(quoteText);
        box.appendChild(openParen);
        box.appendChild(authorText);
        box.appendChild(closeParen);
      });
  }

  displayQuote();