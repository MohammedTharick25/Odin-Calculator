let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");

let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;

// Functions
function resetDisplay() {
  display.innerText = "0";
  shouldResetDisplay = false;
}

function appendNumber(number) {
  if (display.innerText === "0" || shouldResetDisplay) {
    display.innerText = number;
    shouldResetDisplay = false;
  } else {
    display.innerText += number;
  }
}

function appendDecimal() {
  if (shouldResetDisplay) {
    display.innerText = "0";
    shouldResetDisplay = false;
  }
  if (!display.innerText.includes(".")) {
    display.innerText += ".";
  }
}

function backspace() {
  if (shouldResetDisplay) return;
  if (display.innerText.length === 1) {
    display.innerText = "0";
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function chooseOperator(op) {
  if (operator !== null) compute();
  firstNumber = parseFloat(display.innerText);
  operator = op;
  shouldResetDisplay = true;
}

function compute() {
  if (operator === null || shouldResetDisplay) return;
  secondNumber = parseFloat(display.innerText);
  let result;
  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        alert("Cannot divide by zero");
        resetDisplay();
        operator = null;
        return;
      }
      result = firstNumber / secondNumber;
      break;
  }
  display.innerText = result;
  firstNumber = result;
  operator = null;
  shouldResetDisplay = true;
}

// Button click events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clear")) {
      firstNumber = null;
      secondNumber = null;
      operator = null;
      resetDisplay();
    } else if (button.classList.contains("equals")) {
      compute();
    } else if (button.classList.contains("operator")) {
      chooseOperator(button.innerText);
    } else if (button.classList.contains("decimal")) {
      appendDecimal();
    } else if (button.classList.contains("backspace")) {
      backspace();
    } else {
      appendNumber(button.innerText);
    }
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (e.key === "=" || e.key === "Enter") compute();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    resetDisplay();
  }
  if (["+", "-", "*", "/"].includes(e.key)) chooseOperator(e.key);
});
