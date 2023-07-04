const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.htm')

  app.post('/', function (req, res) {
    console.log(req.body.cityName)

    const query = req.body.cityName
    const apiKey = 'your key'
    const units = 'metric'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`
    https.get(url, function (response) {
      console.log(response.statusCode)

      response.on('data', (data) => {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const img = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'

        res.write(
          `<h1>The weather temp in  ${query} is ${temp} degrees celcius<h1>`
        )
        res.write(`<h2><br>the weather is currenlty ${description}<h2>`)
        res.write(`<img src = ${img} >`)
        res.send()
      })
    })
  })
})

app.listen('3000', () => {
  console.log('server is running on port : 3000')
})
