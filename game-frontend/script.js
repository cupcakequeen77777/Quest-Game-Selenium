const apiBaseUrl = "http://localhost:8081";

async function startGame() {
    try {
        const response = await fetch(`${apiBaseUrl}/start`);
        const result = await response.text();
        console.log("Start Game Response:", result);
        document.getElementById("game-status").innerText = result;
    } catch (error) {
        console.error("Error in startGame:", error);
    }
}

async function start_turn() {
    try {
        const response = await fetch(`${apiBaseUrl}/start_turn`, { method: "POST" });
        const result = await response.text();
        console.log("start_turn Response:", result);
        // document.getElementById("game-status").innerText = result;
    } catch (error) {
        console.error("Error in hit:", error);
    }
}

async function stand() {
    try {
        const response = await fetch(`${apiBaseUrl}/stand`, { method: "POST" });
        const result = await response.text();
        console.log("Stand Response:", result);
        document.getElementById("game-status").innerText = result;
    } catch (error) {
        console.error("Error in stand:", error);
    }
}
