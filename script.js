
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const back = document.querySelector('[data-back]')
const clear = document.querySelector('[data-clear]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
let currentNum = "";
let previousNum = "";
let operator = "";
const numArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
const operatorArray = ['+', '-', '*', 'x', '/', '=']



document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        doOperation(e.key);
    }
    if (e.key === "*") {
        doOperation("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }


})
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText)
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        doOperation(button.innerText)
    })
})
clear.addEventListener('click', () => {
    currentOperandTextElement.innerText = '0';
    prevOperandTextElement.innerText = '';
    currentNum = "";
    previousNum = "";
    operator = "";
})


back.addEventListener('click', () => {
    handleDelete();
})
equals.addEventListener('click', () => {
    calculate()
})



//functions

function appendNumber(number) {
    if (number === "0" && currentNum === "") return;
    if (currentNum.length < 13) {
        currentNum += number;
        currentOperandTextElement.innerText = currentNum;
    }



}

function doOperation(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op)
    }
    else if (currentNum === "") {
        operatorCheck(op);
    }
    else {
        calculate();
        operator = op;
        currentOperandTextElement.textContent = "0";
        prevOperandTextElement.textContent = previousNum + " " + operator;
    }

}
function operatorCheck(text) {
    operator = text;
    prevOperandTextElement.textContent = previousNum + " " + operator;
    currentOperandTextElement.textContent = "0";
    currentNum = "";
}

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+") {
        previousNum += currentNum;
    } else if (operator === "-") {
        previousNum -= currentNum;
    } else if (operator === "x") {
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayResults();
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = round(previousNum);
    previousNum = previousNum.toString();
    displayResults();

}

function round(number) {
    return Math.round(number * 1000) / 1000;
}

function displayResults() {
    if (previousNum.length <= 10) {
        currentOperandTextElement.textContent = previousNum;
    } else {
        currentOperandTextElement.textContent = previousNum.slice(0, 10) + "...";
    }
    prevOperandTextElement.textContent = "";
    operator = "";
    currentNum = "";
}


function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        currentOperandTextElement.textContent = currentNum;
    }
}
function handleDelete() {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentOperandTextElement.textContent = currentNum;
        if (currentNum === "") {
            currentOperandTextElement.textContent = "0";
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        currentOperandTextElement.textContent = previousNum;
    }
}