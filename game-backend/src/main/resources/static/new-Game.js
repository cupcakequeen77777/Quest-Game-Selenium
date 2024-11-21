const apiBaseUrl = "http://localhost:8080";

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

function AccessGameState() {
    let game_state = localStorage.getItem("game-state");
    game_state = JSON.parse(game_state);
    game_state["players"] = JSON.parse(game_state["players"]);
    return game_state
}

async function startGame() {
    try {
        const response = await fetch(`${apiBaseUrl}/start`, {method: "POST"});
        const result = await response.text();
        console.log("start Response:", result);

    } catch (error) {
        console.error("Error in startGame:", error);
    }
    await getGameState()
    location.pathname = "start-turn.html";
}

async function startTurn() {
    await getGameState()
    location.pathname = "play-turn.html";
}


if (location.pathname === "/") {
    // Add event listener to the Start Game button
    document.getElementById("start_turn_button").addEventListener("click", startGame);
}

// QUESTION: can we use REACT?
async function draw_event_card() {
    // document.getElementById("draw_card_button").hidden = true
    // document.getElementById("card_drawn").innerText === "Changed"
    document.getElementById("draw_card_button").style.display = "none";

    try {
        const response = await fetch(`${apiBaseUrl}/draw_event_card`, {method: "POST"});
        const result = await response.text();
        console.log("draw_event_card Response:", result);
        await getGameState()
        let game_state = Object(AccessGameState())
        console.log("Here")
        console.log(game_state)
        document.getElementById("card_drawn").innerText = game_state["eventCard"]

    } catch (error) {
        console.error("Error in draw_event_card:", error);
    }

}

function updateShields(game_state) {
    document.getElementById("player1-score").innerText = game_state["players"][0]["shields"]
    document.getElementById("player2-score").innerText = game_state["players"][1]["shields"]
    document.getElementById("player3-score").innerText = game_state["players"][2]["shields"]
    document.getElementById("player4-score").innerText = game_state["players"][3]["shields"]

}


// This function will run when the start-turn page loads
window.onload = function () {
    let game_state = Object(AccessGameState())
    const currentPlayer = game_state["playerTurn"]
    const currentPlayerHand = game_state["players"][currentPlayer]["hand"]


    if (location.pathname === "/start-turn.html") {
        document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1) + " start your turn";
        document.getElementById("start_turn_button").addEventListener("click", startTurn);

    }
    if (location.pathname === "/play-turn.html") {
        document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
        document.getElementById("player-hand").innerText = currentPlayerHand
        document.getElementById("draw_card_button").addEventListener("click", draw_event_card);
        updateShields(game_state)
        console.log(game_state["eventCard"])

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

