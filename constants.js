const TEMPERATURE_TYPE = {
    CELSIUS: 'celsius',
    FAHRENHEIT: 'fahrenheit'
}
const CONVERSION_CONSTANT = 32
const PORT = 3000
const ERRORS = {
    TEMP_TYPE: 'Only accepts "fahrenheit" or "celcius" as accepted value',
    TEMP_DATA_TYPE: '"temperature" is not a valid number'
}
module.exports = { TEMPERATURE_TYPE, CONVERSION_CONSTANT, PORT, ERRORS }