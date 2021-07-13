// jshint esversion:6

const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");

const app = new express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res)
{
        const firstname = req.body.fname;
        const lastname = req.body.lname;
        const email = req.body.mail;

      var data =
      {
        members:
        [
          {
          email_address: email,
          status: "subscribed",
          merge_field: {
              FNAME: firstname,
              LNAME: lastname
          }
      }
        ]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us6.api.mailchimp.com/3.0/lists/25f5d765e7";

      const option =
      {
        method : "POST",
        auth : "Manas:4f7673633ae762beedb5666c0b4d2636-us6"
      };

      const request = https.request(url,option,function(response)
      {
        if(response.statusCode === 200)
        {
          res.sendFile(__dirname + "/success.html");

        }
        else
        {
          res.sendFile(__dirname + "/failure.html");

        }

            response.on("data",function(data)
          {
              console.log(JSON.parse(data));

          });

      });

      request.write(jsonData);
      request.end();
});

app.post("/failure", function(req,res)
{
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function()
{
    console.log("Server started at port 3000");
});


// API:- 4f7673633ae762beedb5666c0b4d2636-us6
// List Id:- 25f5d765e7
