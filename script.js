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

function calcOperand(operand) {
    if(first == null) {
        first = operand;
    }
    else if (operator == null) {
        first = first + operand;
    } 
    else if (second == null) {
        second = operand;
    }
    else {
        second = second + operand;
    }
    
}

function calcOperator(operator) {
    
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
