const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let playersList = require('./modules/players');

app.get('/players', function (req, res) {
    res.send(playersList);
});

app.post('/new', (req, res) => {
    req.body;
    playersList.push(req.body);
    res.sendStatus(201);
}); 


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});