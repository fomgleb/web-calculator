Math.factorial = number => {
    if (number < 0 || !Number.isInteger(number)) return NaN

    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    return result;
}

Number.prototype.removeTrailingZeroes = function() {
    let str = this.toString();
    if (!str.includes('.')) return this
    let index = str.length - 1;
    while (str[index] === '0' && index > 0) {
        index--;
    }
    if (str[index - 1] === '.') {
        index--;
    }
    return Number(str.slice(0, index));
}
