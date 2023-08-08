const OP_ADD = 'add';
const OP_SUB = 'subtract';
const OP_MUL = 'multiply';
const OP_DIV = 'divide';
const DIV_0_MESSAGE = 'No Div0 4 u!';

const LastPressed = Object.freeze({
  NOTHING: 0,
  DIGIT: 1,
  BINARY_OPERATION: 2,
  EQUALS: 3,
});

const displayedNumber = {
  raw: null,
  formatted: null,
  _lastOperation: null,
  _lastFirstNumber: null,
  _lastSecondNumber: null,
  _displayId: null,
  _maxLength: 0,
  setRaw(value) {
    this.raw = value;
    return this;
  },
  setLastOperate(operation, firstNumber, secondNumber) {
    this._lastOperation = operation;
    this._lastFirstNumber = firstNumber;
    this._lastSecondNumber = secondNumber;
  },
  setDisplay(elementId) {
    this._displayId = '#' +  elementId;
    return this;
  },
  setMaxLength(value) {
    this._maxLength = value;
    return this;
  },
  format() {
    this.formatted = +this.raw.toString().slice(0, this._maxLength);
    if (this.formatted === NaN ||
        this.formatted === Infinity ||
        this.formatted === -Infinity) {
      setNormalFunctionsDisabled(true);

      if (this._lastOperation === OP_DIV && this._lastSecondNumber === 0) {
        this.formatted = DIV_0_MESSAGE;
        this.display();
      }
    }
    return this;
  },
  display() {
    document.querySelector(this._displayId).textContent = this.formatted;
    return this;
  },
};

let lastPressed;
let inputNumber;
let firstNumber;
let secondNumber;
let operation;
let operationPressed;

function initialize() {
  lastPressed = LastPressed.NOTHING;
  inputNumber = '0';
  displayedNumber.raw = inputNumber;
  firstNumber = null;
  secondNumber = null;
  operation = null;
  operationPressed = false;
}

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
  displayedNumber.setRaw(inputNumber).format().display();
}

function tallyAndUpdateDisplay() {
  inputNumber = operate(operation, firstNumber, secondNumber);
  displayedNumber.setLastOperate(operation, firstNumber, secondNumber);
  updateDisplay();
}

function registerDigit(event) {
  if (lastPressed !== LastPressed.DIGIT) {
    inputNumber = '0';
  }
  inputNumber += event.target.textContent;
  updateDisplay();
  inputNumber = displayedNumber.formatted;
  lastPressed = LastPressed.DIGIT;
}

function registerBinaryOperation(event) {
  if (lastPressed === LastPressed.DIGIT && firstNumber !== null && operation !== null) {
    secondNumber = inputNumber;
    tallyAndUpdateDisplay();
  }
  firstNumber = inputNumber;
  operation = event.target.id;
  lastPressed = LastPressed.BINARY_OPERATION;
  operationPressed = true;
}

function registerEquals() {
  if (firstNumber !== null && operation !== null) {
    if (lastPressed === LastPressed.DIGIT) {
      if (operationPressed) {
        secondNumber = inputNumber;
        operationPressed = false;
      }
      else {
        firstNumber = inputNumber;
      }
    }
    else if (lastPressed === LastPressed.BINARY_OPERATION) {
      secondNumber = inputNumber;
    }
    else {
      firstNumber = inputNumber;
    }
    tallyAndUpdateDisplay();
  }
  lastPressed = LastPressed.EQUALS;
}

function setNormalFunctionsDisabled(flag) {
  document
    .querySelectorAll('.btn')
    .forEach((button) => {
      if (!button.classList.contains('clear')) {
        button.disabled = flag;
      }
    });
}

function registerClear() {
  initialize();
  setNormalFunctionsDisabled(false);
  updateDisplay();
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

function addClearButtonListener() {
  document
    .querySelector('#clear')
    .addEventListener('click', registerClear);
}

function main() {
  displayedNumber
    .setDisplay('display')
    .setMaxLength(14);
  initialize();
  addNumButtonListeners();
  addOpButtonListeners();
  addEqualButtonListener();
  addClearButtonListener();
}

window.addEventListener('load', main);