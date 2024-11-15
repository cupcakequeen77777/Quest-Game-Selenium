const apiBaseUrl = "http://localhost:8080";
let currentPlayer = ""
let currentHand = ""

document.getElementById("start_turn_button").addEventListener("click", function() {
    // Change the page
    location.pathname = "play-turn.html";
});

// This function will run when the new page loads
window.onload = function() {
    console.log("Page loaded");
    if (location.pathname === "play-turn.html") {
        document.getElementById("player-number").innerText = "New Content";
    }
};

async function startGame() {
    try {
        const response = await fetch(`${apiBaseUrl}/start`);
        const result = await response.text();
        location.pathname = "start-turn.html"
        currentPlayer = result + 1

    } catch (error) {
        console.error("Error in startGame:", error);
    }
}

// async function start_turn() {
//     location.pathname = "play-turn.html"
//
//     document.getElementById("player-number").innerText = "Testing";
//     // "Player " + currentPlayer;
//
//     document.getElementById("player-hand").innerText = "Testing";
//
//
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!! ");
//
//
//     // try {
//     //     let response = await fetch(`${apiBaseUrl}/get-current-hand`, {method: "POST"});
//     //     currentPlayer = await response.text();
//     //
//     //     console.log("get-current-player Response: Player " + currentPlayer);
//     //
//     //
//     // } catch (error) {
//     //     console.error("Error in start_turn:", error);
//     // }
// }

async function start_turn() {
    try {
        // Set window.onload before changing the view
        window.onload = async function() {
            // Fetch the current player number
            const playerResponse = await fetch(`${apiBaseUrl}/get-current-player`, { method: "POST" });
            const currentPlayer = await playerResponse.text();

            // Fetch the current player's hand
            const handResponse = await fetch(`${apiBaseUrl}/get-current-hand`, { method: "POST" });
            const currentHand = await handResponse.text();

            // Update the existing player number element
            const playerNumberElement = document.getElementById("player-number");
            playerNumberElement.innerText = "Player " + currentPlayer;

            // Update the existing player hand element
            const playerHandElement = document.getElementById("player-hand");
            playerHandElement.innerText = currentHand;

            console.log("Player " + currentPlayer);
            console.log(currentHand);
        };

        // Change the view to play-turn.html
        location.pathname = "play-turn.html";

    } catch (error) {
        console.error("Error in start_turn:", error);
    }
}

async function draw_card() {
    document.getElementById("draw_card_button").style.display = '';
    try {
        const response = await fetch(`${apiBaseUrl}/draw_card`, {method: "POST"});
        const result = await response.text();

        console.log("draw_card Response:", result);
        // location.pathname = "./play_turn.html"
        document.getElementById("player-hand").innerText = result;
        console.log("Here" + document.getElementById("player-hand").innerText)


    } catch (error) {
        console.error("Error in start_turn:", error);
    }
}

// async function play_turn() {
//     console.log("Here" + document.getElementById("player-hand").innerText)
//     try {
//         const response = await fetch(`${apiBaseUrl}/play_turn`, { method: "POST" });
//         const result = await response.text();
//         // document.getElementById("player-hand").innerText = result;
//
//         console.log("play_turn Response:", result);
//     } catch (error) {
//         console.error("Error in play_turn:", error);
//     }
// }

