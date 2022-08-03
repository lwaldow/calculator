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

function operateFromData() {
    let a = firstNeg ? (-1) * +(data.first) : +(data.first);
    let b = secondNeg ? (-1) * +(data.second) : +(data.second);
    console.log(`a: ${a}`);
    console.log(`b: ${b}`);
    console.log(round(data.operator(a,b), DECIMAL_PLACES));
    return "" + round(data.operator(a,b), DECIMAL_PLACES);
}

function roundTo(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}

function handleInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "number":
            evalOperand(event.target.innerText);
            break;
        case "add":
            evalOperator(operators.add);
            break;
        case "subtract":
            evalOperator(operators.subtract);
            break;
        case "divide":
            evalOperator(operators.divide);
            break;
        case "multiply":
            evalOperator(operators.multiply);
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
    switch (data.currentState) {
        case states.RESULT:
        case states.FIRST_ZERO:
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
            data.operator = operator;
            data.currentState = states.OPERATOR;
            // update operator button to toggle on (maybe do this purely based on clicks and not logically)
            break;
        
        case states.OPERATOR:
            data.operator = operator;
            //update prev operator button toggled off, new operator btn toggled on (not here?)
            break;

        case states.SECOND_ZERO:
        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
            data.first = operateFromData();
            data.second = "0"
            data.operator = operator;
            data.currentState = states.OPERATOR;
            // update display to data.first
            // update operator btn to toggle on (not here?)
            break;
    }
}

function evalClear() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
        case states.SECOND_ZERO:
        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
        case states.OPERATOR:
        case states.RESULT:
    }
}

function evalNegate() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
        case states.SECOND_ZERO:
        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
        case states.OPERATOR:
        case states.RESULT:
    }
}

function evalPercent() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
        case states.SECOND_ZERO:
        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
        case states.OPERATOR:
        case states.RESULT:
    }
}

function evalEquals() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
            data.currentState = states.RESULT;
            break;

        case states.SECOND_ZERO:
        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
            data.currentState = states.RESULT;
            data.first = operateFromData();
            // update display to data.first
            break;

        case states.OPERATOR:
            data.currentState = states.RESULT;
            data.second = data.first;
            data.first = operateFromData();
            // toggle off operator button ?
            //update display to data.first
            break;

        case states.RESULT:
            data.first = operateFromData();
            //update display to data.first
            break;
    }
}

function evalDecimal() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_NONZERO:
            data.currentState = states.FIRST_FLOAT;
            data.first += ".";
            //update display to data.first
            break;

        case states.SECOND_ZERO:
        case states.SECOND_NONZERO:
            data.currentState = states.SECOND_FLOAT;
            data.second += ".";
            //update display to data.second
            break;

        case states.OPERATOR:
            data.currentState = states.SECOND_FLOAT;
            data.second = "0.";
            //update display to data.second
            break;

        case states.RESULT:
            data.currentState = states.FIRST_FLOAT;
            data.first = "0.";
            //update display to data.first
            break;

        case states.FIRST_FLOAT:
        case states.SECOND_FLOAT:
            //do nothing
            break;
    }
}