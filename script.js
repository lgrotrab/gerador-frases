const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoadingBar() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingBar() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Busca as frases da API
async function getQuote() {
  showLoadingBar();
  const proxyUrl = "https://enigmatic-river-44240.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //Se o autor for desconhecido, irá mostrar o como Desconhecido
    if (data.quoteAuthor === "") {
      authorName.innerText = "Desconhecido";
    } else {
      authorName.innerText = data.quoteAuthor;
    }
    //reduzir o tamanho da fonte para frases muito longas
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    hideLoadingBar();
  } catch (error) {
    getQuote();
    console.log("aconteceu um erro: ", error);
  }
}

//abre uma nova aba com a frase para o twitter
function postTwitter() {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", postTwitter);

// Rodar a função assim que a página carregar
getQuote();
