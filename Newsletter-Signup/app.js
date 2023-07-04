const express = require('express')
const app = express()
const https = require('https')
const request = require('request')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.post('/', function (req, res) {
  var firstName = req.body.fname
  var lastName = req.body.lname
  var email = req.body.email

  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  }

  const jsonData = JSON.stringify(data)

  const url = 'https://us21.api.mailchimp.com/3.0/lists/2e4d21b495'

  const options = {
    method: 'POST',
    auth: 'Daniel:74e313e41a84d3758c80cdb0cca80e5d-us21',
  }

  const request = https.request(url, options, function (response) {


    if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.htm");
    }
    else{
        res.sendFile(__dirname + "/failure.htm");
    }
    response.on('data', function (data) {
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData);
  request.end();

  app.post("/failure", function(req, res){
    res.redirect("/");
  })



})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.htm')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('The server is running on port : 3000')
})

// 74e313e41a84d3758c80cdb0cca80e5d-us21
//2e4d21b495
