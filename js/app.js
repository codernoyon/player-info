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
        console.log(url);
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
    console.log(players);
    if (players.player === null || playerList[0].strCutout === null) {
        playerContainer.textContent = "";
        const div = document.createElement("div");
        div.className = "col-md-6 mt-5";
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
                    </div>
                </div>
                `;
                playerContainer.appendChild(div);
                // console.log(player);
            }
        });
    }
    
}