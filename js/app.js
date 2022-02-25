const loadData = () => {
    const inputField = document.getElementById("input-field");
    const writeSomthingContainer = document.getElementById("write-something-container");
    const inputValue = inputField.value;
    if (inputValue === "") {
        writeSomthingContainer.textContent = "";
        const div = document.createElement("div");
        div.className = "text-danger text-center pe-4";
        div.innerHTML = ` <h2>Please, write here player name </h2>
        `;
        writeSomthingContainer.appendChild(div);
        inputField.style.outline = "2px solid red";
        document.getElementById("players-container").textContent = "";
    } else {
        inputField.value = "";
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data));
        inputField.style.outline = "none";
        writeSomthingContainer.textContent = "";
    }
};



const displayData = players => {
    const playerList = players.player;
    const playerContainer = document.getElementById("players-container");
    if (players.player === null || playerList[0].strCutout === null) {
        playerContainer.textContent = "";
        const div = document.createElement("div");
        div.className = "col-md-12 mt-5";
        div.innerHTML = `<h1 class="text-center text-warning">No Player found!!</h1>`;
        playerContainer.appendChild(div);
    } else {
        playerContainer.textContent = "";
        playerList.forEach(player => {
            if (player.strCutout !== null) {
                const div = document.createElement("div");
                div.className = "col-md-3"; 
                div.innerHTML = `
                <div class="single-player">
                    <div class="player-photo">
                        <img src="${player.strCutout}" alt="" class="w-100">
                    </div>
                    <div class="player-detail mt-3">
                        <h4 class="m-0">${player.strPlayer}</h4>
                        <small>${player.strSport}</small>
                        <p class="mb-3">${player.strDescriptionEN.slice(0, 50)}</p>
                        <button onclick="playerDetails(${player.idPlayer})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">More Details</button>
                    </div>
                </div>
                `;
                playerContainer.appendChild(div);
                // console.log(player);
            }
        });
    }
    
};


const playerDetails = playerId => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayerDetails(data));
};


const displayPlayerDetails = fullDeitals => {
    const player = fullDeitals.players[0];
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
    <button type="button" class="btn-close position-absolute end-0 top-0 p-3" data-bs-dismiss="modal" aria-label="Close"></button>
    <div class="item row align-items-start">
        <div class="photo col-md-4 mb-3 mb-md-0">
            <img src="${player.strCutout}" alt="" class="w-100">
        </div>
        <div class="details col-md-7">
            <h2 class="m-0">${player.strPlayer}</h2>
            <small>${player.strSport}</small>
            <p class="text-muted my-3">${player.strDescriptionEN}</p>
            <div class="d-block">
                <p class="mb-2">Country: ${player.strNationality}</p>
                <p class="mb-2">Weight: ${player.strWeight}</p>
                <p class="mb-2">Born: ${player.dateBorn}l</p>
            </div>
        </div>
    </div>
    `;
};

