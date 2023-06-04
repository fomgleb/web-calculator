const calculate = expressionString => {
    let elements = expressionString.split(' ');
    console.log(elements);

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].includes('!'))
            elements[i] = Math.factorial(+elements[i].slice(0, -1))
        else if (elements[i].includes('√'))
            elements[i] = Math.sqrt(+elements[i].slice(2, -1))
    }

    for (let i = 0; i < elements.length; i++) {
        if (elements[i] === '^') {
            elements.splice(i - 1, 3, Math.pow(elements[i - 1], elements[i + 1]))
            i--
        }
    }

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
