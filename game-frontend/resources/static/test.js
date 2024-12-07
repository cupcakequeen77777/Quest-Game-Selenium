const {Builder, By, until, added} = require('selenium-webdriver');
const assert = require("node:assert");

async function checkCurrentPlayer(p, driver) {
    let playerNumber = await getElementById(driver, 'player-number')
    let playerNumberText = (await playerNumber.getText())
    assert(playerNumberText.includes(p), "Incorrect player being displayed is \"" + playerNumberText + "\" should be " + "\"" + p + "\"");
    return playerNumber;
}

async function checkPlayerHand(driver, playerNumber, hand) {
    let playerHand = await driver.executeScript("return document.getElementById('player" + playerNumber + "-hand').textContent;");
    playerHand = playerHand.trim();
    console.log("Player " + playerNumber + " hand is " + playerHand);
    assert((playerHand.toUpperCase()).includes(hand.toUpperCase()), "Incorrect player hand was \n" + playerHand + " should be \n" + hand);
}

async function checkParticipants(driver, players) {
    let participants = await driver.executeScript("return document.getElementById('player-hand').textContent;");
    participants = participants.trim();
    assert((participants.toUpperCase()).includes(players.toUpperCase()), "Incorrect participants was \n" + participants + " should be \n" + players);
}

async function checkNumberShields(driver, playerNumber, correctShields) {
    let shields = await driver.executeScript("return document.getElementById('player" + playerNumber + "-score').textContent;");
    shields = shields.trim();
    console.log("Player " + playerNumber + " shields is " + shields);
    assert(shields.includes(correctShields), "Incorrect number of shields was \n" + shields + " should be \n" + correctShields);
}

async function checkAllPlayersShields(driver, correctShields) {
    for (let index = 1; index <= 4; index++) {
        await checkNumberShields(driver, index, correctShields[index - 1]);
    }
}

async function scenario_0_winner_quest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        await driver.sleep(1000)

        await pressButton(driver, '0_winner_quest_button');

        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");

        // P1 draws a 2 stage quest and decides to sponsor it.
        await drawEventCard(driver);

        // NOTE: player 1 choose to sponsor quest
        await pressButton(driver, 'yes_button');

        // Player 1 enters cards to sponsor quest stage 1
        await playCards(driver, ["F50", "dagger", "sword", "horse", "axe", "lance"]);
        // Player 1 enters cards to sponsor quest stage 2
        await playCards(driver, ["F70", "dagger", "sword", "horse", "axe", "lance"]);
        await checkCurrentPlayer("Player 1", driver);
        await pressButton(driver, 'end_turn_button');

        // P2 participates, draws 1xF5, discards F5
        // P3 participates, draws 1xF15, discards F15
        // P4 participates, draws 1xF10, discards F10
        await allPlayersParticipate(driver, ["F5", "F15", "F10"]);

        // P2 attack: Excalibur thus loses
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 2", driver);
        await playCard(driver, "Excalibur");
        console.log("player 2 plays Excalibur");
        await pressButton(driver, 'finish_button');
        console.log("player 2 finishes turn");

        // P3 plays nothing as attack and thus loses
        await checkCurrentPlayer("Player 3", driver);
        await pressButton(driver, 'finish_button')
        console.log("player 3 finishes turn");

        // P4 plays nothing as attack and thus loses
        await checkCurrentPlayer("Player 4", driver);


        await pressButton(driver, 'finish_button')
        console.log("player 4 finishes turn");
        await pressButton(driver, 'end_turn_button');
        console.log("player 4 ends turn");


        // The quest ends with no winner but P1 does discards 12 quests cards
        // • P1 draws 14 cards: 1xF5, 1xF10, 1xF15,  4 daggers, 4 horses, 3 swords
        // • P1 discards 1xF5, 1x10
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 1", driver);
        await discardCards(driver, ["F5", "F10"]);
        console.log("player 1 discards F5, F10");


        // • P1’s hand: 1xF15,  4 daggers, 3 swords, 4 horses
        // • P2 has 2xF5, 1xF10, 2xF15, 2xF20, 1xF25, 2xF30, 1xF40
        // • P3 and P4 have their initial hands
        await checkPlayerHand(driver, "1", "F15 dagger dagger dagger dagger sword sword sword horse horse horse horse");
        await checkPlayerHand(driver, "2", "F5 F5 F10 F15 F15 F20 F20 F25 F30 F30 F40");
        await checkPlayerHand(driver, "3", "F5 F5 F10 F15 F15 F20 F20 F25 F25 F30 F40 Lance");
        await checkPlayerHand(driver, "4", "F5 F5 F10 F15 F15 F20 F20 F25 F25 F30 F50 Excalibur");

        await checkAllPlayersShields(driver, [0, 0, 0, 0]);

        await pressButton(driver, 'end_turn_button');
        await checkCurrentPlayer("Player 2", driver);

        await pressButton(driver, 'restart_button');
        console.log("test scenario_0_winner_quest completed")


    } catch (error) {
        // QUESTION: ending up in here instead of the finally block
        console.error("Test encountered an error:", error);
    } finally {
        // QUESTION: how to end a test?
        // QUESTION: [14568:31228:1206/155740.410:ERROR:usb_descriptors.cc(146)] Failed to read length for configuration 1.
        // [14568:31228:1206/155740.411:ERROR:usb_descriptors.cc(105)] Failed to read all configuration descriptors. Expected 2, got 1.
        // [14568:31228:1206/155740.411:ERROR:device_event_log_impl.cc(201)] [15:57:40.411] USB: usb_device_win.cc:95 Failed to read descriptors from \\?\usb#vid_0bda&pid_8153#001000001#{a5dcbf10-6530-11d2-901f-00c04fb951ed}.
        console.log("test scenario_0_winner_quest completed")
        await driver.quit();
    }
}

async function scenario_2winner_game_2winner_quest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://127.0.0.1:8080/');
        await driver.sleep(1000)

        await pressButton(driver, 'A_TEST_JP_button');

        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");


        await pressButton(driver, 'start_turn_button');


        // P1 draws a 4 stage quest and decides to sponsor it.
        await drawEventCard(driver);

        // P1 is asked but declines to sponsor
        await pressButton(driver, 'no_button');
        console.log("player 1 declines to sponsor quest");


        // P2 is asked and sponsors and then builds the 4 stages of the quest
        await pressButton(driver, 'yes_button');
        console.log("player 2 choose to sponsor quest");

        // Quest set up:
        // Player 2 enters cards to sponsor quest stage 1
        await playCards(driver, ["F5", "horse"]);
        // Player 2 enters cards to sponsor quest stage 2
        await playCards(driver, ["F15", "sword"]);
        // Player 2 enters cards to sponsor quest stage 3
        await playCards(driver, ["F15", "dagger", "axe"]);
        // Player 2 enters cards to sponsor quest stage 4
        await playCards(driver, ["F40", "axe"]);
        await checkCurrentPlayer("Player 2", driver);
        await pressButton(driver, 'end_turn_button');


        // P2 participates, draws an F30 – discards an F5
        // P3 participates, draws a Sword - discards an F5
        // P4 participates, draws an Axe - discards an F5
        await allPlayersParticipate(driver, ["F5", "F15", "F5"]);

        // Stage 1:
        // P1 attack: Dagger + Sword => value of 15
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 1", driver);
        console.log("player 1 plays Dagger, Sword");
        await playCards(driver, ["Dagger", "Sword"]);
        console.log("player 1 finishes turn");

        // P3 attack: Sword + Dagger => value of 15
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Sword, Dagger");
        await playCards(driver, ["Sword", "Dagger"]);
        console.log("player 3 finishes turn");

        // P4 attack: Dagger + Horse => value of 15
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Dagger, Horse");
        await playCards(driver, ["Dagger", "Horse"]);
        console.log("player 4 finishes turn");
        await pressButton(driver, 'end_turn_button');
        console.log("player 4 ends turn");

        await checkParticipants(driver, "1 3 4");
        console.log("Stage 1 complete");

        // Stage 2:
        console.log("Stage 2");
        // P1 is asked and decides to participate. P1 draws a F10
        // P3 is asked and decides to participate. P3 draws a Lance
        // P4 is asked and decides to participate. P4 draws a Lance
        await pressButton(driver, 'start_turn_button');
        console.log("Start button pressed")
        await checkCurrentPlayer("Player 1", driver);
        await playerParticipate(driver)

        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)

        console.log("All players participate in stage 2");
        await pressButton(driver, 'start_turn_button');


        // P1 sees their hand and builds an attack: Horse + Sword => value of 20
        await checkCurrentPlayer("Player 1", driver);
        console.log("player 1 plays Horse, Sword");
        await playCards(driver, ["Horse", "Sword"]);
        console.log("player 1 finishes turn");

        // P3 sees their hand and builds an attack: Axe + Sword => value of 25
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Axe, Sword");
        await playCards(driver, ["Axe", "Sword"]);
        console.log("player 3 finishes turn");

        // P4 sees their hand and builds an attack: Horse + Axe=> value of 25
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Horse, Axe");
        await playCards(driver, ["Horse", "Axe"]);
        console.log("player 4 finishes turn");
        await pressButton(driver, 'end_turn_button');
        console.log("player 4 ends turn");

        // P1’s attack is insufficient – P1 loses and cannot go to the next stage
        // • Assert P1 has no shields and their hand is F5 F10 F15 F15 F30 Horse Axe Axe Lance (displayed in this order)
        await checkPlayerHand(driver, "1", "F5 F10 F15 F15 F30 Horse Axe Axe Lance");
        await checkAllPlayersShields(driver, [0, 0, 0, 0]);

        // P3’s and P4’s attack are sufficient go onto the next stage
        await checkParticipants(driver, "3 4");
        console.log("Stage 2 complete");


        // Stage 3:
        await pressButton(driver, 'start_turn_button');

        // P3 is asked and decides to participate. P3 draws an Axe
        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        // P4 is asked and decides to participate. P4 draws a Sword
        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)

        console.log("All 3, 4 participate in stage 3");
        await pressButton(driver, 'start_turn_button');

        // P3 sees their hand and builds an attack: Lance + Horse + Sword => value of 40
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Lance, Horse, Sword");
        await playCards(driver, ["Lance", "Horse", "Sword"]);
        console.log("player 3 finishes turn");
        // P4 sees their hand and builds an attack: Axe + Sword + Lance => value of 45
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Axe, Sword, Lance");
        await playCards(driver, ["Axe", "Sword", "Lance"]);
        console.log("player 4 finishes turn");

        // Resolution: P3’s and P4’s attack are sufficient go onto the next stage
        // All 2 participants discard the cards used for their attacks
        await pressButton(driver, 'end_turn_button');
        await checkParticipants(driver, "3 4");
        console.log("Stage 3 complete");



        // Stage 4:
        await pressButton(driver, 'start_turn_button');

        // P3 is asked and decides to participate.  P3 draws a F30
        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        // P4 is asked and decides to participate. P4 draws a Lance
        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)
        console.log("All 3, 4 participate in stage 4");

        await pressButton(driver, 'start_turn_button');

        // P3 sees their hand and builds an attack: Lance + Horse + Lance => value of 45
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Lance, Horse, Sword");
        await playCards(driver, ["Lance", "Horse", "Lance"]);
        console.log("player 3 finishes turn");
        // P4 sees their hand and builds an attack: Dagger + Sword + Lance + Excalibur => value of 45
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Axe, Sword, Lance");
        await playCards(driver, ["Dagger", "Sword", "Lance", "Excalibur"]);
        console.log("player 4 finishes turn");

        // Resolution: P3’s and P4’s attack are sufficient go onto the next stage
        // All 2 participants discard the cards used for their attacks
        await pressButton(driver, 'end_turn_button');
        await checkParticipants(driver, "4");
        console.log("Stage 4 complete");

        await pressButton(driver, 'end_turn_button');
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 2", driver);
        await discardCards(driver, ["F5", "F10"]);
        console.log("player 1 discards F5, F10");


        await checkPlayerHand(driver, "3", "F5 F5 F15 F30 Sword");
        await checkPlayerHand(driver, "4", "F15 F15 F40 Lance");

        await checkAllPlayersShields(driver, [0, 0, 0, 4]);



        await pressButton(driver, 'restart_button');
        console.log("test scenario_0_winner_quest completed")

        // P2 discards all 9 cards used in the quest and draws 9+4 = 13 random cards and then
        // trims down to 12 cards. It does not matter which cards are selected to discard.
        // • assert P2 has 12 cards in hand
        // TODO: IMPORTANT check number cards in P2 has 12 cards in hand




        console.log("test scenario_A_TEST_JP completed")
        return

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

        await pressButton(driver, '1winner_game_with_events_button');


        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");

        let startTurnButton = await getElementById(driver, 'start_turn_button');
        await startTurnButton.click();
        console.log("Turn started successfully.");
        await driver.sleep(500)

        // PP1 draws a 2 stage quest and decides to sponsor it.
        await drawEventCard(driver);

        // NOTE: player 1 choose to sponsor quest
        let yes_button = await getElementById(driver, 'yes_button');
        await yes_button.click();
        console.log("player 1 choose to sponsor quest");
        await driver.sleep(1000)


        // Player 1 enters cards to sponsor quest stage 1
        await playCards(driver, ["F50", "dagger", "sword", "horse", "axe", "lance"]);
        // Player 1 enters cards to sponsor quest stage 2
        await playCards(driver, ["F70", "dagger", "sword", "horse", "axe", "lance"]);
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
    console.log("scenario_A_TEST_JP");

    try {
        await driver.get('http://127.0.0.1:8080/');
        await driver.sleep(1000)

        await pressButton(driver, 'A_TEST_JP_button');

        let playerNumber = await getElementById(driver, 'player-number')
        assert((await playerNumber.getText()).includes("start your turn"), "Player number is not displayed correctly");
        console.log("Game started successfully.");


        await pressButton(driver, 'start_turn_button');


        // P1 draws a 4 stage quest and decides to sponsor it.
        await drawEventCard(driver);

        // P1 is asked but declines to sponsor
        await pressButton(driver, 'no_button');
        console.log("player 1 declines to sponsor quest");


        // P2 is asked and sponsors and then builds the 4 stages of the quest
        await pressButton(driver, 'yes_button');
        console.log("player 2 choose to sponsor quest");

        // Quest set up:
        // Player 2 enters cards to sponsor quest stage 1
        await playCards(driver, ["F5", "horse"]);
        // Player 2 enters cards to sponsor quest stage 2
        await playCards(driver, ["F15", "sword"]);
        // Player 2 enters cards to sponsor quest stage 3
        await playCards(driver, ["F15", "dagger", "axe"]);
        // Player 2 enters cards to sponsor quest stage 4
        await playCards(driver, ["F40", "axe"]);
        await checkCurrentPlayer("Player 2", driver);
        await pressButton(driver, 'end_turn_button');


        // P2 participates, draws an F30 – discards an F5
        // P3 participates, draws a Sword - discards an F5
        // P4 participates, draws an Axe - discards an F5
        await allPlayersParticipate(driver, ["F5", "F15", "F5"]);

        // Stage 1:
        // P1 attack: Dagger + Sword => value of 15
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 1", driver);
        console.log("player 1 plays Dagger, Sword");
        await playCards(driver, ["Dagger", "Sword"]);
        console.log("player 1 finishes turn");

        // P3 attack: Sword + Dagger => value of 15
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Sword, Dagger");
        await playCards(driver, ["Sword", "Dagger"]);
        console.log("player 3 finishes turn");

        // P4 attack: Dagger + Horse => value of 15
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Dagger, Horse");
        await playCards(driver, ["Dagger", "Horse"]);
        console.log("player 4 finishes turn");
        await pressButton(driver, 'end_turn_button');
        console.log("player 4 ends turn");

        await checkParticipants(driver, "1 3 4");
        console.log("Stage 1 complete");

        // Stage 2:
        console.log("Stage 2");
        // P1 is asked and decides to participate. P1 draws a F10
        // P3 is asked and decides to participate. P3 draws a Lance
        // P4 is asked and decides to participate. P4 draws a Lance
        await pressButton(driver, 'start_turn_button');
        console.log("Start button pressed")
        await checkCurrentPlayer("Player 1", driver);
        await playerParticipate(driver)

        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)

        console.log("All players participate in stage 2");
        await pressButton(driver, 'start_turn_button');


        // P1 sees their hand and builds an attack: Horse + Sword => value of 20
        await checkCurrentPlayer("Player 1", driver);
        console.log("player 1 plays Horse, Sword");
        await playCards(driver, ["Horse", "Sword"]);
        console.log("player 1 finishes turn");

        // P3 sees their hand and builds an attack: Axe + Sword => value of 25
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Axe, Sword");
        await playCards(driver, ["Axe", "Sword"]);
        console.log("player 3 finishes turn");

        // P4 sees their hand and builds an attack: Horse + Axe=> value of 25
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Horse, Axe");
        await playCards(driver, ["Horse", "Axe"]);
        console.log("player 4 finishes turn");
        await pressButton(driver, 'end_turn_button');
        console.log("player 4 ends turn");

        // P1’s attack is insufficient – P1 loses and cannot go to the next stage
        // • Assert P1 has no shields and their hand is F5 F10 F15 F15 F30 Horse Axe Axe Lance (displayed in this order)
        await checkPlayerHand(driver, "1", "F5 F10 F15 F15 F30 Horse Axe Axe Lance");
        await checkAllPlayersShields(driver, [0, 0, 0, 0]);

        // P3’s and P4’s attack are sufficient go onto the next stage
        await checkParticipants(driver, "3 4");
        console.log("Stage 2 complete");


        // Stage 3:
        await pressButton(driver, 'start_turn_button');

        // P3 is asked and decides to participate. P3 draws an Axe
        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        // P4 is asked and decides to participate. P4 draws a Sword
        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)

        console.log("All 3, 4 participate in stage 3");
        await pressButton(driver, 'start_turn_button');

        // P3 sees their hand and builds an attack: Lance + Horse + Sword => value of 40
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Lance, Horse, Sword");
        await playCards(driver, ["Lance", "Horse", "Sword"]);
        console.log("player 3 finishes turn");
        // P4 sees their hand and builds an attack: Axe + Sword + Lance => value of 45
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Axe, Sword, Lance");
        await playCards(driver, ["Axe", "Sword", "Lance"]);
        console.log("player 4 finishes turn");

        // Resolution: P3’s and P4’s attack are sufficient go onto the next stage
        // All 2 participants discard the cards used for their attacks
        await pressButton(driver, 'end_turn_button');
        await checkParticipants(driver, "3 4");
        console.log("Stage 3 complete");



        // Stage 4:
        await pressButton(driver, 'start_turn_button');

        // P3 is asked and decides to participate.  P3 draws a F30
        await checkCurrentPlayer("Player 3", driver);
        await playerParticipate(driver)

        // P4 is asked and decides to participate. P4 draws a Lance
        await checkCurrentPlayer("Player 4", driver);
        await playerParticipate(driver)
        console.log("All 3, 4 participate in stage 4");

        await pressButton(driver, 'start_turn_button');

        // P3 sees their hand and builds an attack: Lance + Horse + Lance => value of 45
        await checkCurrentPlayer("Player 3", driver);
        console.log("player 3 plays Lance, Horse, Sword");
        await playCards(driver, ["Lance", "Horse", "Lance"]);
        console.log("player 3 finishes turn");
        // P4 sees their hand and builds an attack: Dagger + Sword + Lance + Excalibur => value of 45
        await checkCurrentPlayer("Player 4", driver);
        console.log("player 4 plays Axe, Sword, Lance");
        await playCards(driver, ["Dagger", "Sword", "Lance", "Excalibur"]);
        console.log("player 4 finishes turn");

        // Resolution: P3’s and P4’s attack are sufficient go onto the next stage
        // All 2 participants discard the cards used for their attacks
        await pressButton(driver, 'end_turn_button');
        await checkParticipants(driver, "4");
        console.log("Stage 4 complete");

        await pressButton(driver, 'end_turn_button');
        await pressButton(driver, 'start_turn_button');
        console.log("Turn started successfully.");
        await checkCurrentPlayer("Player 2", driver);
        await discardCards(driver, ["F5", "F10"]);
        console.log("player 1 discards F5, F10");


        await checkPlayerHand(driver, "3", "F5 F5 F15 F30 Sword");
        await checkPlayerHand(driver, "4", "F15 F15 F40 Lance");

        await checkAllPlayersShields(driver, [0, 0, 0, 4]);



        await pressButton(driver, 'restart_button');
        console.log("test scenario_0_winner_quest completed")

        // P2 discards all 9 cards used in the quest and draws 9+4 = 13 random cards and then
        // trims down to 12 cards. It does not matter which cards are selected to discard.
        // • assert P2 has 12 cards in hand
        // TODO: IMPORTANT check number cards in P2 has 12 cards in hand


        console.log("test scenario_A_TEST_JP completed")
        return


    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
}

async function drawEventCard(driver) {
    await pressButton(driver, 'draw_card_button');
}

async function playCards(driver, cardForStage) {
    for (let card of cardForStage) {
        await playCard(driver, card)
    }
    let finish_button = await getElementById(driver, 'finish_button');
    await finish_button.click();
}

async function discardCards(driver, cardForStage) {
    for (let card of cardForStage) {
        await playCard(driver, card)
    }
    // let finish_button = await getElementById(driver, 'finish_button');
    // await finish_button.click();
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

async function allPlayersParticipate(driver, discardCards) {
    if (discardCards.length === 0) {
        await playerParticipate(driver)
        return
    }
    for (let card of discardCards) {
        await playerParticipateWithDiscard(driver, card)
    }
}

async function playerParticipateWithDiscard(driver, discardCard) {
    console.log("player chooses to participates");
    await pressButton(driver, 'yes_button');
    // Player participates, draws card, discards discardCard
    await pressButton(driver, 'draw_card_button');
    await playCard(driver, discardCard);
    await driver.sleep(500)
    console.log("player discards " + discardCard);
    await pressButton(driver, 'end_turn_button');
    console.log("player ends turn");
}

async function playerParticipate(driver) {
    console.log("player chooses to participates");
    await pressButton(driver, 'yes_button');
    // Player participates, draws card, discards discardCard
    await pressButton(driver, 'draw_card_button');
    await pressButton(driver, 'end_turn_button');
    console.log("player ends turn");
}

async function pressButton(driver, buttonId) {
    let button = await getElementById(driver, buttonId);
    await button.click();
    await driver.sleep(500)
}

async function getElementById(driver, id, timeout = 100000) {
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

// scenario_0_winner_quest() //.then(r => scenario_A_TEST_JP()); // FIXME: Incorrect player being displayed is "" should be "Player 1"
scenario_A_TEST_JP().then(r => console.log("test scenario_A_TEST_JP completed"));
// scenario_2winner_game_2winner_quest();
// scenario_1winner_game_with_events();
