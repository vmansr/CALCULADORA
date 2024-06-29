document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    function clearDisplay() {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.value = '';
    }

    function appendToDisplay(value) {
        currentInput += value;
        display.value = currentInput;
    }

    function calculateResult() {
        if (firstOperand !== null && operator !== '' && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
                default:
                    return;
            }
            display.value = result;
            currentInput = result.toString();
            operator = '';
            firstOperand = null;
        }
    }

    function setOperator(op) {
        if (currentInput !== '') {
            firstOperand = parseFloat(currentInput);
            operator = op;
            currentInput = '';
        }
    }

    window.clearDisplay = clearDisplay;
    window.appendToDisplay = function(value) {
        if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendToDisplay(value);
        }
    };
    window.calculateResult = calculateResult;

    // Manejo de entradas del teclado
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key) || key === '.') {
            appendToDisplay(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            setOperator(key);
        } else if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (key === 'Escape') {
            clearDisplay();
        }
    });
});