const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a ,b) => a * b;
const divide = (a, b) => a / b;

document.querySelectorAll(".button").forEach((elem) => elem.addEventListener("click", receiveInput))


let eq = {
    first: "0",
    operator: null,
    second: "0",
    current: "first"
}

function updateOperand(operand) {
    if(eq.current === "first") {
        eq.first = eq.first === "0" ? operand : eq.first + operand;
    } else {
        eq.second = eq.second === "0" ? operand : eq.second + operand;
    }
    updateDisplay(eq.current);
}

/*     if(equation.first === null) {
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
     */

function updateOperator(operator) {
    if(eq.current === "first") {
        eq.operator = operator;
        eq.current = "second";
    } else {
        eq.first = operate(...eq);
        eq.operator = operator;
        eq.second = "0";
        eq.current = "second";
    }
    updateDisplay(eq.current);
}
    /* if(equation.first === null) {
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
} */

function evalEquals() {
    if (equation.first !== null && equation.operator !== null && equation.second !== null) {
        equation.first = operate(...equation);
        equation.operator = null;
        equation.second = null;
        updateDisplay("first");
    } else if(equation.first && !equation.operator) {
        
    }
}

function operate(a, operator, b) {
    return operator(+a, +b);
}

function receiveInput(event) {
    let input = event.target.dataset.input;
    switch(input) {
        case "add":
            updateOperator(add);
            break;
        case "equals":
            evalEquals();
            break;
        case null:
            let num = event.target.innerText;

            break;

    }
}
