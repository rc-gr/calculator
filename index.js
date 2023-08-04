let first = 0;
let second = 0;
let operation = '';

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

function appendDigit(event) {
  console.log(event.target.textContent);
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