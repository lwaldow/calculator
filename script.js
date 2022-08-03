const DECIMAL_PLACES = 9;

const operators = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a ,b) => a * b,
    divide: (a, b) => a / b
}

const states = {
    FIRST_ZERO: 1,
    FIRST_NONZERO: 2,
    FIRST_FLOAT: 3,
    OPERATOR: 4,
    SECOND_ZERO: 5,
    SECOND_NONZERO: 6,
    SECOND_FLOAT: 7,
    RESULT: 8
}

const data = {
firstNeg: false,
    first: "0",
    operator: undefined,
    secondNeg: false,
    second: "0"
}

document.querySelectorAll(".button").forEach((elem) => elem.addEventListener("click", handleInput))

const display = document.querySelector("#display");

function handleInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "number":
            evalOperand(event.target.innerText);
            break;
        case "add":
            evalOperator(add);
            break;
        case "subtract":
            evalOperator(subtract);
            break;
        case "divide":
            evalOperator(divide);
            break;
        case "multiply":
            evalOperator(multiply);
            break;
        case "clear":
            evalClear();
            break;
        case "negate":
            evalNegate();
            break;
        case "percent":
            evalPercent();
            break;
        case "equals":
            evalEquals();
            break;
        case "decimal":
            evalDecimal();
            break;
    }
}

function evalOperator(operator) {

}

function evalOperand(number) {

}

function evalClear() {

}

function evalNegate() {

}

function evalPercent() {

}

function evalEquals() {

}

function evalDecimal() {
    
}