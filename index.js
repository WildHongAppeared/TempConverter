const express = require('express')
const app = express()
const helmet = require("helmet");
const { PORT } = require('./constants')
const { temperatureRouter } = require('./routes')
app.use(express.json())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/temperature', temperatureRouter)

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`)
})