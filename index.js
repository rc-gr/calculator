const OP_ADD = 'add';
const OP_SUB = 'subtract';
const OP_MUL = 'multiply';
const OP_DIV = 'divide';

let shownNumber = '0';
let storedNumber = '';
let operation = '';
let displayText = '0';

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
      break;
  }
}

function updateDisplay() {
  document.querySelector('#display').textContent = shownNumber;
}

function registerDigit(event) {
  if (operation !== '' && storedNumber === '') {
    storedNumber = shownNumber;
    shownNumber = '';
  }
  shownNumber += event.target.textContent;
  shownNumber = +shownNumber;
  updateDisplay();
}

function registerOperation(event) {
  if (storedNumber !== '') {
    shownNumber = operate(operation, storedNumber, shownNumber);
    updateDisplay();
    storedNumber = '';
  }
  operation = event.target.id;
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
      button.addEventListener('click', registerOperation);
    });
}

function main() {
  addNumButtonListeners();
  addOpButtonListeners();
}

window.addEventListener('load', main);