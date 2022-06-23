const typingText = document.querySelector(".typing-text");
const inpField = document.querySelector(".main .input-field");
timeTag = document.querySelector(".time span b");
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
tryAgainBtn = document.querySelector("button");
let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);
function randomParagraphs() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;

        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerHTML = wpm;
    mistakeTag.innerHTML = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    alert("Opps ! Time is up \u{1F605}");
    inpField.value = "";
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  randomParagraphs();
  (timeLeft = maxTime), (charIndex = mistakes = isTyping = 0);
  timeTag.innerHTML = timeLeft;
  wpmTag.innerHTML = 0;
  mistakeTag.innerHTML = mistakes;
  cpmTag.innerText = 0;
  inpField.value = "";
  clearInterval(timer);
}
randomParagraphs();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
