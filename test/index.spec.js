const request = require('supertest')
const express = require('express')
const { temperatureRouter } = require('../routes')

const app = new express();
app.use(express.json())
app.use('/temperature', temperatureRouter);

describe('Temperature Converter Routes', function () {

    test('should convert celsius to fahrenheit', async () => {
      const res = await request(app).post('/temperature/convert/celsius')
      .send({temperature: 100})
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        message: '100°F is 37.8°C.',
        inputValue: 100,
        inputType: 'fahrenheit',
        outputValue: 37.8,
        outputType: 'celsius'
      })
    });

    test('should convert fahrenheit to celsius', async () => {
      const res = await request(app).post('/temperature/convert/fahrenheit')
      .send({temperature: 37.8})
      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        message: '37.8°C is 100°F.',
        inputValue: 37.8,
        inputType: 'celsius',
        outputValue: 100,
        outputType: 'fahrenheit'
      })
    });
      
    test('should throw error if temperature is not a valid number', async () => {
      const res = await request(app).post('/temperature/convert/fahrenheit')
      .send({temperature: 'bruh'})
      expect(res.status).toBe(400)
      expect(res.text).toEqual('"temperature" is not a valid number')
    });

    test('should throw error if received type is not fahrenheit or celcius', async () => {
      const res = await request(app).post('/temperature/convert/bruh')
      .send({temperature: '40'})
      expect(res.status).toBe(400)
      expect(res.text).toEqual('Only accepts "fahrenheit" or "celcius" as accepted value')
    });
  
  });