
$(document).ready(onReady);

function onReady() {
    $('#addPlayerButton').on('click', addPlayer);
    $.ajax({
        type: 'GET',
        url: '/players'
    }).then(function (players) {
        for (let i = 0; i < players.length; i++) {
            $('#listOfPlayers').append(`
                <li>${players[i].name}</li>
            `)
        }
    })
   $('#addGameButton').on('click', addGame);
   addGame();
}//end onReady


function addPlayer() {
    let playerName = $('#playerNameInput').val();
    $('#playerNameInput').val('');
    $('#listOfPlayers').empty();
    $.ajax({
        type: 'POST',
        url: '/new',
        data: {
            name: playerName
        }
        
    }).then(function () {
        $.ajax({
            type: 'GET',
            url: '/players'
        }).then(function (players) {
            for (let i = 0; i < players.length; i++) {
            $('#listOfPlayers').append(`
                <li>${players[i].name}</li>
            `)    
            }
        })
    })
}//end addPlayer

function addGame() {
    console.log('add game has been clicked');
    let playerScore = $('#playerScoreInput').val();
    let opponentScore = $('#opponentScoreInput').val();
    let playerNameDropdown = $('#playerNameDropdown').val();
    let opponentNameDropdown = $('#opponentNameDropdown').val();
    console.log(playerScore);
    console.log(opponentScore);
    $('#playerScoreInput').val('');
    $('#opponentScoreInput').val('');
    $('#gameResults').empty();
    $.ajax({
        type: 'POST',
        url: '/new-game',
        data: {
            playerName: playerNameDropdown,
            playerScore: playerScore,
            opponentName: opponentNameDropdown,
            opponentScore: opponentScore,
            winner: 'Katie'
        }
    }).then(function (){
        $.ajax({
            type: 'GET',
            url: '/games'
        }).then(function (games) {
            for (let i = 0; i < games.length; i++) {
            $('#gameResults').append(`
                <tr>
                    <td>${games[i].playerName}</td>
                    <td>${games[i].playerScore}</td>
                    <td>${games[i].opponentName}</td>
                    <td>${games[i].opponentScore}</td>
                    <td>Katie</td>
            `)
                
            }
        })
    })
}