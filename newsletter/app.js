const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static("public"));

app.get("/" , function(req , res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req , res){

  const firstname = req.body.fName;
  const lastname = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const jsondata = JASON.stringify(data);

  const url ="https://us18.api.mailchimp.com/3.0/lists/53aee2a71f";

  const option =
  {
    method: "POST",
    auth: "imanurag:053b31c6241b4596adf956899cfa2778-us18"
  };
const request =  https.request(url, option , function(responce){

if(responce.statusCode === 200 )
{
  res.sendFile(__dirname + "/success.html");
}
else
{
  res.sendFile(__dirname + "/failure.html");
}

    responce.on("data" , function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();

})



app.listen( 3000 ,function(){
  console.log("port is running on 3000");
} )
