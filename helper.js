const { CONVERSION_CONSTANT, ERRORS } = require('./constants')

/**
 * Function to convert celsius to fahrenheit
 * @param {Number} temp number denoting temperature to convert to fahrenheit
 * @returns a 1 precision number of temp converted to fahrenheit
 */
function convertCelciusToFahrenheit(temp){
    return precision(temp * 9 / 5 + CONVERSION_CONSTANT, 1)
}

/**
 * Function to convert fahrenheit to celsius
 * @param {Number} temp number denoting temperature to convert to celsius
 * @returns a 1 precision number of temp converted to celsius
 */
function convertFahrenheitToCelcius(temp){
    return precision((temp - CONVERSION_CONSTANT) * 5 / 9, 1)
}

/**
 * Function to set precision for a number
 * @param {Number} number the number to set precision
 * @param {Number} precision the precision to set for number
 * @returns number converted to the selected precision
 */
function precision(number, precision){
    return Number(number.toFixed(precision))
}

/**
 * Function to check temp for erroneous data
 * @param {any} temp 
 * @returns a string containing error message or empty return
 */
function checkError(temp){
    if(isNaN(temp)){
        return ERRORS.TEMP_DATA_TYPE
    }
    return 
}

module.exports = { convertCelciusToFahrenheit, convertFahrenheitToCelcius, checkError }