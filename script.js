// error catch
const error = document.getElementById('error')
/* Player info after Search Button Clicked */

const searchInfo = () => {
    fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${playerName.value}`)
        .then(res => res.json())
        .then(data => displayPlayer(data.player[0]))
    playerName.value = '';
    document.getElementById('players-container').innerHTML = '';
    document.getElementById('players-details').innerHTML = '';
    document.getElementById('player-about').innerHTML = '';

    if (playerName.value === '') {
        error.innerText = ''
    }
}
// spinner

let spinnerWrapper = document.querySelector('.spinner-wrapper');
window.addEventListener('load', function () {
    spinnerWrapper.parentElement.removeChild(spinnerWrapper);
})

//display player on search button clicked
const playerName = document.getElementById('player-input');

const displayPlayer = player => {
    console.log(player)
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = '';
    const playerDiv = document.createElement('div')
    playerDiv.innerHTML = `
        <img width = 400px; height = 400px; class = "img-fluid mx-auto d-block rounded-3" src = "${player.strThumb}">
        <div class = "col text-center">
        <h2 class = "my-3"> Name: <span class = "text-primary"> ${player.strPlayer} </span> </h2>
        <button onclick="playerDetails(${player.idPlayer})" type="button" class="btn btn-outline-primary">Details</button>
        </div>
    `
    playersContainer.appendChild(playerDiv)
}

/* player details after Details Button clicked */

const playerDetails = idPlayer => {

    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${idPlayer}`)
        .then(res => res.json())
        .then(data => displayPlayerDetails(data.players[0]))

    document.getElementById('players-details').innerHTML = '';
}

const displayPlayerDetails = player => {
    const playersDetailsContainer = document.getElementById('players-details');

    const playerDetailsDiv = document.createElement('div');
    playerDetailsDiv.classList.add('shadow')
    playerDetailsDiv.innerHTML = `
        <h5 style = text-decoration: underline; class = "text-center text-primary mb-3"> Highlight Info <h5>
        <h5> Nationality: ${player.strNationality} </h5>
        <h5> Birth Place: ${player.strBirthLocation}</h5>
        <h5> Date of Birth: ${player.dateBorn}</h5>
        <h5> Sport: ${player.strSport}</h5>
        <h5> Current Club: ${player.strTeam}</h5>
        <h5> Position: ${player.strPosition}</h5>
        <h5> Signing: ${player.strSigning}</h5>
        <h5> Weight: ${player.strWeight}</h5>
        <h5> Height: ${player.strHeight}</h5>
        <p class = "d-flex justify-content-around mt-4">
        <a target="_blank" href = "https://${player.strFacebook}"><i class="fab fa-facebook fa-2x"></i></a>

        <a target="_blank" href = "https://${player.strInstagram}"><i class="fab fa-instagram fa-2x"></i> </a> 

        <a target="_blank" href = "https://${player.strTwitter}"><i class="fab fa-twitter fa-2x"></i> </a> 
        </p>
        <div class="col text-center">
        <button onclick="playerAbout(${player.idPlayer})" type="button" class="btn btn-outline-primary">About</button>
        </div
        
    `
    // document.getElementById('players-details').innerHTML = '';
    playersDetailsContainer.appendChild(playerDetailsDiv)

}

// player about

const playerAbout = idPlayer => {

    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${idPlayer}`)
        .then(res => res.json())
        .then(data => displayPlayerAbout(data.players[0]))

    document.getElementById('player-about').innerHTML = '';
}

const displayPlayerAbout = player => {
    const playerAboutContainer = document.getElementById('player-about');
    const playerAboutPara = document.createElement('p');
    playerAboutPara.innerHTML = `
        <h1> About <span class = "text-primary fw-bold"> ${player.strPlayer} </span></h1>
        <p class= "text-justify"> ${player.strDescriptionEN} </p>
`
    playerAboutContainer.appendChild(playerAboutPara)
}