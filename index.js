const OP_ADD = 'add';
const OP_SUB = 'subtract';
const OP_MUL = 'multiply';
const OP_DIV = 'divide';

const LastPressed = Object.freeze({
  NOTHING: 0,
  DIGIT: 1,
  BINARY_OPERATION: 2,
  EQUALS: 3,
});

let lastPressed = LastPressed.NOTHING;
let shownNumber = '0';
let firstNumber = null;
let secondNumber = null;
let operation = null;
let displayText = '0';
let operationPressed = false;

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(op, a, b) {
  if (operation === null || firstNumber === null || secondNumber === null) {
    alert('Operation failed due to null values!');
    return undefined;
  }
  switch(op) {
    case OP_ADD:
      return add(a, b);
    case OP_SUB:
      return subtract(a, b);
    case OP_MUL:
      return multiply(a, b);
    case OP_DIV:
      return divide(a, b);
    default:
      alert('Invalid operation!');
      return undefined;
  }
}

function updateDisplay() {
  document.querySelector('#display').textContent = shownNumber;
}

function tallyAndUpdateDisplay() {
  shownNumber = operate(operation, firstNumber, secondNumber);
  updateDisplay();
}

function registerDigit(event) {
  if (lastPressed !== LastPressed.DIGIT) {
    shownNumber = '0';
  }
  shownNumber += event.target.textContent;
  shownNumber = +shownNumber;
  updateDisplay();
  lastPressed = LastPressed.DIGIT;
}

function registerBinaryOperation(event) {
  if (lastPressed === LastPressed.DIGIT && firstNumber !== null && operation !== null) {
    secondNumber = shownNumber;
    tallyAndUpdateDisplay();
  }
  firstNumber = shownNumber;
  operation = event.target.id;
  lastPressed = LastPressed.BINARY_OPERATION;
  operationPressed = true;
}

function registerEquals() {
  if (firstNumber !== null && operation !== null) {
    if (lastPressed === LastPressed.DIGIT) {
      if (operationPressed) {
        secondNumber = shownNumber;
        operationPressed = false;
      }
      else {
        firstNumber = shownNumber;
      }
    }
    else if (lastPressed === LastPressed.BINARY_OPERATION) {
      secondNumber = shownNumber;
    }
    else {
      firstNumber = shownNumber;
    }
    tallyAndUpdateDisplay();
  }
  lastPressed = LastPressed.EQUALS;
}

function addNumButtonListeners() {
  document
    .querySelectorAll('.num')
    .forEach((button) => {
      button.addEventListener('click', registerDigit);
    });
}

function addOpButtonListeners() {
  document
    .querySelectorAll('.op')
    .forEach((button) => {
      button.addEventListener('click', registerBinaryOperation);
    });
}

function addEqualButtonListener() {
  document
    .querySelector('#equals')
    .addEventListener('click', registerEquals);
}

function main() {
  addNumButtonListeners();
  addOpButtonListeners();
  addEqualButtonListener();
}

window.addEventListener('load', main);