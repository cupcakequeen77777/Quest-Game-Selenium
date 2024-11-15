const apiBaseUrl = "http://localhost:8080";

async function startGame() {
    await fetch(`${apiBaseUrl}/start`);
    await getGameState()
    location.pathname = "start-turn.html";
}

async function startTurn() {
    await getGameState()
    location.pathname = "play-turn.html";
}

async function getGameState() {
    try {
        let response = await fetch(`${apiBaseUrl}/get-game-state`);
        let result = await response.text();
        // Store the current player number in localStorage
        localStorage.setItem("game-state", result);

    } catch (error) {
        console.error("Error in getGameState():", error);
    }

}

if (location.pathname === "/") {
    // Add event listener to the Start Game button
    document.getElementById("start_turn_button").addEventListener("click", startGame);
}

async function draw_card() {
    document.getElementById("draw_card_button").style.display = '';
    try {
        const response = await fetch(`${apiBaseUrl}/draw_card`, {method: "POST"});
        const result = await response.text();
        console.log("draw_card Response:", result);
    } catch (error) {
        console.error("Error in start_turn:", error);
    }
}

function AccessGameState() {
    let game_state = localStorage.getItem("game-state");
    game_state = JSON.parse(game_state);
    game_state["players"] = JSON.parse(game_state["players"]);
    console.log(game_state)
    console.log(game_state["players"])

    return game_state
}


// This function will run when the start-turn page loads
window.onload = function () {
    let game_state = Object(AccessGameState())
    const currentPlayer = game_state["playerTurn"]
    const currentPlayerHand = game_state["players"][currentPlayer]["hand"]
    let shields = "P1: " + game_state["players"][0]["shields"] + ", P2: " + game_state["players"][1]["shields"]
        + ", P3: " + game_state["players"][2]["shields"] + ", P4: " + game_state["players"][3]["shields"]

    if (location.pathname === "/start-turn.html") {
        document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1) + " start your turn";
        document.getElementById("start_turn_button").addEventListener("click", startTurn);

    }
    if (location.pathname === "/play-turn.html") {
        document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
        document.getElementById("player-hand").innerText = currentPlayerHand
        document.getElementById("scores").innerText = shields
        document.getElementById("draw_card_button").addEventListener("click", draw_card);

    }
};


// {
//     "numberPlayers": 4,
//     "playerTurn": 0,
//     "adventureDeck": "Horse F20 F25 F25 F15 F10 F25 Sword Horse Sword ... ",
//     "eventDeck": "Queen’s favor Q3 Prosperity Q3 Q3 Q2 Prosperity Q4 Queen’s favor Q4 Q5 Q5 Q2 Q4 Plague Q2 Q3 ",
//     "players": [
//         {
//             "playerNumber": 1,
//             "shields": 0,
//             "hand": ""
//         },
//         {
//             "playerNumber": 2,
//             "shields": 0,
//             "hand": ""
//         },
//         {
//             "playerNumber": 3,
//             "shields": 0,
//             "hand": ""
//         },
//         {
//             "playerNumber": 4,
//             "shields": 0,
//             "hand": ""
//         }
//     ],
//     "adventureDiscardDeck": "",
//     "eventDiscardDeck": "",
//     "winners": []
// }

