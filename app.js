var express=require('express');
var app=express();
var fetch=require('node-fetch');
var request=require('request');
var bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("Home");
})

app.get("/Handle",(req,res)=>{
    res.render("ProfileForm");
})

var userInfo,contestInfo,statusInfo;
app.post("/Profile",(req,res)=>{
    var handle=req.body.handle;
    const userInfoUrl = "https://codeforces.com/api/user.info?handles=" + handle;
    const contestInfoUrl="https://codeforces.com/api/user.rating?handle="+handle;
    const statusUrl="https://codeforces.com/api/user.status?handle="+handle;
    
    
    async function getData(){
        const response1=await fetch(userInfoUrl).then(res=>res.json()).then(data1=>userInfo=data1);
        const response2=await fetch(contestInfoUrl).then(res=>res.json()).then(data2=>contestInfo=data2);
        const response3=await fetch(statusUrl).then(res=>res.json()).then(data3=>statusInfo=data3);
        // console.log(statusInfo);
        console.log(contestInfo.result.length);
        res.render("Profile",{userInfo:userInfo,contestInfo:contestInfo,statusInfo:statusInfo}); 
    }
    getData();
})

app.get("/Compare",(req,res)=>{
    res.render("CompareForm")
})


var userInfo1,contestInfo1,statusInfo1;
var userInfo2,contestInfo2,statusInfo2;
app.post("/Compare",(req,res)=>{

    var handle1=req.body.handle1;
    var handle2=req.body.handle2;

    const userInfoUrl1 = "https://codeforces.com/api/user.info?handles=" + handle1;
    const contestInfoUrl1="https://codeforces.com/api/user.rating?handle="+handle1;
    const statusUrl1="https://codeforces.com/api/user.status?handle="+handle1;

    const userInfoUrl2 = "https://codeforces.com/api/user.info?handles=" + handle2;
    const contestInfoUrl2="https://codeforces.com/api/user.rating?handle="+handle2;
    const statusUrl2="https://codeforces.com/api/user.status?handle="+handle2;

    async function getData(){
        const response1=await fetch(userInfoUrl1).then(res=>res.json()).then(data1=>userInfo1=data1);
        const response2=await fetch(contestInfoUrl1).then(res=>res.json()).then(data2=>contestInfo1=data2);
        const response3=await fetch(statusUrl1).then(res=>res.json()).then(data3=>statusInfo1=data3);

        const response4=await fetch(userInfoUrl2).then(res=>res.json()).then(data1=>userInfo2=data1);
        const response5=await fetch(contestInfoUrl2).then(res=>res.json()).then(data2=>contestInfo2=data2);
        const response6=await fetch(statusUrl2).then(res=>res.json()).then(data3=>statusInfo2=data3);

        console.log(contestInfo1.result.length);
        console.log(contestInfo2.result.length);

        res.render("Compare",{userInfo1:userInfo1,contestInfo1:contestInfo1,statusInfo1:statusInfo1,   userInfo2:userInfo2,contestInfo2:contestInfo2,statusInfo2:statusInfo2}); 
    }
    getData();
})

app.get("*",(req,res)=>{
    res.send("Sorry!!! This page doesn't exist yet");
});

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});