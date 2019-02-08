
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
   addGameTable();
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
    $('#gameResults').empty();
    let playerScore = $('#playerScoreInput').val();
    let opponentScore = $('#opponentScoreInput').val();
    let playerNameDropdown = $('#playerNameDropdown').val();
    let opponentNameDropdown = $('#opponentNameDropdown').val();
    $('#playerScoreInput').val('');
    $('#opponentScoreInput').val('');
    $.ajax({
        type: 'POST',
        url: '/new-game',
        data: {
            playerName: playerNameDropdown,
            playerScore: playerScore,
            opponentName: opponentNameDropdown,
            opponentScore: opponentScore,
        }
    }).then(addGameTable()
    )
}
function addGameTable(){
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
                    <td>${games[i].winner}</td>
            `)

        }
    })
}