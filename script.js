const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a ,b) => a * b;
const divide = (a, b) => a / b;

document.querySelectorAll(".button").forEach((elem) => elem.addEventListener("click", receiveInput))


let equation = {
    first: null,
    operator: null,
    second: null
}

function updateOperand(operand) {
    if(equation.first === null) {
        equation.first = operand;
        updateDisplay("first");
    }
    else if (operator === null) {
        equation.first = equation.first + operand;
        updateDisplay("first");
    } 
    else if (equation.second === null) {
        equation.second = operand;
        updateDisplay("second");
    }
    else {
        equation.second = equation.second + operand;
        updateDisplay("second");
    }
    
}

function updateOperator(operator) {
    if(equation.first === null) {
        equation.first = 0;
        equation.operator = operator;
    } 
    else if (operator === null || second === null) {
        equation.operator = operator;
    } 
    else {
        equation.first = operate(...equation);
        equation.operator = operator;
        equation.second = null;
        updateDisplay("first");
    }
}


function operate(a, operator, b) {
    console.log(operator(a, b));
}

function receiveInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "add":
            break;
        case "equals":
            break;
        case null:
            let num = event.target.innerText;

            break;

    }
}
