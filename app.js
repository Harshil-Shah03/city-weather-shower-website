const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")



})

app.post("/",function(req,res){
    
   
const query = req.body.cityName;
const apikey = "d18c89b7010aac51c8a80b367af26e3c"
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);
    
    
    
 response.on("data", function(data){
    const weatherdata = JSON.parse(data);
    console.log(weatherdata);
    const temp = weatherdata.main.feels_like;
    console.log(temp);
    const desc = weatherdata.weather[0].description;
    console.log(desc);
    
    const icon = weatherdata.weather[0].icon;
    const imgURL = "https://openweathermap.org/img/wn/"+icon+"d@2x.png";
    
    
    
    res.write("<p>The weather is currently "+ desc+".</p>");
    res.write("<h1>The temperature in "+query+" is "+ temp + " degrees Celcius.</h1>");
    res.write("<img src="+imgURL+">");
    res.send();    
})

})
})




app.listen(3000,function(){
console.log("Server started at port 3000.");
})
