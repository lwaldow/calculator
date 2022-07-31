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
        eq.first = operate(eq);
        eq.second = "0";
    }
    eq.operator = operator;
    eq.current = "operator";
    updateDisplay(eq.first);
}

function evalEquals() {
    if(eq.current === "second") {
        eq.first = operate(eq);
    } 
    else if (eq.current === "operator"){
        eq.first = operate(eq);
    }
    else {
        return;
    }
    eq.operator = null;
    eq.second = "0";
    eq.current = "first";
    updateDisplay(eq.current);
}

function operate(eq) {
    return eq.operator(+(eq.first), +(eq.second));
}

function receiveInput(event) {
    let input = event.target.dataset.input;
    console.log(input);
    switch(input) {
        case "add":
            updateOperator(add);
            break;
        case "equals":
            evalEquals();
            break;
        case undefined:
            updateOperand(event.target.innerText);
            break;

    }
}

