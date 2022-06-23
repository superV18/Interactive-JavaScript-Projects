const cards = document.querySelectorAll(".card");
let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;

function flipcard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}
function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipcard);
    cardTwo.removeEventListener("click", flipcard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}
function hoverbc() {
   linear-gradient(
    bott0m,
    rgb(10, 231, 223),
    rgb(255, 184, 245)
  );
}
function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `card_imgs/img-${arr[index]}.png`;
    card.addEventListener("click", flipcard);
  });
}
shuffleCard()

cards.forEach((card) => {
  card.addEventListener("click", flipcard);
});
