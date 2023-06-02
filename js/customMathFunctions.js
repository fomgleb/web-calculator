Math.factorial = number => {
    if (number < 0 || !Number.isInteger(number)) return NaN

    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    return result;
}
