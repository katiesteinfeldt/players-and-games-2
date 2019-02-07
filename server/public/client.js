
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
   
}//end onReady


function addPlayer() {
    let playerName = $('#playerNameInput').val();
    $('#playerNameInput').val('');
    $.ajax({
        type: 'POST',
        url: '/new',
        data: {
            name: playerName
        }
        
    }).then(function () {
        $('#listOfPlayers').empty();
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