const DECIMAL_PLACES = 9;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a ,b) => a * b;
const divide = (a, b) => a / b;

document.querySelectorAll(".button").forEach((elem) => elem.addEventListener("click", receiveInput))
//document.querySelectorAll(".operator").forEach((elem) => elem.addEventListener("click", toggleActive));
const display = document.querySelector("#display");


let eq = {
    first: "0",
    operator: null,
    second: "0",
    current: "first"
}

function updateDisplay(content) {
    if(content === "first" || content === "second") {
        display.innerText = eq[content];
    }
    else {
        display.innerText = content;
    }
}

function updateOperand(operand) {
    if(eq.current === "first") {
        eq.first = eq.first === "0" ? operand : eq.first + operand;
    } else {
        eq.second = eq.second === "0" ? operand : eq.second + operand;
        eq.current = "second";
    }
    updateDisplay(eq.current);
}

function updateOperator(operator) {
    if(eq.current === "second") {
        eq.first = operate(eq.first, eq.operator, eq.second);
        eq.second = "0";
    }
    eq.operator = operator;
    eq.current = "operator";
    updateDisplay(eq.first);
}

function evalEquals() {
    if(eq.current === "second") {
        eq.first = operate(eq.first, eq.operator, eq.second);
    } 
    else if (eq.current === "operator"){
        eq.first = operate(eq.first, eq.operator, eq.first);
    }
    else {
        return;
    }
    eq.operator = null;
    eq.second = "0";
    eq.current = "first";
    updateDisplay(eq.current);
}

function operate(a, operator, b) {
    return roundNumber(operator(+(a), +(b)));
}

function roundNumber(num) {
    return "" + Math.round(num * Math.pow(10, DECIMAL_PLACES)) / Math.pow(10, DECIMAL_PLACES);
}

function receiveInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "add":
            updateOperator(add);
            break;
        case "subtract":
            updateOperator(subtract);
            break;
        case "divide":
            updateOperator(divide);
            break;
        case "multiply":
            updateOperator(multiply);
            break;
        case "clear":
            break;
        case "negate":
            break;
        case "percent":
            break;
        case "equals":
            evalEquals();
            break;
        case "decimal":
            break;
        case undefined:
            updateOperand(event.target.innerText);
            break;

    }
}

