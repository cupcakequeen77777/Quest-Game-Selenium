package Game;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.annotations.Expose;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Scanner;

public class Game {

    final int numberTypesOfFoes = 10;
    @Expose
    final int numberPlayers = 4;
    @Expose
    int playerTurn = 0;
    @Expose
    int currentPlayer = 0;
    @Expose
    Card eventCard = null;
    @Expose
    Quest quest = null;
    public PrintWriter output;
    public Scanner input;

    @Expose
    Deck adventureDeck = new Deck(50);
    @Expose
    Deck eventDeck = new Deck(50);
    @Expose
    ArrayList<Player> players = new ArrayList<>(numberPlayers);
    @Expose
    public Deck adventureDiscardDeck = new Deck(50);
    @Expose
    public Deck eventDiscardDeck = new Deck(50);
    @Expose
    ArrayList<String> winners = new ArrayList<>(numberPlayers);

    ArrayList<Player> successfulParticipants = new ArrayList<>(numberPlayers);

    public Game() {
        input = new Scanner(System.in);
        output = new PrintWriter(System.out, true);
        players.add(new Player(1));
        players.add(new Player(2));
        players.add(new Player(3));
        players.add(new Player(4));

        // Start game, decks are created, hands of the 4 players are set up with random cards
        InitializeAdventureDeck();
        InitializeEventDeck();
        adventureDeck.shuffle();
        eventDeck.shuffle();
    }


    public Game(Scanner in, PrintWriter out) {
        input = in;
        output = out;
    }

    public void print(String str) {
        output.print(str);
        output.flush();
    }

    public Deck getAdventureDeck() {
        return adventureDeck;
    }

    public Deck getEventDeck() {
        return eventDeck;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public int getNumberTypesOfFoes() {
        return numberTypesOfFoes;
    }

    public int getNumberPlayers() {
        return numberPlayers;
    }

    public int getPlayerTurn() {
        return playerTurn;
    }

    public Card getEventCard() {
        return eventCard;
    }

    public Quest getQuest() {
        return quest;
    }

    public int GetAdventureDeckSize() {
        return adventureDeck.size();
    }

    public int GetNumberFoes() {
        return GetNumberOfType("F", adventureDeck);
    }

    public int GetNumberWeapons() {
        int count = 0;
        for (Card card : adventureDeck.getDeck()) {
            if (!Objects.equals(card.getType(), "F")) {
                count++;
            }
        }
        return count;
    }

    private int GetNumberOfType(String type, Deck deck) {
        int count = 0;
        for (Card card : deck.getDeck()) {
            if (Objects.equals(card.getType(), type)) {
                count++;
            }
        }
        return count;
    }

    public int GetEventDeckSize() {
        return eventDeck.size();
    }

    public int GetNumberQuestCards() {
        return GetNumberOfType("Q", eventDeck);
    }

    public int GetNumberEventCards() {
        return GetNumberOfType("E", eventDeck);
    }

    public void InitializeAdventureDeck() {
        Card newCard;
        int[] value = {5, 10, 15, 20, 25, 30, 35, 40, 50, 70};
        int[] numberFoes = {8, 7, 8, 7, 7, 4, 4, 2, 2, 1}; // of certain value
        int[] wValue = {5, 10, 10, 15, 20, 30};
        String[] wType = {"D", "H", "S", "B", "L", "E"};
        int[] numberWeapons = {6, 12, 16, 8, 6, 2}; // of certain value
        int numberWeaponTypes = 6;

        for (int i = 0; i < numberTypesOfFoes; i++) {
            for (int j = 0; j < numberFoes[i]; j++) {
                newCard = new Card(value[i], "F", Card.CardType.ADVENTURE);
                adventureDeck.add(newCard);

            }
        }

        for (int i = 0; i < numberWeaponTypes; i++) {
            for (int j = 0; j < numberWeapons[i]; j++) {
                newCard = new Card(wValue[i], wType[i], Card.CardType.ADVENTURE);
                adventureDeck.add(newCard);
            }
        }

    }

    public void InitializeEventDeck() {
        Card newCard;
        int[] value = {2, 3, 4, 5};
        int[] numberQuests = {3, 4, 3, 2}; // of certain value
        int numberTypesOfQuests = 4;

        for (int i = 0; i < numberTypesOfQuests; i++) {
            for (int j = 0; j < numberQuests[i]; j++) {
                newCard = new Card(value[i], "Q", Card.CardType.EVENT);
                eventDeck.add(newCard);
            }
        }

        int[] eValue = {1, 2, 3}; // of certain value
        int[] numberEvents = {1, 2, 2}; // of certain value
        int numberTypesOfEvents = 3;

        for (int i = 0; i < numberTypesOfEvents; i++) {
            for (int j = 0; j < numberEvents[i]; j++) {
                newCard = new Card(eValue[i], "E", Card.CardType.EVENT);
                eventDeck.add(newCard);
            }
        }

    }

    public void distributeCards() {
        int defaultNumCard = 12;
        for (int i = 0; i < defaultNumCard; i++) {
            players.get(0).hand.add(drawAdventureCard());
            players.get(1).hand.add(drawAdventureCard());
            players.get(2).hand.add(drawAdventureCard());
            players.get(3).hand.add(drawAdventureCard());
        }

        for (Player player : players) {
            player.hand.sort();
        }
    }

    public Card drawAdventureCard() {
        if (adventureDeck.isEmpty()) {
            adventureDeck.addAll(adventureDiscardDeck.removeAll());
            adventureDeck.shuffle();
        }
        return adventureDeck.drawCard();
    }

    public boolean checkForWinner() {
        for (Player player : players) {
            if (player.hasWon()) {
                print("Winners: " + getWinners());
                return true;
            }
        }
        return false;
    }

    public ArrayList<String> getListOfWinners() {
        ArrayList<String> winners = new ArrayList<>();
        for (Player player : players) {
            if (player.hasWon()) {
                winners.add(player.playerNumber + "");
            }
        }
        return winners;
    }

    public String getWinners() {
        winners = getListOfWinners();
        StringBuilder winner = new StringBuilder();
        if (!winners.isEmpty()) {
            print("End of game!\nWinners!\n");
            for (String s : winners) {
                winner.append(s).append(" ");
            }
        }
        print(winner.toString());
        return winner.toString();
    }

    public Card drawEventCard() {
        if (eventDeck.isEmpty()) {
            eventDeck.addAll(eventDiscardDeck.removeAll());
            eventDeck.shuffle();
        }
        return eventDeck.drawCard();
    }

    public void resolveEvent(Card newCard) {
        if (newCard.cardType == Card.CardType.ADVENTURE) {
            throw new RuntimeException("Drew adventure card!!!!!");
        }
        Player currentPlayer = players.get(playerTurn);
        Card card;
        switch (newCard.cardValue) {
            case 1: // Plague: current player loses 2 shields
                print("Lose 2 shields\n");
                currentPlayer.plague();
                nextTurn();
                break;
            case 2: // Queen’s favor: current player draws 2 adventure cards and possibly trims their hand (UC-03)
                print("Draw 2 adventure cards\n");
                card = drawAdventureCard();
                print("Drew: " + card + "\n");
                currentPlayer.addCard(card);
                card = drawAdventureCard();
                print("Drew: " + card + "\n");
                currentPlayer.addCard(card);
                currentPlayer.hand.sort();
                trimCards();
                break;
            case 3: // Prosperity: All players draw 2 adventure cards and each of them possibly trims their hand (UC-03)
                print("Everyone draws 2 adventure cards\n");
                for (Player player : players) {
                    card = drawAdventureCard();
                    print("Drew: " + card + "\n");
                    player.addCard(card);

                    card = drawAdventureCard();
                    print("Drew: " + card + "\n");
                    player.addCard(card);
                    player.hand.sort();
                    trimCards();
//                    nextPlayer();
                }

                break;

        }
        playerTurn = (playerTurn + 1) % numberPlayers;
    }


    public boolean requestSponsorships() {
        quest = new Quest(eventCard.cardValue);
        for (int i = 0; i < numberPlayers; i++) {
            print("Game.Quest of " + eventCard.cardValue + " stages\n");
            displayHand(playerTurn);

            while (true) {
                String prompt = "Game.Player " + ((playerTurn + 1) + " do you want to sponsor (y/N): ");
                String response = PromptInput(prompt);
                print(response + "\n");
                if (response.equalsIgnoreCase("n")) {
                    break;
                } else if (response.equalsIgnoreCase("y")) {
                    players.get(playerTurn).sponsor = true;
                    quest.sponsor = players.get(playerTurn);
                    return true;
                }
            }

            playerTurn = nextTurn();

        }
        eventDiscardDeck.add(eventCard);
        quest = null;

        return false;// Continue this process until a player agrees to sponsor or all players decline.
    }


    public int nextPlayer() {
        currentPlayer = (currentPlayer + 1) % numberPlayers;
        return currentPlayer;
    }

    public int nextTurn() {
        playerTurn = (playerTurn + 1) % numberPlayers;
        currentPlayer = playerTurn;
        return playerTurn;
    }

    public Card startTurn() {
        print("Current player: " + players.get(playerTurn).playerNumber + "\n");

        Card newCard = drawEventCard();
        print("Drew: " + newCard + "\n");
        eventCard = newCard;
        switch (newCard.type) {
            case "E":
                resolveEvent(newCard);
                eventDiscardDeck.add(eventCard);
                break;
            case "Q":
                break;
        }
        return newCard;
    }

    public String PromptInput(String prompt) {
        print(prompt);
        return input.nextLine();
    }

    public int readCardInput(String input) {
        int cardIndex = -1;
        try {
            cardIndex = Integer.parseInt(input);
        } catch (NumberFormatException a) {
        }
        return cardIndex;
    }

    public void trimCards() {
        for (Player player : players) {
            int count = player.numberToTrim();
//            if (count > 0) {

            for (int i = 0; i < count; i++) {
                while (true) {
                    print("Game.Player " + player.playerNumber + " need to discard " + (count - i) + " cards\n");
                    displayHand(playerTurn);
                    String userInput = PromptInput("Choose a card to discard: ");
                    print(userInput + "\n");

                    int cardIndex = -1;
                    try {
                        cardIndex = Integer.parseInt(userInput);
                    } catch (NumberFormatException a) {
                        print("\nInvalid card index.\n");
                        continue;
                    }

                    if (cardIndex >= 0 && cardIndex < player.hand.size()) {
                        Card card = player.removeCard(cardIndex);
                        // Validate card type (foe or weapon) and uniqueness within the stage
                        if (card != null) {
                            print("Discard " + card + "\n");
                            adventureDiscardDeck.add(card);
                            break;
                        } else {
                            print("\nInvalid card selection.\n");
                        }
                    } else {
                        print("\nInvalid card index.\n");
                    }
                }
            }
            if (count > 0) {
                displayHand(player.playerNumber - 1);
                print("Press <Enter> to end your turn\n");
                input.nextLine();
                print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            }
        }

    }

    public void displayHand(int playerIndex) {
        print("Hand: " + players.get(playerIndex).handToString() + "\n");
    }

    public void sponsorSetsUpQuest() {
        Player sponsor = quest.sponsor;
        for (int i = 0; i < quest.numStages; i++) {
            buildStage(sponsor, i);
        }

        // Check if all stages are valid
        if (quest.stages.size() == quest.numStages) {
            // Game.Quest is ready to be resolved
            print("Game.Quest setup successful!\n");
        } else {
            print("Game.Quest setup failed: Insufficient stages.\n");
        }

        print(quest + "\n");

        nextPlayer();

    }

    public Stage buildStage(Player sponsor, int stageIndex) {
        Stage stage = new Stage();
        boolean stageIsValid = false;
        quest.addStage(stage);

        while (true) {
            displayHand(playerTurn);
            String userInput = PromptInput("Sponsor, choose a card for stage " + (stageIndex + 1) + "/" + quest.numStages + ": ");
            print(userInput);
            if (userInput.equalsIgnoreCase("quit") && stageIsValid) {
                print("\n\n");
                break;
            } else if (userInput.equalsIgnoreCase("quit")) {
                print("\nInsufficient value for this stage.\n");
                continue;
            }

            int cardIndex;
            try {
                cardIndex = Integer.parseInt(userInput);
            } catch (NumberFormatException a) {
                print("\nInvalid card index.\n");
                continue;
            }

            if (cardIndex >= 0 && cardIndex < sponsor.hand.size()) {
                Card card = sponsor.hand.removeCard(cardIndex);
                // Validate card type (foe or weapon) and uniqueness within the stage
                if (card != null && stage.isValidCard(card)) {
                    stage.addCard(card);
                    stage.value = stage.calculateValue();
                    print("\nSelected: " + card + "\n\n");
                    if (quest.isStageValid(stageIndex)) {
                        stageIsValid = true;
                    }
                } else {
                    sponsor.hand.add(card);
                    print("\nInvalid card selection.\n");
                }
            } else {
                print("\nInvalid card index.\n");
            }
        }
        return stage;
    }

    public ArrayList<Player> eligibleParticipants() {
        ArrayList<Player> eligibleParticipants;
        if (quest.currentStage == 0) {
            eligibleParticipants = new ArrayList<>();
            for (Player player : players) {
                if (player.playerNumber - 1 != playerTurn) {
                    eligibleParticipants.add(player);
                }
            }
        } else {
            eligibleParticipants = quest.stages.get(quest.currentStage).participants;
        }
        print("Eligible Participants: " + eligibleParticipants + "\n");
        quest.stages.get(quest.currentStage).participants = eligibleParticipants;
        return eligibleParticipants;
    }

    public void participateInQuest() {
        eligibleParticipants();
        ArrayList<Player> participants = quest.stages.get(quest.currentStage).participants;
        ArrayList<Player> toRemove = new ArrayList<>();

        for (Player player : participants) {
            if (player.playerNumber != quest.sponsor.playerNumber) {
                print(player.handToString());
                while (true) {
                    String prompt = "\nGame.Player " + player.playerNumber + " do you want to participate in the quest (y/N): ";
                    String response = PromptInput(prompt);
                    print(response + "\n");
                    if (response.equalsIgnoreCase("n")) {
                        toRemove.add(player);
                        break;
                    } else if (response.equalsIgnoreCase("y")) {
                        Card card = drawAdventureCard();
                        print("\nDrew: " + card + "\n");
                        player.addCard(card);

                        print(player.handToString() + "\n");
                        break;
                    }
                }


            }
            nextPlayer();
        }
        trimCards();
        participants.removeAll(toRemove);
        quest.stages.get(quest.currentStage).participants = participants;
    }


    public void handleParticipantAttacks() {
        ArrayList<Player> participants = quest.stages.get(quest.currentStage).participants;

        for (Player participant : participants) {
            participant.attackValue = participant.setupAttack(input, output);
            print("Press <Enter> to end your turn\n");
            input.nextLine();
            print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        }

    }

    public ArrayList<Integer> resolveStageAttack() {
        ArrayList<Integer> participants = new ArrayList<>();
        System.out.println(quest); // REMOVE
        System.out.println("Stage value: " + quest.stages.get(quest.currentStage).value);

        for (int i = 0; i < quest.stages.get(quest.currentStage).participants.size(); i++) {
            Player participant = quest.stages.get(quest.currentStage).participants.get(i);
            // participants with an attack equal or greater to the value of the current stage are eligible for the next stage
            System.out.println("Checking if Player " + participant.playerNumber + " has completed the stage");
            System.out.println("Player " + participant.playerNumber + " has an attack value of " + participant.calculateAttackValue());

            if (participant.calculateAttackValue() >= quest.stages.get(quest.currentStage).value) {
                // If this is the last stage, they are winners of this quest and earn as many shields as there are stages to this quest.
                if (quest.numStages - 1 == quest.currentStage) {
                    participant.shields += quest.numStages;
                    participant.sponsor = false;
                }
                successfulParticipants.add(participant);
                participants.add(participant.playerNumber);
                System.out.println("Player " + participant.playerNumber + " has completed the stage");
            }
            adventureDiscardDeck.addAll(participant.attack);
            participant.attack.removeAll();
            participant.attackValue = 0;
        }
//        if (quest.currentStage < quest.numStages - 1) {
//            return successfulParticipants;
//            quest.stages.get(quest.currentStage + 1).participants = successfulParticipants;
//        }

        return participants;
    }

    public String resolveQuest() {
        Player sponsor = players.get(quest.sponsor.playerNumber - 1);
        if (quest.numStages - 1 == quest.currentStage || successfulParticipants.isEmpty()) {
            print("Quest completed by players: " + successfulParticipants + "\n");
            // draws the same number of cards + the number of stages, and then possibly trims their hand
            System.out.println("Sponsor hand before: " + sponsor.hand); // REMOVE
            for (int i = 0; i < quest.countCardsUsed() + quest.numStages; i++) {
                sponsor.addCard(adventureDeck.drawCard());
            }
            sponsor.hand.sort();
            System.out.println("Sponsor hand after: " + sponsor.hand); // REMOVE
            for (Stage stage : quest.stages) {
                adventureDiscardDeck.add(stage.foeCard);
                stage.foeCard = null;
                adventureDiscardDeck.addAll(stage.weaponCards);
                stage.weaponCards.removeAll();
            }
            eventDiscardDeck.add(eventCard);
            eventCard = null;
            quest = null;
            return "" + successfulParticipants;
        }
        quest.currentStage++;
        print("Players continuing the quest: " + quest.stages.get(quest.currentStage - 1).participants + "\n");
        return "" + quest.stages.get(quest.currentStage - 1).participants;
    }

    public String resolveStage() {
        if (quest.numStages - 1 == quest.currentStage) {
            quest.stages.add(new Stage());
        }

        resolveStageAttack();

        if (quest.numStages - 1 == quest.currentStage || quest.stages.get(quest.currentStage + 1).participants.isEmpty()) {
//            print("Game.Quest completed by players: " + quest.stages.get(quest.currentStage + 1).participants + "\n");
            // draws the same number of cards + the number of stages, and then possibly trims their hand
            for (int i = 0; i < quest.countCardsUsed() + quest.numStages; i++) {
                quest.sponsor.addCard(adventureDeck.drawCard());
            }
            quest.sponsor.hand.sort();
            trimCards();
            for (Stage stage : quest.stages) {
                adventureDiscardDeck.add(stage.foeCard);
                stage.foeCard = null;
                adventureDiscardDeck.addAll(stage.weaponCards);
                stage.weaponCards.removeAll();
            }
            eventDiscardDeck.add(eventCard);
            eventCard = null;
            quest = null;
            playerTurn = nextTurn();
            return "" + quest.stages.get(quest.currentStage).participants;
        }
        quest.currentStage++;
        print("Players continuing the quest: " + quest.stages.get(quest.currentStage).participants + "\n");
        return "" + quest.stages.get(quest.currentStage).participants;
    }

    public Player getPlayer(int playerNumber) {
        return players.get(playerNumber - 1);
    }

    public String toGson() {
        Gson gson = new GsonBuilder()
                .excludeFieldsWithoutExposeAnnotation()
                .serializeNulls()
                .setPrettyPrinting()
                .create();
        String jsonString = gson.toJson(this);

        JsonObject jsonObject = gson.fromJson(jsonString, JsonObject.class);
        jsonObject.addProperty("adventureDeck", adventureDeck.toJson());
        jsonObject.addProperty("eventDeck", eventDeck.toJson());
        jsonObject.addProperty("eventDeck", eventDeck.toJson());
        jsonObject.addProperty("adventureDiscardDeck", adventureDiscardDeck.toJson());
        jsonObject.addProperty("eventDiscardDeck", eventDiscardDeck.toJson());
        jsonObject.addProperty("players", toJson(players));
        if (eventCard != null) {
            jsonObject.addProperty("eventCard", eventCard.toString());
        }
        // TODO: Implement toJson for Quest
        if (quest != null) {
            jsonObject.addProperty("quest", quest.toJson());
        }
        return gson.toJson(jsonObject);
    }

    private String toJson(ArrayList<Player> players) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (Player player : players) {
            sb.append(player.toJson()).append(",");
        }
        sb.deleteCharAt(sb.length() - 1);
        sb.append("]");

        return sb.toString();
    }
}
