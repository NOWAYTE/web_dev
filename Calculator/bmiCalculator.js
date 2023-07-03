const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:  true}));

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.htm");
});

app.post("/bmicalculator", function(req, res){
    var height  = Number(req.body.num_1);
    var weight = Number(req.body.num_2);

    var result = weight / (height * height); 

    res.send(`Your BMI is : ${result}`);
});
app.listen("3000", () => {
    console.log("Server started on port : 3000");
});