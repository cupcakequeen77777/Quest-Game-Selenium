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

// TODO:
async function declineQuest() {
    await fetch(`${apiBaseUrl}/decline_quest`, {method: "POST"});
    await nextPlayer()
    await getGameState()
    let game_state = AccessGameState()

    currentPlayer = game_state["currentPlayer"]
    let playerTurn = game_state["playerTurn"]

    console.log("playerTurn: " + playerTurn)
    console.log("currentPlayer: " + currentPlayer)


    if (currentPlayer === playerTurn) {
        document.getElementById("yes_button").hidden = true;
        document.getElementById("no_button").hidden = true;
        document.getElementById("draw_card_button").hidden = true;
        document.getElementById("end_turn_button").hidden = false;
        document.getElementById("card_drawn").innerText = ""
        console.log("Start New Turn")
    } else {
        console.log("Decline Quest, Next player")
        await getGameState()
        let game_state = AccessGameState()
        document.getElementById("card_drawn").innerText = "\nDo you want to sponsor the quest with " + game_state["quest"]["numStages"] + " stages?"
        document.getElementById("yes_button").hidden = false;
        document.getElementById("no_button").hidden = false;
        currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)
    }

}

// TODO:
async function acceptQuest() {
    // FIXME: need to implement accept_quest
    // let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    // const nextPlayer = await response.text();
    // console.log("accept_quest Response:", nextPlayer);
    // let game_state = Object(AccessGameState())
    // updatePlayerHand(game_state, nextPlayer)
    document.getElementById("card_drawn").innerText = "acceptQuest"
    document.getElementById("yes_button").hidden = true;
    document.getElementById("no_button").hidden = true;


    // let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    // const nextPlayer = await response.text();
    // console.log("accept_quest Response:", nextPlayer);
    // await getGameState()
    // let game_state = AccessGameState()
    // updatePlayerHand(game_state, parseInt(nextPlayer))
    console.log("acceptQuest")
    document.getElementById("end_turn_button").hidden = false;

}


async function declineSponsorship() {
    await fetch(`${apiBaseUrl}/decline_sponsorship`, {method: "POST"});
    await nextPlayer()
    await getGameState()
    let game_state = AccessGameState()

    currentPlayer = game_state["currentPlayer"]
    let playerTurn = game_state["playerTurn"]

    console.log("playerTurn: " + playerTurn)
    console.log("currentPlayer: " + currentPlayer)


    if (currentPlayer === playerTurn) {
        document.getElementById("yes_button").hidden = true;
        document.getElementById("no_button").hidden = true;
        document.getElementById("draw_card_button").hidden = true;
        document.getElementById("end_turn_button").hidden = false;
        document.getElementById("card_drawn").innerText = ""
        console.log("Start New Turn")
    } else {
        console.log("Decline Quest, Next player")
        await getGameState()
        let game_state = AccessGameState()
        document.getElementById("card_drawn").innerText = "\nDo you want to sponsor the quest with " + game_state["quest"]["numStages"] + " stages?"
        document.getElementById("yes_button").hidden = false;
        document.getElementById("no_button").hidden = false;
        currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)
    }

}

async function sponsorQuest() {
    // FIXME: need to implement accept_quest
    // let response = await fetch(`${apiBaseUrl}/sponsor_quest`, {method: "POST"});
    // const nextPlayer = await response.text();
    // console.log("accept_quest Response:", nextPlayer);
    // let game_state = Object(AccessGameState())
    // updatePlayerHand(game_state, nextPlayer)
    document.getElementById("card_drawn").innerText = "acceptQuest"


    // let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    // const nextPlayer = await response.text();
    // console.log("accept_quest Response:", nextPlayer);
    // await getGameState()
    // let game_state = AccessGameState()
    // updatePlayerHand(game_state, parseInt(nextPlayer))
    console.log("acceptQuest")
    document.getElementById("end_turn_button").hidden = false;


    // TODO: Ask player if they want to participate in the quest, move to function after player submits all cards they want to use.
    // document.getElementById("no_button").addEventListener("click", declineQuest);
    // document.getElementById("yes_button").addEventListener("click", acceptQuest);
    // document.getElementById("yes_button").hidden = false;
    // document.getElementById("no_button").hidden = false;

}

async function drawEventCard() {
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
        currentPlayer = game_state["currentPlayer"]
        switch (game_state["eventCard"]) {
            case "Plague":
                await plague()
                document.getElementById("card_drawn").innerText += "\nYou lose 2 shields"
                response = await fetch(`${apiBaseUrl}/play_plague_card`, {method: "POST"});
                result = await response.text();
                console.log("play_plague_card Response:", result);
                updateShields(game_state)
                document.getElementById("end_turn_button").hidden = false;
                break;
            case "Queen’s favor": // FIXME: Need to discard cards
                document.getElementById("card_drawn").innerText += "\nDraw 2 adventure cards: "
                let cards = await queensFavor();
                document.getElementById("card_drawn").innerText += " " + cards
                await getGameState()
                game_state = Object(AccessGameState())
                updateHand(game_state)
                await checkNumberCards()
                break;
            case "Prosperity": // FIXME: everyone does a queen's favour, then discards extra cards
                document.getElementById("card_drawn").innerText += "\nEveryone draws 2 cards"
                // response = fetch(`${apiBaseUrl}/play_prosperity_card`, {method: "POST"});
                // result = response.text();
                // console.log("Prosperity Response:", result);
                // updateHand(game_state)

                document.getElementById("end_turn_button").hidden = false;
                break;
            default:
                document.getElementById("card_drawn").innerText += "\nDo you want to participate in the quest?"
                document.getElementById("no_button").addEventListener("click", declineSponsorship);
                document.getElementById("yes_button").addEventListener("click", sponsorQuest);
                document.getElementById("yes_button").hidden = false;
                document.getElementById("no_button").hidden = false;
                break;
        }

        console.log(game_state["players"])

    } catch (error) {
        console.error("Error in draw_event_card:", error);
    }

}

async function startNewTurn() {
    await getGameState()
    let game_state = Object(AccessGameState())
    document.getElementById("card_drawn").innerText = ""
    document.getElementById("start_turn_button").hidden = true;
    document.getElementById("draw_card_button").hidden = false;
    console.log("Start New Turn")
    currentPlayer = game_state["currentPlayer"]
    updatePlayerHand(game_state, currentPlayer)
}

async function endTurn() {
    await nextTurn()
    await getGameState()
    let game_state = Object(AccessGameState())
    document.getElementById("card_drawn").innerText = "Start of new Turn"
    document.getElementById("start_turn_button").hidden = false;
    document.getElementById("end_turn_button").hidden = true;
    document.getElementById("player-hand").innerText = ""
    currentPlayer = game_state["currentPlayer"]
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1) + " start your turn";
}

async function nextTurn() {
    try {
        let response = await fetch(`${apiBaseUrl}/next_turn`);
        return await response.text()

    } catch (error) {
        console.error("Error in nextTurn():", error);
    }
}

async function nextPlayer() {
    try {
        let response = await fetch(`${apiBaseUrl}/next_player`);
        return await response.text()

    } catch (error) {
        console.error("Error in nextPlayer():", error);
    }
}

async function queensFavor() {
    let cards = "";
    try {
        const response = await fetch(`${apiBaseUrl}/queens_favor`, {method: "POST"});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
        }

        cards = await response.text();
        console.log("draw_adventure_card Response:", cards);
    } catch (error) {
        console.error("Error in draw_adventure_card:", error);
        cards = ""; // or handle the error appropriately
    }
    console.log("Queen’s favor: ", cards);
    return cards;
}

async function drawAdventureCard() {
    let card = "";
    try {
        const response = await fetch(`${apiBaseUrl}/draw_adventure_card`, {method: "POST"});

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
        }

        card = await response.text();
        console.log("draw_adventure_card Response:", card);
    } catch (error) {
        console.error("Error in draw_adventure_card:", error);
        card = ""; // or handle the error appropriately
    }
    return card;
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
    console.log("currentPlayer2: " + currentPlayer)
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
    document.getElementById("player-hand").innerText = currentPlayerHand
}

async function selectCard() {
    let card = document.getElementById("cardInput").value
    document.getElementById("cardInput").value = ""
    // DONE: pass to game to check if it is a valid card
    let response = await fetch(`${apiBaseUrl}/check_valid_card?card=${card}`);
    let result = await response.text();
    if (result === "true") {
        return card
    } else {
        document.getElementById("card_drawn").innerText += "\nInvalid card, please try again"
        return ""
    }

}

async function checkNumberCards() {
    await getGameState()
    let game_state = Object(AccessGameState())
    let numberCards = game_state["players"][currentPlayer]["numberCards"]
    console.log("numberCards: " + numberCards)
    if (numberCards > 12) {
        document.getElementById("card_drawn").innerText += "\nYou have more than 12 cards, discard down to 12"
        document.getElementById("enter_cards").hidden = false;
        return true
    }
    document.getElementById("enter_cards").hidden = true;

    return false
}


async function submitCardForDiscard() {
    // DONE: how function to handle selection of cards and validation, returns the card selected
    console.log("submitCardForDiscard")
    let card = await selectCard()
    if (card === "") {
        document.getElementById("enter_cards").hidden = false;
    } else {
        let response = await fetch(`${apiBaseUrl}/discard_card?card=${card}`);
        let discardedCard = await response.text();
        document.getElementById("card_drawn").innerText += "\nYou discarded: " + discardedCard
        await getGameState()
        let game_state = Object(AccessGameState())
        updateHand(game_state)
        let moreToDiscard = await checkNumberCards()
        if (moreToDiscard) {
            document.getElementById("enter_cards").hidden = false;
        } else {
            document.getElementById("enter_cards").hidden = true;
            document.getElementById("end_turn_button").hidden = false;
        }
    }


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
        document.getElementById("draw_card_button").addEventListener("click", drawEventCard);
        document.getElementById("no_button").addEventListener("click", declineSponsorship);
        document.getElementById("yes_button").addEventListener("click", sponsorQuest);
        document.getElementById("end_turn_button").addEventListener("click", endTurn);
        document.getElementById("start_turn_button").addEventListener("click", startNewTurn);
        document.getElementById("submit_card_button").addEventListener("click", submitCardForDiscard);
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

