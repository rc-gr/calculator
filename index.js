let first = '';
let second = '';
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
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      alert('Invalid operation!');
      break;
  }
}

function updateDisplay() {
  document.querySelector('#display').textContent =
    [first, operation, second].join(' ');
}

function appendDigit(event) {
  first += event.target.textContent;
  first = +first;
  updateDisplay()
}

function addNumButtonListeners() {
  document
    .querySelectorAll('.num')
    .forEach((button) => {
      button.addEventListener('click', appendDigit)
    })
}

function main() {
  addNumButtonListeners();
}

window.addEventListener('load', main);