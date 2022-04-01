require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(cors())
app.use(bodyParser.json())
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const client = require('twilio')(accountSid, authToken);

const port = 3900;
let db;
let collection;

app.listen(3900, function () {
    console.log('listening on '+port)
});

app.get('/', (req, res) =>{
    res.send("hello there!")
})

MongoClient.connect('mongodb://localhost/2fa', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    db = client.db('2fa')
    collection= db.collection('users')
})

app.get('/users/:name', (req, res) => {
    db.collection('users').find({"name" : req.params.name}).toArray()
        .then(results => {
            res.json(results);
        }).catch(error => console.error(error));
})

app.post('/users', (req, res) => {
    console.log(req.body)
    let tk = req.body.user.token
    db.collection('users').find({"name" : req.body.user.name}).toArray()
        .then(results => {
            if (results[0].token == tk){
                res.json({auth: true});
            }else{
                res.json({auth: false});
            }
        }).catch(error => console.error(error));
})

app.put('/users/:name', (req, res) => {
    const randomstring = Math.random().toString(36).slice(-8);
    var m = "Su codigo de acceso es " + randomstring;
    console.log(m) 
    client.messages.create({
        to: process.env.NUMBER,
        from: '+17316666375',
        body: m
    }).then(message => console.log(message.sid));
    collection.findOneAndUpdate(
        { name: req.params.name },
        {
            $set: {
                token: randomstring
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Check in complete!') })
        .catch(error => console.error(error))
});

app.put('/cheked/:name', (req, res) => {
    collection.findOneAndUpdate(
        { name: req.params.name },
        {
            $unset: {
                token: ''
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Check in complete!') })
        .catch(error => console.error(error))
});