const DECIMAL_PLACES = 8;

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

const operatorElems = {
    add: document.querySelector('[data-input="add"]'),
    subtract: document.querySelector('[data-input="subtract"]'),
    multiply: document.querySelector('[data-input="multiply"]'),
    divide: document.querySelector('[data-input="divide"]')
}

document.querySelectorAll(".button").forEach((elem) => elem.addEventListener("click", handleInput))

const display = document.querySelector("#display");
const innerDisplay = document.querySelector("#inner-display");

function updateDisplayTo(which) {
    if(which !== "first" && which !== "second") {
        console.log("INVALID INPUT");
        return;
    }
    innerDisplay.innerText = data[`${which}Neg`] ? "-" + data[which] : data[which]
    scaleText();
}

function scaleText() {
    let dispWidth = display.clientWidth - 16;
    let innerWidth = innerDisplay.clientWidth;
    console.log(`iw=${innerWidth}, dw=${dispWidth}`);
    if(innerWidth > dispWidth - 16) {
        let proportion = (innerDisplay.clientHeight / 1.15) / innerWidth;
        console.log(proportion);
        innerDisplay.style.fontSize = Math.floor(proportion * dispWidth) + "px";
    } else {
        innerDisplay.style.fontSize = "72px";
    }
}

function updateDataFromOperate(which) {
    let result = operateFromData();
    data[`${which}Neg`] = result.neg;
    data[which] = result.val;
}

function copyFirstToSecond() {
    data.second = data.first;
    data.secondNeg = data.firstNeg;
}

function negate(which) {
    data[which] = !data[which];
}

function operateFromData() {
    let a = data.firstNeg ? (-1) * +(data.first) : +(data.first);
    let b = data.secondNeg ? (-1) * +(data.second) : +(data.second);
    let result = data.operator(a,b);
    let isNeg = result < 0;
    if (isNeg) result *= -1;
    return {neg: isNeg, val: "" + roundTo(result, DECIMAL_PLACES)};
}

function roundTo(num, places) {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}

function removeOperatorHighlight() {
    for (let op in operatorElems) {
        operatorElems[op].classList.remove("highlight");
    }
}

function handleInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "number":
            evalOperand(event.target.innerText);
            removeOperatorHighlight();
            break;

        case "add":
        case "subtract":
        case "divide":
        case "multiply":
            evalOperator(operators[input]);
            removeOperatorHighlight();
            operatorElems[input].classList.add("highlight");
            break;

        case "clear":
            evalClear();
            removeOperatorHighlight();
            break;
        case "negate":
            evalNegate();
            break;
        case "percent":
            evalPercent();
            break;
        case "equals":
            evalEquals();
            removeOperatorHighlight();
            break;
        case "decimal":
            evalDecimal();
            removeOperatorHighlight();
            break;
    }
}

function evalOperand(number) {
    switch(data.currentState) {
        case states.FIRST_ZERO:
            if (number === "0") return;
            data.first = number;
            data.currentState = states.FIRST_NONZERO;
            updateDisplayTo("first");
            break;
        
        case states.FIRST_FLOAT:
        case states.FIRST_NONZERO:
            if(data.first.length > DECIMAL_PLACES) return;
            data.first += number;
            updateDisplayTo('first');
            break;
        
        case states.OPERATOR:
            data.second = number;
            data.currentState = (number === "0") ?  states.SECOND_ZERO : states.SECOND_NONZERO;
            updateDisplayTo('second');
            break;
        
        case states.SECOND_ZERO:
            if (number === "0") return;
            data.second = number;
            data.currentState = states.SECOND_NONZERO;
            updateDisplayTo('second');
            break;

        case states.SECOND_FLOAT:
        case states.SECOND_NONZERO:
            if(data.first.length > DECIMAL_PLACES) return;
            data.second += number;
            updateDisplayTo('second');
            break;

        case states.RESULT:
            data.second = number;
            data.currentState = (number === "0") ?  states.FIRST_ZERO : states.FIRST_NONZERO;
            updateDisplayTo('first');
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
            updateDataFromOperate("first");
            data.second = "0"
            data.operator = operator;
            data.currentState = states.OPERATOR;
            updateDisplayTo('first');
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
            updateDataFromOperate("first");
            updateDisplayTo('first');
            break;

        case states.OPERATOR:
            data.currentState = states.RESULT;
            copyFirstToSecond();
            updateDataFromOperate("first");
            // toggle off operator button ?
            updateDisplayTo('first');
            break;

        case states.RESULT:
            updateDataFromOperate("first");
            updateDisplayTo('first');
            break;
    }
}

function evalDecimal() {
    switch(data.currentState) {
        case states.FIRST_ZERO:
        case states.FIRST_NONZERO:
            data.currentState = states.FIRST_FLOAT;
            data.first += ".";
            updateDisplayTo('first');
            break;

        case states.SECOND_ZERO:
        case states.SECOND_NONZERO:
            data.currentState = states.SECOND_FLOAT;
            data.second += ".";
            updateDisplayTo("second");
            break;

        case states.OPERATOR:
            data.currentState = states.SECOND_FLOAT;
            data.second = "0.";
            updateDisplayTo("second");
            break;

        case states.RESULT:
            data.currentState = states.FIRST_FLOAT;
            data.first = "0.";
            updateDisplayTo("first");
            break;

        case states.FIRST_FLOAT:
        case states.SECOND_FLOAT:
            //do nothing
            break;
    }
}