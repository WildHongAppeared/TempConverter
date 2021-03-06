const { TEMPERATURE_TYPE, ERRORS } = require('../constants')
const helper = require('../helper')

/**
 * Express controller function to convert temperature from celsius to fahrenheit or vice versa
 * @param {Express Request} req 
 * @param {Express Response} res Express response
 * @returns Express response containing either converted temperature message or error message
 */
function convertTemperature(req, res){
    const { convertTo } = req.params
    const { temperature } = req.body
    if(helper.checkError(temperature)){
        return res.status(400).send(helper.checkError(temperature))
    }

    switch(convertTo.toLowerCase()){
        case TEMPERATURE_TYPE.CELSIUS :
            const celcius = helper.convertFahrenheitToCelcius(temperature)
            res.send({ 
                message: temperature + '\xB0F is ' + celcius + '\xB0C.' ,
                inputValue: Number(temperature),
                inputType: TEMPERATURE_TYPE.FAHRENHEIT,
                outputValue: celcius,
                outputType: TEMPERATURE_TYPE.CELSIUS
            })
            break;
        case TEMPERATURE_TYPE.FAHRENHEIT :
            const fahrenheit = helper.convertCelciusToFahrenheit(req.body.temperature)
            res.send({
                message: req.body.temperature + '\xB0C is ' + fahrenheit + '\xB0F.',
                inputValue: Number(temperature),
                inputType: TEMPERATURE_TYPE.CELSIUS,
                outputValue: fahrenheit,
                outputType: TEMPERATURE_TYPE.FAHRENHEIT
            })
            break;
        default:
            res.status(400).send(ERRORS.TEMP_TYPE)
            break;
    }
    return false;
}

module.exports = { convertTemperature }