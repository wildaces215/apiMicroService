var express=require('express')
var app=express();
var path=require('path');
var fs =require('fs');
var moment=require('moment');

app.use(express.static(__dirname + '/views'));


app.get("/",function(req,res){
   res.sendFile('index.html');
})

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
app.listen(3000,function(req,res){
  console.log("App running on 3000!");
})
