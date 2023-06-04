class CalculatorViewModel {
    #_calculatorContainerElement = document.querySelector('.calculator-container')
    get #calculatorContainerElement() { return this.#_calculatorContainerElement }

    #_historyFieldElement = this.#calculatorContainerElement.querySelector('.history-field')
    get #historyFieldElement() { return this.#_historyFieldElement }

    #_outputFieldElement = this.#calculatorContainerElement.querySelector('.output-field')
    get #outputFieldElement() { return this.#_outputFieldElement }

    #_lastInputtedSymbol = ''
    get #lastInputtedSymbol() { return this.#_lastInputtedSymbol }
    set #lastInputtedSymbol(value) { this.#_lastInputtedSymbol = value }

    get #history() { return this.#historyFieldElement.textContent }
    set #history(value) { this.#historyFieldElement.textContent = value }

    get #output() { return this.#_outputFieldElement.textContent }
    set #output(value) { this.#outputFieldElement.textContent = value }

    digitButtonClicked(digit) {
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#history = ''
            this.#output = ''
        } else if (this.#output == '0' || ['+', '-', '*', '÷', '^', '='].includes(this.#lastInputtedSymbol))
            this.#output = ''
        if (this.#lastInputtedSymbol == '=')
            this.#history = ''
        this.#output += digit
        this.#lastInputtedSymbol = digit
    }

    operatorButtonClicked(operator) {
        if (['+', '-', '*', '÷', '^'].includes(this.#lastInputtedSymbol)) {
            this.#history = `${this.#history.slice(0, -2)}${operator} `
            return
        }
        if (this.#lastInputtedSymbol == '=') {
            this.#history = this.#output
            this.#history = ''
        }
        this.#history += ['!', '√'].includes(this.#lastInputtedSymbol)
        ? ` ${operator} `
        : `${this.#output} ${operator} `
        this.#output = calculate(this.#history.slice(0, -3))
        this.#lastInputtedSymbol = operator
    }

    clearButtonClicked() {
        this.#history = ''
        this.#output = '0'
        this.#lastInputtedSymbol = 'C'
    }

    backspaceButtonClicked() {
        if (this.#output != '0')
            this.#output = this.#output.slice(0, -1)
        if (this.#output == '')
            this.#output = '0'
        this.#lastInputtedSymbol = '⌫'
    }

    changeSignButtonClicked() {
        if (['=', '!', '√'].includes(this.#lastInputtedSymbol))
            this.#history = ''
        if (this.#output == '0')
            return
        if (this.#output[0] != '-')
            this.#output = `-${this.#output}`
        else
            this.#output = this.#output.slice(1)
        this.#lastInputtedSymbol = '±'
    }

    pointButtonClicked() {
        if (['+', '-', '*', '÷', '=', '^'].includes(this.#lastInputtedSymbol)) {
            this.#output = '0'
            if (this.#lastInputtedSymbol == '=') this.#history = ''
        } else if (this.#output.includes('.'))
            return
        this.#output += '.'
        this.#lastInputtedSymbol = '.'
    }

    equalButtonClicked() {
        if (this.#lastInputtedSymbol == '=')
            return
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#output = calculate(this.#history)
        } else {
            this.#history += this.#output
            this.#output = calculate(this.#history)
        }
        this.#history += ' ='
        this.#lastInputtedSymbol = '='
    }

    percentButtonClicked() {
        if (this.#lastInputtedSymbol == '=')
            return
        this.#output = calculate(this.#history.slice(0, -3)) * this.#output / 100.0
        this.#lastInputtedSymbol = '%'
    }

    factorialButtonClicked() {
        if (this.#lastInputtedSymbol == '!')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#history = `${this.#output}!`
            this.#output = calculate(this.#history)
        } else {
            this.#history += `${this.#output}!`
            this.#output = calculate(this.#history)
        }
        this.#lastInputtedSymbol = '!'
    }

    rootButtonClicked() {
        if (this.#lastInputtedSymbol == '√')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#history = `√(${this.#output})`
            this.#output = calculate(this.#history)
        } else {
            this.#history += `√(${this.#output})`
            this.#output = calculate(this.#history)
        }
        this.#lastInputtedSymbol = '√'
    }
}
