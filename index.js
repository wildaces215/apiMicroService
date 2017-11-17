//Declared packages required 
var express=require('express')
var app=express();
var path=require('path');
var fs =require('fs');
var moment=require('moment');
//Gets directory for views
app.use(express.static(__dirname + '/views'));


//Sets the port to be used for production
app.set('port', (process.env.PORT || 8080));
app.get("/",function(req,res){
   res.sendFile('index.html');
})
//gets the input user enters into the url
app.get('/:input',function(req,res){
 var userInputUrl;
var unixOutput=null;
var naturalOutput=null;
 //Checks if a unix is entered in url.
if(req.params.input>=0){
  //Keep unix
  unixOutput=req.params.input;
  //convert unix to natural
  naturalOutput=moment.unix(req.params.input).format("MMMM D, YYYY");
}
else if(isNaN(req.params.input)&& moment(req.params.input, "MMMM D, YYYY").isValid()){
  //use moment js to modiy url the user put in 
   userInputUrl=moment(req.params.input, "MMMM D, YYYY").format("X");
  unixOutput=userInputUrl;
  naturalOutput=moment.unix(userInputUrl).format("MMMM D, YYYY");
}
//returns json object
res.json({
  unix:unixOutput,
  natural:naturalOutput
});


})
//Launch app at specifed port
app.listen(app.get('port'),function(req,res){
  console.log("App running on"+app.get('port'));
})
