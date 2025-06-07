const quoteEl = document.getElementById("quote");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakeDisplay = document.getElementById("mistakes");
const startBtn = document.getElementById("start-btn");

const quotes = [
  "Practice makes a man perfect. Frontend developers turn ideas into interactive and visual websites. Stay focused and keep improving your typing skills every day. Typing faster comes with time and patience. JavaScript is a versatile language used for both frontend and backend development",
  "Practice makes a man perfect. Frontend developers turn ideas into interactive and visual websites. Stay focused and keep improving your typing skills every day. Typing faster comes with time and patience. JavaScript is a versatile language used for both frontend and backend development",
  "Practice makes a man perfect. Frontend developers turn ideas into interactive and visual websites. Stay focused and keep improving your typing skills every day. Typing faster comes with time and patience. JavaScript is a versatile language used for both frontend and backend development",
  "Practice makes a man perfect. Frontend developers turn ideas into interactive and visual websites. Stay focused and keep improving your typing skills every day. Typing faster comes with time and patience. JavaScript is a versatile language used for both frontend and backend development",
  "Practice makes a man perfect. Frontend developers turn ideas into interactive and visual websites. Stay focused and keep improving your typing skills every day. Typing faster comes with time and patience. JavaScript is a versatile language used for both frontend and backend development"
];

let timer = 60;
let timerId;
let quote = "";
let mistakes = 0;

function loadQuote() {
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = quote
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");
}

function resetTest() {
  clearInterval(timerId);
  input.value = "";
  input.disabled = false;
  timer = 60;
  mistakes = 0;
  charIndex = 0;
  timeDisplay.textContent = timer;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";
  mistakeDisplay.textContent = 0;
  loadQuote();
  input.focus();
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timer === 0) {
    clearInterval(timerId);
    input.disabled = true;
    calculateWPM();
  } else {
    timer--;
    timeDisplay.textContent = timer;
  }
}

input.addEventListener("input", () => {
  const inputText = input.value;
  const quoteChars = quoteEl.querySelectorAll("span");
  mistakes = 0;

  quoteChars.forEach((charSpan, index) => {
    const typedChar = inputText[index];

    if (!typedChar) {
      charSpan.classList.remove("correct", "incorrect");
    } else if (typedChar === charSpan.textContent) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
      mistakes++;
    }
  });

  mistakeDisplay.textContent = mistakes;

  const correctChars = inputText.length - mistakes;
  const accuracy = Math.max(0, Math.floor((correctChars / inputText.length) * 100));
  accuracyDisplay.textContent = isNaN(accuracy) ? "100%" : `${accuracy}%`;
});

function calculateWPM() {
  const wordsTyped = input.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / (60 - timer)) * 60);
  wpmDisplay.textContent = isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;
}

startBtn.addEventListener("click", resetTest);
