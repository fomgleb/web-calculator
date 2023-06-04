class Calculator extends EventTarget {
    historyChangedEventName = 'historyChangedEvent'
    #_history = ''
    get #history() { return this.#_history }
    set #history(value) {
        this.#_history = value
        this.dispatchEvent(new CustomEvent(this.historyChangedEventName, {
            detail: { newHistory: this.#history }
        }))
    }

    inputChangedEventName = 'inputChangedEvent'
    #_input = ''
    get #input() { return this.#_input }
    set #input(value) {
        this.#_input = value
        this.dispatchEvent(new CustomEvent(this.inputChangedEventName, {
            detail: { newInput: this.#input }
        }))
    }

    #_lastInputtedSymbol = ''
    get #lastInputtedSymbol() { return this.#_lastInputtedSymbol }
    set #lastInputtedSymbol(value) { this.#_lastInputtedSymbol = value }

    inputDigit(digit) {
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#history = ''
            this.#input = ''
        } else if (this.#input == '0' || ['+', '-', '*', '÷', '^', '='].includes(this.#lastInputtedSymbol))
            this.#input = ''
        if (this.#lastInputtedSymbol == '=')
            this.#history = ''
        this.#input += digit
        this.#lastInputtedSymbol = digit
    }

    inputOperator(operator) {
        if (['+', '-', '*', '÷', '^'].includes(this.#lastInputtedSymbol)) {
            this.#history = `${this.#history.slice(0, -2)}${operator} `
            return
        }
        if (this.#lastInputtedSymbol == '=') {
            this.#history = this.#input
            this.#history = ''
        }
        this.#history += ['!', '√'].includes(this.#lastInputtedSymbol)
        ? ` ${operator} `
        : `${this.#input} ${operator} `
        this.#input = this.#calculate(this.#history.slice(0, -3))
        this.#lastInputtedSymbol = operator
    }

    clearAll() {
        this.#history = ''
        this.#input = '0'
        this.#lastInputtedSymbol = 'C'
    }

    clearOne() {
        if (this.#input != '0')
            this.#input = this.#input.slice(0, -1)
        if (this.#input == '')
            this.#input = '0'
        this.#lastInputtedSymbol = '⌫'
    }

    changeInputSign() {
        if (['=', '!', '√'].includes(this.#lastInputtedSymbol))
            this.#history = ''
        if (this.#input == '0')
            return
        if (this.#input[0] != '-')
            this.#input = `-${this.#input}`
        else
            this.#input = this.#input.slice(1)
        this.#lastInputtedSymbol = '±'
    }

    inputPoint() {
        if (['+', '-', '*', '÷', '=', '^'].includes(this.#lastInputtedSymbol)) {
            this.#input = '0'
            if (this.#lastInputtedSymbol == '=') this.#history = ''
        } else if (this.#input.includes('.'))
            return
        this.#input += '.'
        this.#lastInputtedSymbol = '.'
    }

    inputEqual() {
        if (this.#lastInputtedSymbol == '=')
            return
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#input = this.#calculate(this.#history)
        } else {
            this.#history += this.#input
            this.#input = this.#calculate(this.#history)
        }
        this.#history += ' ='
        this.#lastInputtedSymbol = '='
    }

    inputPercent() {
        if (this.#lastInputtedSymbol == '=')
            return
        this.#input = this.#calculate(this.#history.slice(0, -3)) * this.#input / 100.0
        this.#lastInputtedSymbol = '%'
    }

    inputFactorial() {
        if (this.#lastInputtedSymbol == '!')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#history = `${this.#input}!`
            this.#input = this.#calculate(this.#history)
        } else {
            this.#history += `${this.#input}!`
            this.#input = this.#calculate(this.#history)
        }
        this.#lastInputtedSymbol = '!'
    }

    inputRoot() {
        if (this.#lastInputtedSymbol == '√')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#history = `√(${this.#input})`
            this.#input = this.#calculate(this.#history)
        } else {
            this.#history += `√(${this.#input})`
            this.#input = this.#calculate(this.#history)
        }
        this.#lastInputtedSymbol = '√'
    }

    #calculate = expressionString => {
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
}
