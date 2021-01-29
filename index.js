const cantInput = document.getElementById("cantInput");
const drawButton = document.getElementById("drawBtn");  
const sortButton = document.getElementById("sortBtn");


let cardsDeck = document.getElementById("cardsDeck");
let title = document.querySelector(".title");
let selectionLogContainer = document.getElementById("selectionLog");
let randomCards = 0; // Generated random cards


// Generate Random Cards; return object
const generateRandomCards = (cant) => {
  let suits = ['heart', 'spade', 'club', 'diamond'];
  let values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  let cards = []
  
  for (let i = 0; i < cant; i++) {
    let randomSuit = Math.floor(Math.random() * suits.length);
    let randomValue = Math.floor(Math.random() * values.length);
    
    cards.push({
      value: values.indexOf(values[randomValue]),
      text: values[randomValue],
      suit: suits[randomSuit]
    })
  }
  
  return cards;
}


// Generate Card DOM
const generateCardDOM = (obj) => {

  // Create card div
  let card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(obj["suit"]);
  
  // Create paragraph of value
  const p = document.createElement("p");
  p.innerText = obj["value"];
  
  // Create i of FA Icon
  const suitTop = document.createElement("i");
  suitTop.classList.add("fas");
  suitTop.classList.add("fa-" + obj["suit"]);
  
  const suitBottom = suitTop.cloneNode();
  
  // Append to card div
  card.appendChild(suitTop);
  card.appendChild(p);
  card.appendChild(suitBottom);
  
  return card;
}


// Generate BubbleLog
const generateSelectionLogDOM = (obj, num) => {
  let selectionLog = document.createElement("div");

  let iterationItem = document.createElement("div");
  iterationItem.classList.add("iteration");
  selectionLog.appendChild(iterationItem);

  if (selectionLogContainer.childNodes.length === 0) {
    selectionLog.classList.add("iteration-0");
    iterationItem.innerText = "0";
  } else { 
    selectionLog.classList.add(`iteration-${selectionLogContainer.childNodes.length - 1 + 1}`);
    iterationItem.innerText = `${selectionLogContainer.childNodes.length - 1 + 1}`;
  }

  obj.forEach((card) => {
    let cardDOM = generateCardDOM(card);
    selectionLog.appendChild(cardDOM);
  });

  selectionLogContainer.appendChild(selectionLog);
}


// Draw 
let drawCardDeck = () => {
  if (!cantInput.value.length) {
    alert("Debe ingresar un número de cartas a generar...")
    return;
  }

  if (cardsDeck.childNodes.length) cardsDeck.innerHTML = ""

  randomCards = generateRandomCards(cantInput.value);

  randomCards.forEach((card) => {
    let cardDOM = generateCardDOM(card);
    cardsDeck.appendChild(cardDOM);
  });

  title.style.display = "none"
  cantInput.value = "";
  selectionLogContainer.innerHTML = "";
}


// Sort
const sortCardDeck = () => {
  if (!randomCards.length) alert("Debe generar cartas...")
  if (randomCards.length >= 2) title.style.display = "block"

  let minimun;
  for (let i = 0; i < randomCards.length; i++) {
    
    minimun = i;
   
    for (let j = i; j < randomCards.length; j++) {
      if(randomCards[j].value < randomCards[minimun].value)  {
         minimun = j;
      }
    }

    if (minimun != i) {
      let temp = randomCards[i];
      randomCards[i] = randomCards[minimun];
      randomCards[minimun] = temp;
      
      generateSelectionLogDOM(randomCards);
    }

  }
}


drawButton.addEventListener("click", () => drawCardDeck());
sortButton.addEventListener("click", () => sortCardDeck());