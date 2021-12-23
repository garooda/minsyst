var express = require("express");
var bodyParser = require("body-parser");


// const client = require("mongoose");
// var db = mongoose.connection;
// db.on('error', console.log.bind(console, "connection error"));
// db.once('open', function(callback){
//     console.log("connection succeeded")
// })

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'signup',
    password: '1234abcd',
    port: 5432,
});

client.connect();

var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post('/signup', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name":name,
        "email":email,
        "password":pass,
        "phone":phone
    }

    db.collection('details').insertOne(data, function(err, collection){
        if (err) throw err;
        console.log("Record inserted successfully");

    });

    return res.redirect("signup.html");


})

app.get('/', function(req, res){
res.set({
    'Access-control-Allow-Origin':'*'
});
return res.redirect('index.html');    
}).listen(3000)

console.log("server listening on port 3000")
