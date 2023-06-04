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

    digitButtonClicked(operand) {
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#historyFieldElement.textContent = ''
            this.#outputFieldElement.textContent = ''
        } else if (this.#outputFieldElement.textContent == '0' || ['+', '-', '*', '÷', '^', '='].includes(this.#lastInputtedSymbol))
            this.#outputFieldElement.textContent = ''
        if (this.#lastInputtedSymbol == '=')
            this.#historyFieldElement.textContent = ''
        this.#outputFieldElement.textContent += operand
        this.#lastInputtedSymbol = operand
    }

    operatorButtonClicked(operator) {
        if (['+', '-', '*', '÷', '^'].includes(this.#lastInputtedSymbol)) {
            this.#historyFieldElement.textContent = `${this.#historyFieldElement.textContent.slice(0, -2)}${operator} `
            return
        }
        if (this.#lastInputtedSymbol == '=') {
            this.#historyFieldElement.textContent = this.#outputFieldElement.textContent
            this.#historyFieldElement.textContent = ''
        }
        this.#historyFieldElement.textContent += ['!', '√'].includes(this.#lastInputtedSymbol)
        ? ` ${operator} `
        : `${this.#outputFieldElement.textContent} ${operator} `
        this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent.slice(0, -3))
        this.#lastInputtedSymbol = operator
    }

    clearButtonClicked() {
        this.#historyFieldElement.textContent = ''
        this.#outputFieldElement.textContent = '0'
        this.#lastInputtedSymbol = 'C'
    }

    backspaceButtonClicked() {
        if (this.#outputFieldElement.textContent != '0')
            this.#outputFieldElement.textContent = this.#outputFieldElement.textContent.slice(0, -1)
        if (this.#outputFieldElement.textContent == '')
            this.#outputFieldElement.textContent = '0'
        this.#lastInputtedSymbol = '⌫'
    }

    changeSignButtonClicked() {
        if (['=', '!', '√'].includes(this.#lastInputtedSymbol))
            this.#historyFieldElement.textContent = ''
        if (this.#outputFieldElement.textContent == '0')
            return
        if (this.#outputFieldElement.textContent[0] != '-')
            this.#outputFieldElement.textContent = `-${this.#outputFieldElement.textContent}`
        else
            this.#outputFieldElement.textContent = this.#outputFieldElement.textContent.slice(1)
        this.#lastInputtedSymbol = '±'
    }

    pointButtonClicked() {
        if (['+', '-', '*', '÷', '=', '^'].includes(this.#lastInputtedSymbol)) {
            this.#outputFieldElement.textContent = '0'
            if (this.#lastInputtedSymbol == '=') this.#historyFieldElement.textContent = ''
        } else if (this.#outputFieldElement.textContent.includes('.'))
            return
        this.#outputFieldElement.textContent += '.'
        this.#lastInputtedSymbol = '.'
    }

    equalButtonClicked() {
        if (this.#lastInputtedSymbol == '=')
            return
        if (['!', '√'].includes(this.#lastInputtedSymbol)) {
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        } else {
            this.#historyFieldElement.textContent += this.#outputFieldElement.textContent
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        }
        this.#historyFieldElement.textContent += ' ='
        this.#lastInputtedSymbol = '='
    }

    percentButtonClicked() {
        if (this.#lastInputtedSymbol == '=')
            return
        this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent.slice(0, -3)) * this.#outputFieldElement.textContent / 100.0
        this.#lastInputtedSymbol = '%'
    }

    factorialButtonClicked() {
        if (this.#lastInputtedSymbol == '!')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#historyFieldElement.textContent = `${this.#outputFieldElement.textContent}!`
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        } else {
            this.#historyFieldElement.textContent += `${this.#outputFieldElement.textContent}!`
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        }
        this.#lastInputtedSymbol = '!'
    }

    rootButtonClicked() {
        if (this.#lastInputtedSymbol == '√')
            return
        if (this.#lastInputtedSymbol == '=') {
            this.#historyFieldElement.textContent = `√(${this.#outputFieldElement.textContent})`
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        } else {
            this.#historyFieldElement.textContent += `√(${this.#outputFieldElement.textContent})`
            this.#outputFieldElement.textContent = calculate(this.#historyFieldElement.textContent)
        }
        this.#lastInputtedSymbol = '√'
    }
}
