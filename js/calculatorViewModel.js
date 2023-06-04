class CalculatorViewModel {
    #_calculatorContainerElement = document.querySelector('.calculator-container')
    get #calculatorContainerElement() { return this.#_calculatorContainerElement }

    #_historyFieldElement = this.#calculatorContainerElement.querySelector('.history-field')
    get #historyFieldElement() { return this.#_historyFieldElement }

    #_outputFieldElement = this.#calculatorContainerElement.querySelector('.output-field')
    get #outputFieldElement() { return this.#_outputFieldElement }

    #_calculator = new Calculator()
    get #calculator() { return this.#_calculator }

    constructor() {
        this.#calculator.addEventListener(this.#calculator.inputChangedEventName, event => {
            this.#outputFieldElement.textContent = event.detail.newInput
        })

        this.#calculator.addEventListener(this.#calculator.historyChangedEventName, event => {
            this.#historyFieldElement.textContent = event.detail.newHistory
        })
    }

    digitButtonClicked(digit) { this.#calculator.inputDigit(digit) }
    operatorButtonClicked(operator) { this.#calculator.inputOperator(operator) }
    clearButtonClicked() { this.#calculator.clearAll() }
    backspaceButtonClicked() { this.#calculator.clearOne() }
    changeSignButtonClicked() { this.#calculator.changeInputSign() }
    pointButtonClicked() { this.#calculator.inputPoint() }
    equalButtonClicked() { this.#calculator.inputEqual() }
    percentButtonClicked() { this.#calculator.inputPercent() }
    factorialButtonClicked() { this.#calculator.inputFactorial() }
    rootButtonClicked() { this.#calculator.inputRoot() }
}
