const suma = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Frist parameter must be a number')
    }
    return a + b
}

module.exports = suma