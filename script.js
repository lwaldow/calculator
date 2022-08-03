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
    currentState: states.FIRST_ZERO,
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

function evalOperand(number) {
    switch(data.currentState) {
        case states.FIRST_ZERO:
            if (number === "0") return;
            data.first = number;
            data.currentState = states.FIRST_NONZERO;
            // update display to data.first
            break;
        
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
            data.first += number;
            //update display to data.first
            break;
        
        case states.OPERATOR:
            data.second = number;
            data.currentState = (number === "0") ?  states.SECOND_ZERO : states.SECOND_NONZERO;
            // update display to data.second
            break;
        
        case states.SECOND_ZERO:
            if (number === "0") return;
            data.second = number;
            data.currentState = states.SECOND_NONZERO;
            // update display to data.second
            break;

        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
            data.first += number;
            //update display to data.second
            break;

        case states.RESULT:
            data.first = number;
            data.currentState = (number === "0") ?  states.FIRST_ZERO : states.FIRST_NONZERO;
            // update display to data.first
            break;
    }
}

function evalOperator(operator) {

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