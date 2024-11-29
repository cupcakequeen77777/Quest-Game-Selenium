const apiBaseUrl = "http://localhost:8080";
let currentPlayer = 0;

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
    game_state["quest"] = JSON.parse(game_state["quest"]);
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
    document.getElementById("start_game_button").addEventListener("click", startGame);
}

async function declineQuest() {
    let response = await fetch(`${apiBaseUrl}/decline_quest`, {method: "POST"});
    await getGameState()
    let game_state = AccessGameState()
    if (parseInt(await response.text()) === -1) {
        document.getElementById("yes_button").hidden = true;
        document.getElementById("no_button").hidden = true;
        document.getElementById("card_drawn").innerText = "Start of new Turn"
        document.getElementById("draw_card_button").hidden = false;
        console.log("Start New Turn")
    } else {
        document.getElementById("card_drawn").innerText = "\nDo you want to participate in the quest with " + game_state["quest"]["numStages"] + " stages?"
        document.getElementById("yes_button").hidden = false;
        document.getElementById("no_button").hidden = false;
    }
    currentPlayer = game_state["currentPlayer"]
    updatePlayerHand(game_state, currentPlayer)
    console.log("Decline Quest")
}

async function acceptQuest() {
    // let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    // const nextPlayer = await response.text();
    // console.log("accept_quest Response:", nextPlayer);
    // let game_state = Object(AccessGameState())
    // updatePlayerHand(game_state, nextPlayer)
    document.getElementById("card_drawn").innerText = "acceptQuest"


    document.getElementById("yes_button").hidden = true;
    document.getElementById("no_button").hidden = true;


    let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    const nextPlayer = await response.text();
    console.log("accept_quest Response:", nextPlayer);
    await getGameState()
    let game_state = AccessGameState()
    updatePlayerHand(game_state, parseInt(nextPlayer))
    console.log("acceptQuest")
}

async function draw_event_card() {
    // document.getElementById("draw_card_button").hidden = true
    // document.getElementById("card_drawn").innerText === "Changed"
    document.getElementById("draw_card_button").hidden = true;

    try {
        let response = await fetch(`${apiBaseUrl}/draw_event_card`, {method: "POST"});
        let result = await response.text();
        console.log("draw_event_card Response:", result);
        await getGameState()
        let game_state = Object(AccessGameState())
        console.log("Here")
        console.log(game_state)
        document.getElementById("card_drawn").innerText = "You drew: " + game_state["eventCard"]
        switch (game_state["eventCard"]) {
            case "Plague":
                document.getElementById("card_drawn").innerText += "\nYou lose 2 shields"
                response = await fetch(`${apiBaseUrl}/play_plague_card`, {method: "POST"});
                result = await response.text();
                console.log("play_plague_card Response:", result);
                updateShields(game_state)
                break;
            case "Queen’s favor":
                document.getElementById("card_drawn").innerText += "\nDraw 2 adventure cards"
                let cards = queensFavor();
                document.getElementById("card_drawn").innerText += cards
                break;
            case "Prosperity":
                document.getElementById("card_drawn").innerText += "\nEveryone draws 2 cards"
                response = fetch(`${apiBaseUrl}/play_prosperity_card`, {method: "POST"});
                result = response.text();
                console.log("Prosperity Response:", result);
                break;
            default:
                document.getElementById("card_drawn").innerText += "\nDo you want to participate in the quest?"
                document.getElementById("yes_button").hidden = false;
                document.getElementById("no_button").hidden = false;
                break;
        }
        game_state = Object(AccessGameState())
        updateHand(game_state)

    } catch (error) {
        console.error("Error in draw_event_card:", error);
    }

}

function queensFavor() {
    let card1 = drawAdventureCard()  // TODO make it it's own function so you can change to the next player
    let card2 = drawAdventureCard()
    console.log("Queen’s favor: ", card1, " ", card2);
    return card1 + " " + card2
}

function drawAdventureCard() {
    let card = ""
    try {
        let response = fetch(`${apiBaseUrl}/draw_adventure_card`, {method: "POST"});

        card = response.text();
        console.log("draw_adventure_card Response:", card);

    } catch (error) {
        console.error("Error in draw_adventure_card:", error);
    }
    return card
}

function updateShields(game_state) {
    document.getElementById("player1-score").innerText = game_state["players"][0]["shields"]
    document.getElementById("player2-score").innerText = game_state["players"][1]["shields"]
    document.getElementById("player3-score").innerText = game_state["players"][2]["shields"]
    document.getElementById("player4-score").innerText = game_state["players"][3]["shields"]

}

function updateHand(game_state) {
    const currentPlayer = game_state["playerTurn"]
    const currentPlayerHand = game_state["players"][currentPlayer]["hand"]
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
    document.getElementById("player-hand").innerText = currentPlayerHand
}

function updatePlayerHand(game_state, currentPlayer) {
    const currentPlayerHand = game_state["players"][currentPlayer]["hand"]
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
    document.getElementById("player-hand").innerText = currentPlayerHand
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
        document.getElementById("no_button").addEventListener("click", declineQuest);
        document.getElementById("yes_button").addEventListener("click", acceptQuest);
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

