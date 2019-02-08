const express = require('express');
let bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

let playersList = require('./modules/players');
let gamesList = require('./modules/games');

app.get('/players', function (req, res) {
    res.send(playersList);
});

app.get('/games', function (req, res) {
    res.send(gamesList)
});

app.post('/new', (req, res) => {
    req.body;
    playersList.push(req.body);
    res.sendStatus(201);
}); 

app.post('/new-game', (req, res) => {
    req.body;
    gamesList.push(req.body);
    if (req.body.playerScore > req.body.opponentScore) {
        req.body.winner = req.body.playerName;
    }
    else if (req.body.opponentScore > req.body.playerScore) {
        req.body.winner = req.body.opponentName;
    }
    else {
        req.body.winner = 'Tie';
    }
    res.sendStatus(201);
}); 

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});