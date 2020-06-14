const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
require('dotenv').config()

const apiEndpoint = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?outputType=JSON";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('frontend/dist'));

// serve frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/frontend/dist/index.html");
});

// serve API requests
app.get('/api/:id', (req, res) => {
    fetch(`${apiEndpoint}&key=${process.env.API_KEY}&stpid=${req.params.id}`)
        .then(x => x.json())
        .then(data => res.send(data));

});

app.listen(port, () => console.log(`listening on port ${port}`));