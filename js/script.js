const calculate = expressionString => {
    let elements = expressionString.split(' ');
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === '*' || elements[i] === '÷') {
            const result = elements[i] === '*'
                ? parseFloat(elements[i - 1]) * parseFloat(elements[i + 1])
                : parseFloat(elements[i - 1]) / parseFloat(elements[i + 1])
            elements.splice(i - 1, 3, result);
            i--;
        }
    }

    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === '+' || elements[i] === '-') {
            const result = elements[i] === '+'
                ? parseFloat(elements[i - 1]) + parseFloat(elements[i + 1])
                : parseFloat(elements[i - 1]) - parseFloat(elements[i + 1])
            elements.splice(i - 1, 3, result);
            i--;
        }
    }

    return elements[0];
}

const calculatorContainerElement = document.querySelector('.calculator-container')
const historyFieldElement = calculatorContainerElement.querySelector('.history-field')
const outputFieldElement = calculatorContainerElement.querySelector('.output-field')

let lastInputtedSymbol = ''

const operandButtonClicked = operand => {
    if (outputFieldElement.textContent == '0' || ['+', '-', '*', '÷', '='].includes(lastInputtedSymbol))
        outputFieldElement.textContent = ''
    if (lastInputtedSymbol == '=')
        historyFieldElement.textContent = ''
    outputFieldElement.textContent += operand
    lastInputtedSymbol = operand
}

const operatorButtonClicked = operator => {
    if (lastInputtedSymbol == '=') {
        historyFieldElement.textContent = outputFieldElement.textContent
        historyFieldElement.textContent = ''
    }
    historyFieldElement.textContent += `${outputFieldElement.textContent} ${operator} `
    outputFieldElement.textContent = calculate(historyFieldElement.textContent.slice(0, -3))
    lastInputtedSymbol = operator
}

const clearButtonClicked = () => {
    historyFieldElement.textContent = ''
    outputFieldElement.textContent = '0'
    lastInputtedSymbol = 'C'
}

const changeSignButtonClicked = () => {
    if (lastInputtedSymbol == '=')
        historyFieldElement.textContent = ''
    if (outputFieldElement.textContent == '0')
        return
    if (outputFieldElement.textContent[0] != '-')
        outputFieldElement.textContent = `-${outputFieldElement.textContent}`
    else
        outputFieldElement.textContent = outputFieldElement.textContent.slice(1)
    lastInputtedSymbol = '±'
}

const pointButtonClicked = () => {
    if (outputFieldElement.textContent.includes('.'))
        return
    if (lastInputtedSymbol == '=') {
        outputFieldElement.textContent = '0'
        historyFieldElement.textContent = ''
    }
    outputFieldElement.textContent += '.'
    lastInputtedSymbol = '.'
}

const equalButtonClicked = () => {
    if (lastInputtedSymbol == '=')
        return
    historyFieldElement.textContent = `${historyFieldElement.textContent}${outputFieldElement.textContent}`
    outputFieldElement.textContent = calculate(historyFieldElement.textContent)
    historyFieldElement.textContent += ' ='
    lastInputtedSymbol = '='
}
