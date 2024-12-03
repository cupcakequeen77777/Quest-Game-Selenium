const {Builder, By, until, added} = require('selenium-webdriver');
const assert = require("node:assert");

async function scenario_0_winner_quest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        // await driver.sleep(2000)

        let startButton = await getElementById(driver, 'start_game_button');

        await startButton.click();
        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        let startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)

        let draw_card_button = await getElementById(driver, 'draw_card_button');
        // TODO: change text on draw event card to draw adventure card

        // PP1 draws a 2 stage quest and decides to sponsor it.
        await drawEventCard(driver, draw_card_button);

        // NOTE: player 1 choose to sponsor quest
        let yes_button = await getElementById(driver, 'yes_button');
        await yes_button.click();
        console.log("player 1 choose to sponsor quest");
        await driver.sleep(1000)


        // Player 1 enters cards to sponsor quest stage 1
        await playCards(driver, ["F50", "dagger", "sword", "horse", "axe", "lance"]);
        // Player 1 enters cards to sponsor quest stage 2
        await playCards(driver, ["F70", "dagger", "sword", "horse", "axe", "lance"]);
        // TODO: the player card area is still there, need to remove it
        let end_turn_button = await getElementById(driver, 'end_turn_button');
        await end_turn_button.click();
        await driver.sleep(1000)

        // P2 participates, draws 1xF5, discards F5
        // P3 participates, draws 1xF15, discards F15
        // P4 participates, draws 1xF10, discards F10
        await allPlayersParticipate(driver, yes_button, draw_card_button, end_turn_button, ["F5", "F15", "F10"]);

        // P2 attack: Excalibur thus loses
        // P3 plays nothing as attack and thus loses
        // P4 plays nothing as attack and thus loses
        startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)
        await playCard(driver, "Excalibur");
        console.log("player 2 plays Excalibur");


        await driver.sleep(100000)


        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Game started'), 10000);
        // console.log("Game started successfully.");
        //
        // let hitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Hit')]"));
        // for (let i = 0; i < 3; i++) {
        //     await hitButton.click();
        //     await driver.sleep(1000);
        //     let hitStatus = await driver.findElement(By.id('game-status')).getText();
        //     console.log(`After Hit ${i + 1}:`, hitStatus);
        //
        //     if (hitStatus.includes("Bust")) {
        //         console.log("Player busted!");
        //         break;
        //     }
        // }
        //
        // let standButton = await driver.findElement(By.xpath("//button[contains(text(), 'Stand')]"));
        // await standButton.click();
        //
        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Player'), 10000);
        //
        // let finalStatus = await driver.findElement(By.id('game-status')).getText();
        // console.log("Final Game Status:", finalStatus);
        //
        // if (finalStatus.includes("Player wins") || finalStatus.includes("Dealer wins") || finalStatus.includes("It's a tie")) {
        //     console.log("Test passed: Final game result is displayed correctly.");
        // } else {
        //     console.log("Test failed: Final game result is missing or incorrect.");
        // }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
}

async function scenario_2winner_game_2winner_quest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        // await driver.sleep(2000)

        let startButton = await getElementById(driver, 'start_game_button');

        await startButton.click();
        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        let startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)

        let draw_card_button = await getElementById(driver, 'draw_card_button');
        // TODO: change text on draw event card to draw adventure card

        // PP1 draws a 2 stage quest and decides to sponsor it.
        await drawEventCard(driver, draw_card_button);

        // NOTE: player 1 choose to sponsor quest
        let yes_button = await getElementById(driver, 'yes_button');
        await yes_button.click();
        console.log("player 1 choose to sponsor quest");
        await driver.sleep(1000)


        // Player 1 enters cards to sponsor quest stage 1
        await playCards(driver, ["F50", "dagger", "sword", "horse", "axe", "lance"]);
        // Player 1 enters cards to sponsor quest stage 2
        await playCards(driver, ["F70", "dagger", "sword", "horse", "axe", "lance"]);
        // TODO: the player card area is still there, need to remove it
        let end_turn_button = await getElementById(driver, 'end_turn_button');
        await end_turn_button.click();
        await driver.sleep(1000)

        // P2 participates, draws 1xF5, discards F5
        // P3 participates, draws 1xF15, discards F15
        // P4 participates, draws 1xF10, discards F10
        await allPlayersParticipate(driver, yes_button, draw_card_button, end_turn_button, ["F5", "F15", "F10"]);

        // P2 attack: Excalibur thus loses
        // P3 plays nothing as attack and thus loses
        // P4 plays nothing as attack and thus loses
        startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)
        await playCard(driver, "Excalibur");
        console.log("player 2 plays Excalibur");


        await driver.sleep(100000)


        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Game started'), 10000);
        // console.log("Game started successfully.");
        //
        // let hitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Hit')]"));
        // for (let i = 0; i < 3; i++) {
        //     await hitButton.click();
        //     await driver.sleep(1000);
        //     let hitStatus = await driver.findElement(By.id('game-status')).getText();
        //     console.log(`After Hit ${i + 1}:`, hitStatus);
        //
        //     if (hitStatus.includes("Bust")) {
        //         console.log("Player busted!");
        //         break;
        //     }
        // }
        //
        // let standButton = await driver.findElement(By.xpath("//button[contains(text(), 'Stand')]"));
        // await standButton.click();
        //
        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Player'), 10000);
        //
        // let finalStatus = await driver.findElement(By.id('game-status')).getText();
        // console.log("Final Game Status:", finalStatus);
        //
        // if (finalStatus.includes("Player wins") || finalStatus.includes("Dealer wins") || finalStatus.includes("It's a tie")) {
        //     console.log("Test passed: Final game result is displayed correctly.");
        // } else {
        //     console.log("Test failed: Final game result is missing or incorrect.");
        // }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
}

async function scenario_1winner_game_with_events() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        // await driver.sleep(2000)

        let startButton = await getElementById(driver, 'start_game_button');

        await startButton.click();
        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        let startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)

        let draw_card_button = await getElementById(driver, 'draw_card_button');
        // TODO: change text on draw event card to draw adventure card

        // PP1 draws a 2 stage quest and decides to sponsor it.
        await drawEventCard(driver, draw_card_button);

        // NOTE: player 1 choose to sponsor quest
        let yes_button = await getElementById(driver, 'yes_button');
        await yes_button.click();
        console.log("player 1 choose to sponsor quest");
        await driver.sleep(1000)


        // Player 1 enters cards to sponsor quest stage 1
        await playCards(driver, ["F50", "dagger", "sword", "horse", "axe", "lance"]);
        // Player 1 enters cards to sponsor quest stage 2
        await playCards(driver, ["F70", "dagger", "sword", "horse", "axe", "lance"]);
        // TODO: the player card area is still there, need to remove it
        let end_turn_button = await getElementById(driver, 'end_turn_button');
        await end_turn_button.click();
        await driver.sleep(1000)

        // P2 participates, draws 1xF5, discards F5
        // P3 participates, draws 1xF15, discards F15
        // P4 participates, draws 1xF10, discards F10
        await allPlayersParticipate(driver, yes_button, draw_card_button, end_turn_button, ["F5", "F15", "F10"]);

        // P2 attack: Excalibur thus loses
        // P3 plays nothing as attack and thus loses
        // P4 plays nothing as attack and thus loses
        startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)
        await playCard(driver, "Excalibur");
        console.log("player 2 plays Excalibur");


        await driver.sleep(100000)


        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Game started'), 10000);
        // console.log("Game started successfully.");
        //
        // let hitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Hit')]"));
        // for (let i = 0; i < 3; i++) {
        //     await hitButton.click();
        //     await driver.sleep(1000);
        //     let hitStatus = await driver.findElement(By.id('game-status')).getText();
        //     console.log(`After Hit ${i + 1}:`, hitStatus);
        //
        //     if (hitStatus.includes("Bust")) {
        //         console.log("Player busted!");
        //         break;
        //     }
        // }
        //
        // let standButton = await driver.findElement(By.xpath("//button[contains(text(), 'Stand')]"));
        // await standButton.click();
        //
        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Player'), 10000);
        //
        // let finalStatus = await driver.findElement(By.id('game-status')).getText();
        // console.log("Final Game Status:", finalStatus);
        //
        // if (finalStatus.includes("Player wins") || finalStatus.includes("Dealer wins") || finalStatus.includes("It's a tie")) {
        //     console.log("Test passed: Final game result is displayed correctly.");
        // } else {
        //     console.log("Test failed: Final game result is missing or incorrect.");
        // }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
}

async function scenario_A_TEST_JP() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        // await driver.sleep(2000)

        let startButton = await getElementById(driver, 'start_game_button');

        await startButton.click();
        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        let startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)

        let draw_card_button = await getElementById(driver, 'draw_card_button');
        // TODO: change text on draw event card to draw adventure card

        // P1 draws a 4 stage quest and decides to sponsor it.
        await drawEventCard(driver, draw_card_button);

        // P1 is asked but declines to sponsor
        let no_button = await getElementById(driver, 'no_button');
        await no_button.click();
        await driver.sleep(500)

        // P2 is asked and sponsors and then builds the 4 stages of the quest
        let yes_button = await getElementById(driver, 'yes_button');
        await yes_button.click();
        console.log("player 2 choose to sponsor quest");
        await driver.sleep(500)


        // Player 2 enters cards to sponsor quest stage 1
        await playCards(driver, ["F5", "horse"]);
        // Player 2 enters cards to sponsor quest stage 2
        await playCards(driver, ["F15", "sword"]);
        // Player 2 enters cards to sponsor quest stage 3
        await playCards(driver, ["F15", "dagger", "axe"]);
        // Player 2 enters cards to sponsor quest stage 4
        await playCards(driver, ["F40", "axe"]);
        // TODO: the player card area is still there, need to remove it
        let end_turn_button = await getElementById(driver, 'end_turn_button');
        await end_turn_button.click();
        await driver.sleep(1000)

        // P2 participates, draws an F30 – discards an F5
        // P3 participates, draws a Sword - discards an F5
        // P4 participates, draws an Axe - discards an F5
        await allPlayersParticipate(driver, yes_button, draw_card_button, end_turn_button, ["F5", "F15", "F5"]);

        console.log("all players participated");
        await driver.sleep(100000)


        // TODO:
        // P2 attack: Dagger + Sword => value of 15

        // P3 attack: Sword + Dagger => value of 15
        // P4 attack: Dagger + Horse => value of 15
        startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)
        await playCard(driver, "Dagger");
        console.log("player 2 plays Excalibur");




        await driver.sleep(100000)


        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Game started'), 10000);
        // console.log("Game started successfully.");
        //
        // let hitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Hit')]"));
        // for (let i = 0; i < 3; i++) {
        //     await hitButton.click();
        //     await driver.sleep(1000);
        //     let hitStatus = await driver.findElement(By.id('game-status')).getText();
        //     console.log(`After Hit ${i + 1}:`, hitStatus);
        //
        //     if (hitStatus.includes("Bust")) {
        //         console.log("Player busted!");
        //         break;
        //     }
        // }
        //
        // let standButton = await driver.findElement(By.xpath("//button[contains(text(), 'Stand')]"));
        // await standButton.click();
        //
        // await driver.wait(until.elementTextContains(driver.findElement(By.id('game-status')), 'Player'), 10000);
        //
        // let finalStatus = await driver.findElement(By.id('game-status')).getText();
        // console.log("Final Game Status:", finalStatus);
        //
        // if (finalStatus.includes("Player wins") || finalStatus.includes("Dealer wins") || finalStatus.includes("It's a tie")) {
        //     console.log("Test passed: Final game result is displayed correctly.");
        // } else {
        //     console.log("Test failed: Final game result is missing or incorrect.");
        // }

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
}

async function drawEventCard(driver, draw_card_button) {
    await draw_card_button.click();
    await driver.sleep(500)
}

async function playCards(driver, cardForStage) {
    for (let card of cardForStage) {
        await playCard(driver, card)
    }
    let finish_button = await getElementById(driver, 'finish_button');
    await finish_button.click();
}

async function playCard(driver, card) {
    let cardInput = await getElementById(driver, 'cardInput');
    let submit_card_button = await getElementById(driver, 'submit_card_button');
    await cardInput.sendKeys(card);
    await driver.sleep(200)
    await submit_card_button.click();
    console.log("player plays " + card);
    await driver.sleep(200)
}

async function allPlayersParticipate(driver, yes_button, draw_card_button, end_turn_button, discardCards) {
    for (let card of discardCards) {
        await playerParticipate(driver, yes_button, draw_card_button, end_turn_button, card)
    }
}

async function playerParticipate(driver, yes_button, draw_card_button, end_turn_button, discardCard) {
    await yes_button.click();
    await driver.sleep(2000)
    // Player participates, draws card, discards discardCard
    await draw_card_button.click();
    await driver.sleep(2000)
    await playCard(driver, discardCard);
    await end_turn_button.click();
}

async function getElementById(driver, id, timeout = 2000) {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
}

async function getElementTextById(driver, id, timeout = 2000) {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
}

async function getElementByName(driver, name, timeout = 2000) {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
}

async function getElementByXpath(driver, xpath, timeout = 2000) {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
}

scenario_0_winner_quest();
// QUESTION: how to change to different deck
// scenario_2winner_game_2winner_quest();
// scenario_1winner_game_with_events();
// scenario_A_TEST_JP();