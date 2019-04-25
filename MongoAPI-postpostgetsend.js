var Request = require("request-promise");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoURL = "https://http://mongoserver-tenacious-sputum.eu-gb.mybluemix.net/api/Images"; // restApiRoot (/api), localhost and port from config.json (talentimage/Mongodb/ServerMongoFoto/server/)
var serverPort = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function MaakderWatMooisVan(ObjectMongoCount, Class, error) {
    if (error) {
        return console.dir(error);
    }
    var jsondata = JSON.parse(ObjectMongoCount);
    newBody = jsondata.filter(function (o) {
        return (o.class === Class)
    })
    Response.Count = newBody.length;
}

async function Controller(Obj, Class, res) {
    let Inputresult = await Request.post({
        "headers": { "content-type": "application/json" },
        "url": mongoURL,
        "body": JSON.stringify(Obj)
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        Response.Image = JSON.parse(body);
    })

    let CountObject = await Request.get(mongoURL);
    await MaakderWatMooisVan(CountObject, Class);
    await res.send(JSON.stringify(Response));
}

//incoming request from processAPI at /post endpoint:
app.post('/post', function (req, res) {
    var mongo = req.body;
    var mongoclass = req.body.class
    Response = new Object;
    Response.Image = Object;
    Response.Count = Number;
    Response = Controller(mongo, mongoclass, res);
});

app.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
});
