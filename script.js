/*class Calculator{
    constructor(prevOperandTextElement, currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperandTextElement = '';
        this.prevOperandTextElement = '';
        this.operation = undefined;
    }

    delete(){

    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){

    }

    compute(){

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
    }
}*/




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const back = document.querySelector('[data-back]')
const clear = document.querySelector('[data-clear]')
const prevOperandTextElement = document.querySelector('[data-prev-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
let currentValue = 0.0;
let prevValue = 0.0;
let answer = 0.0;
const numArray = ['1','2','3','4','5','6','7','8','9','0','.']
const operatorArray =['+', '-', '*', 'x', '/', '=']
let justEquals = false;
//const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);
document.addEventListener('keydown', function(e) {
    
    if (e.key === '*')
        doOperation('x')
    if (e.key === '/')
        doOperation('÷')
    if(e.key === '=' || e.key === "Enter")
        calculate('=')
    if (numArray.includes(e.key))
        appendNumber(e.key)
    if(prevValue != 0.0 && operatorArray.includes(e.key))
        calculate(e.key)
    if(prevValue === 0.0)
        if(operatorArray.includes(e.key) && e.key != '=')
            doOperation(e.key)
    
    
})
numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        appendNumber(button.innerText)
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
    if(prevValue === 0.0)
        doOperation(button.innerText)
    calculate(button.innerText)
    })
})
clear.addEventListener('click', () => {
    currentOperandTextElement.innerText='';
    prevOperandTextElement.innerText='';
    currentValue = 0.0;
    prevValue = 0.0;
    total =0.0;
})


back.addEventListener('click', ()=>{
    currentOperandTextElement.innerText = currentOperandTextElement.innerText.slice(0,-1)
})
equals.addEventListener('click', () =>{
    calculate('=')
})



//functions

function appendNumber(number){
    if(justEquals){
        currentOperandTextElement.innerText = ''
        justEquals = false;
        currentValue = 0.0
        
    }
    if (number === '0' && currentValue == 0.0) return;
    if(currentOperandTextElement.innerText.length < 13)
        currentOperandTextElement.innerText = currentOperandTextElement.innerText.toString() + number.toString();
        currentValue = parseFloat(currentOperandTextElement.innerText);
}

function doOperation(operator){
    if(currentValue!=0){
        prevOperandTextElement.innerText = currentOperandTextElement.innerText.toString() + ' ' + operator;
        currentOperandTextElement.innerText = '';
        prevValue = currentValue
        currentValue=0;
    }  

}

function calculate(operator){
    let str = prevOperandTextElement.innerText
    if(operator === '='){
        if (str[str.length-1] === '+')
            total = prevValue + currentValue;
        if (str[str.length-1] === 'x')
            total = prevValue * currentValue;
        if (str[str.length-1] === '-')
            total = prevValue - currentValue;
        if (str[str.length-1] === '÷')
            total = prevValue / currentValue;

        currentValue = total;
        currentOperandTextElement.innerText = '';
        prevOperandTextElement.innerText = '';
        appendNumber(currentValue);
        justEquals = true;
    }
    else{
        if(currentValue != 0.0){
            if (str[str.length-1] === '+')
                total = prevValue + currentValue;
            if (str[str.length-1] === 'x')
                total = prevValue * currentValue;
            if (str[str.length-1] === '-')
                total = prevValue - currentValue;
            if (str[str.length-1] === '÷')
                total = prevValue / currentValue;
            
            prevValue = total;
            prevOperandTextElement.innerText = total + ' ' + operator
            currentOperandTextElement.innerText = ''
            currentValue = 0.0;
        }
    }
    
}