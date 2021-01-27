const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    const firstName = req.body.fname
    const lastName = req.body.lname
    const email = req.body.email
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/28d25b1942";
    const options = {
        method: "POST",
        auth: "oden3:95f7a53423375e1bb9eaff78081e82c5-us7"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/suc.html");
        }
        else{
            res.sendFile(__dirname+"/prob.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT ||3000,function(){
    console.log("Server started on port 3000");
});


// 95f7a53423375e1bb9eaff78081e82c5-us7
// 28d25b1942