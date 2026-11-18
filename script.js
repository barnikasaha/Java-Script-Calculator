
// ==========================================
// 1. GET HTML ELEMENTS
// ==========================================

const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");
const buttons = document.querySelectorAll("[data-value]");


// ==========================================
// 2. CALCULATOR VARIABLES
// ==========================================

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldReset = false;


// ==========================================
// 3. UPDATE DISPLAY
// ==========================================

function updateDisplay() {
    display.value = currentInput;
}


// ==========================================
// 4. HANDLE NUMBER AND OPERATOR BUTTONS
// ==========================================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.getAttribute("data-value");

        // Handle percentage
        if (value === "%") {
            currentInput = String(parseFloat(currentInput) / 100);
            shouldReset = true;
            updateDisplay();
            return;
        }

        // Handle decimal point
        if (value === ".") {

            if (shouldReset) {
                currentInput = "0";
                shouldReset = false;
            }

            if (!currentInput.includes(".")) {
                currentInput += ".";
            }

            updateDisplay();
            return;
        }

        // Handle operators
        if (["+", "-", "*", "/"].includes(value)) {
            chooseOperator(value);
            return;
        }

        // Handle numbers
        if (shouldReset || currentInput === "0") {
            currentInput = value;
            shouldReset = false;
        } else {
            currentInput += value;
        }

        updateDisplay();

    });

});


// ==========================================
// 5. SELECT OPERATOR
// ==========================================

function chooseOperator(selectedOperator) {

    if (operator !== null && !shouldReset) {
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldReset = true;

}


// ==========================================
// 6. PERFORM CALCULATIONS
// ==========================================

function calculate() {

    if (operator === null || previousInput === "") {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentInput = "Error";
                previousInput = "";
                operator = null;
                shouldReset = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

    }

    // Remove unnecessary decimal digits
    currentInput = String(Number(result.toPrecision(12)));

    previousInput = "";
    operator = null;
    shouldReset = true;

    updateDisplay();

}


// ==========================================
// 7. CLEAR ALL (AC BUTTON)
// ==========================================

function clearCalculator() {

    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldReset = false;

    updateDisplay();

}


// ==========================================
// 8. DELETE LAST DIGIT (DEL BUTTON)
// ==========================================

function deleteNumber() {

    if (shouldReset || currentInput === "Error") {
        currentInput = "0";
        shouldReset = false;
    } else {

        currentInput = currentInput.length > 1
            ? currentInput.slice(0, -1)
            : "0";

    }

    updateDisplay();

}


// ==========================================
// 9. BUTTON EVENT LISTENERS
// ==========================================

// AC button
clearButton.addEventListener("click", clearCalculator);

// DEL button
deleteButton.addEventListener("click", deleteNumber);

// Equals button
equalsButton.addEventListener("click", calculate);


// ==========================================
// 10. INITIALIZE CALCULATOR
// ==========================================

updateDisplay();
