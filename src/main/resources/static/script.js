const apiBaseUrl = "http://localhost:8080";

async function startGame() {
    console.log("Here")
    try {
        const response = await fetch(`${apiBaseUrl}/start`);
        const result = await response.text();
        console.log("Start Game Response:", result);
        document.getElementById("game-status").innerText = result;
    } catch (error) {
        console.error("Error in startGame:", error);
    }
}

