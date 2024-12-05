const apiBaseUrl = "http://localhost:8080";
let currentPlayer = 0;
let participant = [];

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

if (location.pathname === "/") {
    // Add event listener to the Start Game button
    document.getElementById("start_game_button").addEventListener("click", startGame);
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
        updateShields(game_state)
        console.log(game_state["eventCard"])

    }
};

async function startGame() {
    console.log("in startGame")
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
    console.log("in startTurn")
    await getGameState()
    location.pathname = "play-turn.html";
}

async function startNewTurn() {
    console.log("in startNewTurn")
    await getGameState()
    let game_state = Object(AccessGameState())
    document.getElementById("card_drawn").innerText = ""
    document.getElementById("start_turn_button").hidden = true;
    document.getElementById("draw_card_button").hidden = false;
    document.getElementById("draw_card_button").innerText = "Draw Event Card"

    console.log("Start New Turn")
    currentPlayer = game_state["currentPlayer"]
    updatePlayerHand(game_state, currentPlayer)
}

async function drawEventCard() {
    console.log("in drawEventCard")
    document.getElementById("draw_card_button").hidden = true;
    document.getElementById("draw_card_button").removeEventListener("click", drawEventCard);

    try {
        let response = await fetch(`${apiBaseUrl}/draw_event_card`, {method: "POST"});
        let result = await response.text();
        console.log("draw_event_card Response:", result);
        await getGameState()
        let game_state = Object(AccessGameState())
        console.log(game_state)
        document.getElementById("card_drawn").innerText = "You drew: " + game_state["eventCard"]
        currentPlayer = game_state["currentPlayer"]
        switch (game_state["eventCard"]) {
            case "Plague":
                await plague() // REMOVE
                document.getElementById("card_drawn").innerText += "\nYou lose 2 shields"
                response = await fetch(`${apiBaseUrl}/play_plague_card`, {method: "POST"});
                result = await response.text();
                console.log("play_plague_card Response:", result);
                updateShields(game_state)
                document.getElementById("end_turn_button").hidden = false;
                document.getElementById("end_turn_button").addEventListener("click", endTurn);
                break;
            case "Queen’s favor":
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
                document.getElementById("end_turn_button").addEventListener("click", endTurn);
                break;
            default:
                document.getElementById("card_drawn").innerText += "\nDo you want to sponsor the quest?"
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

async function endTurn() {
    console.log("In endTurn")
    await nextTurn()
    await getGameState()
    let game_state = Object(AccessGameState())
    document.getElementById("card_drawn").innerText = "Start of new Turn"
    document.getElementById("start_turn_button").hidden = false;
    // document.getElementById("start_turn_button").addEventListener("click", startNewTurn); REMOVE

    document.getElementById("end_turn_button").hidden = true;
    document.getElementById("end_turn_button").removeEventListener("click", endTurn);

    document.getElementById("player-hand").innerText = ""
    currentPlayer = game_state["currentPlayer"]
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1) + " start your turn";
}

async function declineSponsorship() {
    console.log("in declineSponsorship")
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
        document.getElementById("no_button").removeEventListener("click", declineSponsorship);
        document.getElementById("yes_button").removeEventListener("click", sponsorQuest);
        document.getElementById("draw_card_button").hidden = true;
        document.getElementById("end_turn_button").hidden = false;
        document.getElementById("card_drawn").innerText = ""
        console.log("Start New Turn")
    } else {
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
    console.log("in sponsorQuest")
    let response = await fetch(`${apiBaseUrl}/sponsor_quest`, {method: "POST"});
    // TODO: check if player can sponsor quest otherwise put up end turn button and response saying they can't sponsor

    let quest = AccessGameState()["quest"]
    console.log(quest)
    let currentStage = quest["currentStage"]
    let numStages = quest["numStages"]

    document.getElementById("card_drawn").innerText = "Sponsor, choose a card for stage " + (currentStage + 1) + "/" + numStages
    document.getElementById("enter_cards").hidden = false;
    document.getElementById("yes_button").hidden = true;
    document.getElementById("no_button").hidden = true;
    document.getElementById("no_button").removeEventListener("click", declineSponsorship);
    document.getElementById("yes_button").removeEventListener("click", sponsorQuest);
    document.getElementById("submit_card_button").addEventListener("click", submitCardForStage);
}

async function submitCardForStage() {
    // DONE: how function to handle selection of cards and validation, returns the card selected
    console.log("in submitCardForStage")
    let card = await selectCard()

    if (card === "") { // TODO: also check if there is at least one foe card played
        document.getElementById("enter_cards").hidden = false;
    } else {
        let response = await fetch(`${apiBaseUrl}/enter_card_for_stage?card=${card}`);
        let enteredCard = await response.text();
        document.getElementById("card_drawn").innerText += "\nYou entered: " + enteredCard
        await getGameState()
        let game_state = Object(AccessGameState())
        currentPlayer = game_state["currentPlayer"]
        console.log("Current Player: " + currentPlayer)
        updatePlayerHand(game_state, currentPlayer)
        document.getElementById("enter_cards").hidden = false;
        document.getElementById("finish_button").hidden = false;
        if (game_state["quest"]["currentStage"] + 1 === game_state["quest"]["numStages"]) {
            await fetch(`${apiBaseUrl}/reset_current_stage`, {method: "POST"});
            document.getElementById("finish_button").addEventListener("click", finishSponsorStage);
        } else {
            document.getElementById("finish_button").addEventListener("click", sponsorNextStage);

        }

    }
}

async function sponsorNextStage() {
    console.log("in sponsorNextStage")
    let response = await fetch(`${apiBaseUrl}/sponsor_next_stage`, {method: "POST"});
    let result = await response.text();
    await getGameState()
    let game_state = Object(AccessGameState())
    if (result === "true") {
        let currentStage = game_state["quest"]["currentStage"]
        let numStages = game_state["quest"]["numStages"]
        console.log("sponsor_next_stage Response:", result);
        document.getElementById("finish_button").hidden = true;
        document.getElementById("finish_button").removeEventListener("click", sponsorNextStage);
        document.getElementById("enter_cards").hidden = false;
        document.getElementById("submit_card_button").addEventListener("click", submitCardForStage);
        document.getElementById("card_drawn").innerText = "Sponsor, choose a card for stage " + (currentStage + 1) + "/" + numStages
    } else {
        console.log("Stage should be finished")
        document.getElementById("end_turn_button").hidden = false;
        document.getElementById("enter_cards").hidden = true;
        document.getElementById("submit_card_button").removeEventListener("click", submitCardForStage);

    }

}

function finishSponsorStage() {
    console.log("in finishSponsorStage")
    document.getElementById("card_drawn").innerText = "You have sponsored all stages"
    document.getElementById("enter_cards").hidden = true;
    document.getElementById("finish_button").hidden = true;
    document.getElementById("end_turn_button").hidden = false;
    document.getElementById("finish_button").removeEventListener("click", finishSponsorStage);
    document.getElementById("finish_button").removeEventListener("click", sponsorNextStage);
    document.getElementById("submit_card_button").removeEventListener("click", submitCardForStage);
    document.getElementById("end_turn_button").removeEventListener("click", endTurn);
    document.getElementById("end_turn_button").addEventListener("click", askForParticipation);
}


async function askForParticipation() {
    console.log("in askForParticipation")
    await nextPlayer()
    await getGameState()
    let game_state = Object(AccessGameState())
    let currentPlayer = game_state["currentPlayer"]
    updatePlayerHand(game_state, currentPlayer)
    document.getElementById("enter_cards").hidden = true;
    document.getElementById("start_turn_button").hidden = true;
    document.getElementById("end_turn_button").hidden = true;
    document.getElementById("finish_button").hidden = true;
    document.getElementById("yes_button").hidden = false;
    document.getElementById("no_button").hidden = false;
    document.getElementById("draw_card_button").hidden = true;
    document.getElementById("end_turn_button").removeEventListener("click", askForParticipation);
    document.getElementById("yes_button").addEventListener("click", acceptQuest);
    document.getElementById("no_button").addEventListener("click", askNextPlayerForParticipation);
    document.getElementById("card_drawn").innerText = "Do you want to participate in a quest of " + game_state["quest"]["numStages"] + " stages?"
}

async function acceptQuest() {
    console.log("in acceptQuest")
    let response = await fetch(`${apiBaseUrl}/accept_quest`, {method: "POST"});
    const nextPlayer = await response.text();
    console.log("accept_quest Response:", nextPlayer);
    document.getElementById("draw_card_button").hidden = false;
    document.getElementById("draw_card_button").innerText = "Draw Adventure Card"
    document.getElementById("draw_card_button").addEventListener("click", drawAdventureCard);
    document.getElementById("yes_button").hidden = true;
    document.getElementById("no_button").hidden = true;
    document.getElementById("yes_button").removeEventListener("click", acceptQuest);
    document.getElementById("no_button").removeEventListener("click", askNextPlayerForParticipation);

}

async function drawAdventureCard() {
    console.log("in drawAdventureCard")
    let card = "";
    document.getElementById("draw_card_button").hidden = true;
    document.getElementById("draw_card_button").removeEventListener("click", drawAdventureCard);

    document.getElementById("end_turn_button").hidden = true;
    document.getElementById("end_turn_button").removeEventListener("click", askForParticipation);

    document.getElementById("draw_card_button").innerText = "Draw !!!! Card"


    try {
        const response = await fetch(`${apiBaseUrl}/draw_adventure_card`, {method: "POST"});
        card = await response.text();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
        }

        console.log("draw_adventure_card Response:", card);
        document.getElementById("card_drawn").innerText = "You drew: " + card
        await getGameState()
        let game_state = AccessGameState()
        currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)
        await checkNumberCards();
        document.getElementById("end_turn_button").addEventListener("click", askNextPlayerForParticipation);

    } catch (error) {
        console.error("Error in draw_adventure_card:", error);
        card = ""; // or handle the error appropriately
    }
    return card;
}

async function askNextPlayerForParticipation() {
    console.log("in askNextPlayerForParticipation")
    await nextPlayer()
    await getGameState()
    let game_state = AccessGameState()
    document.getElementById("end_turn_button").hidden = true;


    currentPlayer = game_state["currentPlayer"]
    let playerTurn = game_state["playerTurn"]

    console.log("playerTurn: " + playerTurn)
    console.log("currentPlayer: " + currentPlayer)

    if (currentPlayer === playerTurn) {
        document.getElementById("yes_button").hidden = true;
        document.getElementById("no_button").hidden = true;
        document.getElementById("yes_button").removeEventListener("click", acceptQuest);
        document.getElementById("no_button").removeEventListener("click", askNextPlayerForParticipation);
        document.getElementById("start_turn_button").removeEventListener("click", startNewTurn);
        document.getElementById("end_turn_button").removeEventListener("click", askNextPlayerForParticipation);

        document.getElementById("draw_card_button").hidden = true;
        document.getElementById("end_turn_button").hidden = true;
        document.getElementById("start_turn_button").hidden = false;
        document.getElementById("card_drawn").innerText = ""
        console.log("Start Quest stages")
        console.log(game_state["quest"]["stages"][game_state["quest"]["currentStage"]]["participants"])
        for (let i = 0; i < game_state["quest"]["stages"][game_state["quest"]["currentStage"]]["participants"].length; i++) {
            participant.push(game_state["quest"]["stages"][game_state["quest"]["currentStage"]]["participants"][i]["playerNumber"] - 1)
        }
        participant.reverse()
        console.log(participant)
        let newCurrentPlayer = participant.at(-1)
        await fetch(`${apiBaseUrl}/set_current_player?playerNumber=${parseInt(newCurrentPlayer)}`)
        // TODO: check this
        console.log(currentPlayer)
        document.getElementById("start_turn_button").addEventListener("click", startAttackStages);
        updatePlayerHand(game_state, newCurrentPlayer)
    } else {
        await getGameState()
        let game_state = AccessGameState()
        document.getElementById("yes_button").addEventListener("click", acceptQuest);
        document.getElementById("no_button").addEventListener("click", askNextPlayerForParticipation);
        document.getElementById("end_turn_button").removeEventListener("click", askNextPlayerForParticipation);

        document.getElementById("card_drawn").innerText = "Do you want to participate in a quest of " + game_state["quest"]["numStages"] + " stages?"
        document.getElementById("yes_button").hidden = false;
        document.getElementById("no_button").hidden = false;
        currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)
    }

}

async function startAttackStages() {
    console.log("in startAttackStages")
    if (participant.length === 0) {
        document.getElementById("enter_cards").hidden = true;
        document.getElementById("submit_card_button").removeEventListener("click", submitAttackForStage);
        document.getElementById("finish_button").removeEventListener("click", startAttackStages);
        document.getElementById("submit_card_button").removeEventListener("click", submitAttackForStage);

        console.log("This Stage attack complete, end turn button should be displayed")
        document.getElementById("end_turn_button").hidden = false;
        document.getElementById("end_turn_button").addEventListener("click", finishAnAttackStage);


    } else {
        let newCurrentPlayer = participant.at(-1)
        participant.pop()
        console.log("participant: " + participant)
        await fetch(`${apiBaseUrl}/set_current_player?playerNumber=${parseInt(newCurrentPlayer)}`)
        await getGameState()
        let game_state = Object(AccessGameState())
        let currentPlayer = game_state["currentPlayer"]
        let currentStage = game_state["quest"]["currentStage"]
        let numStages = game_state["quest"]["numStages"]

        console.log("currentPlayer: " + currentPlayer)
        document.getElementById("enter_cards").hidden = false;
        document.getElementById("finish_button").hidden = false;
        document.getElementById("yes_button").hidden = true;
        document.getElementById("no_button").hidden = true;
        document.getElementById("start_turn_button").hidden = true;
        document.getElementById("start_turn_button").removeEventListener("click", startAttackStages);

        document.getElementById("submit_card_button").addEventListener("click", submitAttackForStage);
        document.getElementById("finish_button").addEventListener("click", startAttackStages);
        document.getElementById("card_drawn").innerText = "Choose an attack card for stage " + (currentStage + 1) + "/" + numStages
        updatePlayerHand(game_state, currentPlayer)
    }
}

async function submitAttackForStage() {
    console.log("in submitAttackForStage")
    document.getElementById("enter_cards").hidden = false;
    document.getElementById("finish_button").hidden = false;

    let card = await selectCard()
    if (card !== "") {
        let response = await fetch(`${apiBaseUrl}/enter_card_for_attack?card=${card}`);
        let enteredCard = await response.text();
        document.getElementById("card_drawn").innerText += "\nYou entered: " + enteredCard
        await getGameState()
        let game_state = Object(AccessGameState())
        currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)
        document.getElementById("finish_button").addEventListener("click", startAttackStages);
    }
}

// TODO: FIXME: finishAnAttackStage
async function finishAnAttackStage() {
    console.log("in finishAnAttackStage")
    let response = await fetch(`${apiBaseUrl}/resolve_stage_attack`, {method: "POST"});
    let successfulParticipants = await response.text();
    console.log("Participants:", successfulParticipants);
    await getGameState()
    let game_state = Object(AccessGameState())
    response = await fetch(`${apiBaseUrl}/resolve_quest`, {method: "POST"});
    let result = await response.text();
    console.log("resolve_quest Response:", result);
    if (game_state["quest"]["currentStage"] + 1 === game_state["quest"]["numStages"]) {
        // resolveQuest
        console.log("Quest is resolved")


    }
    // if all players failed quest, end quest
    if(successfulParticipants === "[]"){
        console.log("All players failed quest")
        // end quest
    }

    // Move to next stage


}

async function nextTurn() {
    console.log("in nextTurn")
    try {
        let response = await fetch(`${apiBaseUrl}/next_turn`);
        return await response.text()

    } catch (error) {
        console.error("Error in nextTurn():", error);
    }
}

async function nextPlayer() {
    console.log("in nextPlayer")
    try {
        let response = await fetch(`${apiBaseUrl}/next_player`);
        return await response.text()

    } catch (error) {
        console.error("Error in nextPlayer():", error);
    }
}

async function queensFavor() {
    console.log("in queensFavor")
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

function updateShields(game_state) {
    console.log("in updateShields")
    document.getElementById("player1-score").innerText = game_state["players"][0]["shields"]
    document.getElementById("player2-score").innerText = game_state["players"][1]["shields"]
    document.getElementById("player3-score").innerText = game_state["players"][2]["shields"]
    document.getElementById("player4-score").innerText = game_state["players"][3]["shields"]

}

function updateHand(game_state) {
    console.log("in updateHand")
    const currentPlayer = game_state["playerTurn"]
    let currentPlayerHand = game_state["players"][currentPlayer]["hand"]
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
    if (currentPlayerHand === "[]") {
        currentPlayerHand = "No cards"
    }
    document.getElementById("player-hand").innerText = currentPlayerHand
}

function updatePlayerHand(game_state, currentPlayer) {
    console.log("in updatePlayerHand")
    let currentPlayerHand = game_state["players"][currentPlayer]["hand"]
    console.log("currentPlayer: " + (currentPlayer + 1))
    if (currentPlayerHand === "[]") {
        currentPlayerHand = "No cards"
    }
    document.getElementById("player-number").innerText = "Player " + (currentPlayer + 1);
    document.getElementById("player-hand").innerText = currentPlayerHand
}

async function selectCard() {
    console.log("in selectCard")
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
    console.log("in checkNumberCards")
    await getGameState()
    let game_state = Object(AccessGameState())
    let numberCards = game_state["players"][currentPlayer]["numberCards"]
    console.log("numberCards: " + numberCards)
    console.log(game_state)
    if (numberCards > 12) {
        document.getElementById("card_drawn").innerText += "\nYou have more than 12 cards, discard down to 12"
        document.getElementById("enter_cards").hidden = false;
        document.getElementById("submit_card_button").addEventListener("click", submitCardForDiscard);
        return true
    }
    document.getElementById("enter_cards").hidden = true;

    return false
}


async function submitCardForDiscard() {
    // DONE: how function to handle selection of cards and validation, returns the card selected
    console.log("in submitCardForDiscard")
    let card = await selectCard()
    if (card === "") {
        document.getElementById("enter_cards").hidden = false;
    } else {
        let response = await fetch(`${apiBaseUrl}/discard_card?card=${card}`);
        let discardedCard = await response.text();
        document.getElementById("card_drawn").innerText += "\nYou discarded: " + discardedCard
        await getGameState()
        let game_state = Object(AccessGameState())
        let currentPlayer = game_state["currentPlayer"]
        updatePlayerHand(game_state, currentPlayer)

        console.log(game_state)
        let moreToDiscard = await checkNumberCards()
        if (moreToDiscard) {
            document.getElementById("enter_cards").hidden = false;
        } else {
            document.getElementById("enter_cards").hidden = true;
            document.getElementById("end_turn_button").hidden = false;
            document.getElementById("submit_card_button").removeEventListener("click", submitCardForDiscard);
        }
    }


}


function listAllEventListeners() {
    const allElements = document.querySelectorAll('*');
    const elements = [];
    allElements.forEach(element => {
        const listeners = getEventListeners(element);
        const listenerNames = Object.keys(listeners);
        if (listenerNames.length > 0) {
            const handlers = listenerNames.reduce((acc, eventName) => {
                acc[eventName] = listeners[eventName].map(listener => listener.listener.name || 'anonymous');
                return acc;
            }, {});
            elements.push({
                element,
                listenerCount: listenerNames.length,
                handlers
            });
        }
    });
    return elements;
}

// console.table(listAllEventListeners()); // NOTE: uncomment to see all event listeners


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

