const apiBaseUrl = "http://localhost:8080";

async function startGame() {
    try {
        const response = await fetch(`${apiBaseUrl}/start`);
        const result = await response.text();
        // Store the current player number in localStorage
        localStorage.setItem("currentPlayer", result);

        // Navigate to the start-turn page
        location.pathname = "start-turn.html";
    } catch (error) {
        console.error("Error in startGame:", error);
    }
}

async function startTurn() {
    try {
        const response = await fetch(`${apiBaseUrl}/get-current-hand`);
        const result = await response.text();
        // Store the current player number in localStorage
        localStorage.setItem("currentPlayerHand", result);

        // Navigate to the start-turn page
        location.pathname = "play-turn.html";
    } catch (error) {
        console.error("Error in startTurn:", error);
    }
}

if (location.pathname === "/") {
    // Add event listener to the Start Game button
    document.getElementById("start_turn_button").addEventListener("click", startGame);
}


// This function will run when the start-turn page loads
window.onload = function () {

    if (location.pathname === "/start-turn.html") {
        const currentPlayer = localStorage.getItem("currentPlayer");
        if (currentPlayer) {
            document.getElementById("player-number").innerText = "Player " + currentPlayer + " start your turn";
        }
        document.getElementById("start_turn_button").addEventListener("click", startTurn);

    }
    if (location.pathname === "/play-turn.html") {
        const currentPlayer = localStorage.getItem("currentPlayer");
        const currentPlayerHand = localStorage.getItem("currentPlayerHand");
        if (currentPlayer) {
            document.getElementById("player-number").innerText = "Player " + currentPlayer;
            document.getElementById("player-hand").innerText = currentPlayerHand;
        }
    }
};

