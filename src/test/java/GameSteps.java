import io.cucumber.java.en.*;
import org.mockito.AdditionalAnswers;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GameSteps {
    private Game game;
    StringWriter output = new StringWriter();
    Scanner input = mock(Scanner.class);


    @Given("a new game of Adventure starts")
    public void a_new_game_of_adventure_starts() {
        game = new Game();
    }

    @Given("rig a new game of Adventure starts")
    public void rig_a_new_game_of_adventure_starts() {
        game = new Game(input, new PrintWriter(output));
        game.InitializeAdventureDeck();
        game.InitializeEventDeck();
        game.adventureDeck.shuffle();
        game.eventDeck.shuffle();
        game.players.add(new Player(1));
        game.players.add(new Player(2));
        game.players.add(new Player(3));
        game.players.add(new Player(4));
    }

    @And("P{int} starts their turn and draws {string}:")
    public void pStartsTheirTurnAndDraws(int playerNumber, String card, List<String> data) {
        assertEquals(playerNumber, game.playerTurn + 1);
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.startTurn();
        assertEquals(card, game.eventCard.toString());
    }

    @When("P{int} starts a quest of {int} stages")
    public void pStartsAQuestOfStages(int playerNumber, int numStages) {
        assertEquals("Q", game.eventCard.getType());
        assertEquals(numStages, game.eventCard.getValue());
    }

    @And("the cards have been distributed to the players for A1_scenario")
    public void the_cards_have_been_distributed_to_the_players_for_A1_scenario() {
        setInitialHands1(game);
        List<Card> eventCards = List.of(new Card(4, "Q", Card.CardType.EVENT));
        Card.CardType type = Card.CardType.ADVENTURE;
        List<Card> adventureCards = Arrays.asList(
                new Card(20, "L", type),
                new Card(30, "F", type),
                new Card(10, "S", type),
                new Card(15, "B", type),
                new Card(20, "L", type),
                new Card(20, "L", type),
                new Card(10, "F", type),
                new Card(15, "B", type),
                new Card(10, "S", type),
                new Card(30, "F", type)
        );
        rigAdventureEventDeck(eventCards, adventureCards);

    }

    @And("the cards have been distributed to the players for 0_winner_quest")
    public void the_cards_have_been_distributed_to_the_players_for_0_winner_quest() {
        setInitialHands1(game);
        List<Card> eventCards = List.of(new Card(2, "Q", Card.CardType.EVENT));
        Card.CardType type = Card.CardType.ADVENTURE;
        List<Card> adventureCards = Arrays.asList(
                new Card(20, "L", type),
                new Card(30, "F", type),
                new Card(10, "S", type),
                new Card(15, "B", type),
                new Card(20, "L", type),
                new Card(20, "L", type),
                new Card(10, "F", type),
                new Card(15, "B", type),
                new Card(10, "S", type),
                new Card(30, "F", type)
        );
        rigAdventureEventDeck(eventCards, adventureCards);

    }

    @And("the cards have been distributed to the players for 1winner_game_with_events")
    public void the_cards_have_been_distributed_to_the_players_for_1winner_game_with_events() {
        setInitialHands1(game);
        List<Card> eventCards = Arrays.asList(
                new Card(3, "Q", Card.CardType.EVENT),
                new Card(2, "E", Card.CardType.EVENT),
                new Card(3, "E", Card.CardType.EVENT),
                new Card(1, "E", Card.CardType.EVENT),
                new Card(4, "Q", Card.CardType.EVENT));
        Card.CardType a = Card.CardType.ADVENTURE;
        List<Card> adventureCards = Arrays.asList(
                new Card(70, "F", a),


                // 2nd quest: Q3
                // Stage 3
                new Card(15, "F", a), // player 3
                new Card(10, "S", a), // player 2
                // Stage 2
                new Card(20, "F", a),  // player 3
                new Card(10, "H", a),  // player 2
                // Stage 1
                new Card(20, "F", a), // player 4
                new Card(10, "S", a), // player 3
                new Card(10, "S", a), // player 2


                // P4 draws ‘Queen’s favor’
                new Card(10, "F", a),
                new Card(10, "F", a),

                // P3 draws Prosperity card
                // P4 cards drawn
                new Card(35, "F", a),
                new Card(35, "F", a),

                // P3 cards drawn
                new Card(5, "D", a),
                new Card(10, "H", a),
                // P2 cards drawn
                new Card(10, "S", a),
                new Card(10, "H", a),
                // P1 cards drawn
                new Card(20, "F", a),
                new Card(10, "F", a),


                // 1st quest: Q4
                // Cards P1 (sponsor) draws cards to replace those used in quest + number of stages
                new Card(50, "F", a),
                new Card(50, "F", a),
                new Card(35, "F", a),
                new Card(30, "F", a),
                new Card(20, "F", a),
                new Card(25, "F", a),
                new Card(25, "F", a),
                new Card(25, "F", a),
                new Card(25, "F", a),
                new Card(10, "F", a),
                new Card(10, "F", a),
                new Card(30, "F", a),

                // Stage 4
                new Card(10, "S", a), // player 4
                new Card(10, "H", a), // player 3
                new Card(20, "L", a), // player 2
                // Stage 3
                new Card(30, "F", a), // player 4
                new Card(10, "S", a), // player 3
                new Card(15, "B", a), // player 2
                // Stage 2
                new Card(20, "L", a), // player 4
                new Card(20, "L", a), // player 3
                new Card(10, "F", a), // player 2
                // Stage 1
                new Card(15, "B", a), // player 4
                new Card(10, "S", a), // player 3
                new Card(30, "F", a)  // player 2
        );
        rigAdventureEventDeck(eventCards, adventureCards);

    }

    @When("the cards have been distributed to the players for 2winner_game_2winner_quest")
    public void the_cards_have_been_distributed_to_the_players_for_2winner_game_2winner_quest() {
        setInitialHands2(game);
        List<Card> eventCards = Arrays.asList(
                new Card(3, "Q", Card.CardType.EVENT),
                new Card(4, "Q", Card.CardType.EVENT));
        Card.CardType a = Card.CardType.ADVENTURE;
        List<Card> adventureCards = Arrays.asList(
                new Card(70, "F", a),
                new Card(50, "F", a),

                // 2nd quest: Q3
                // Stage 3
                new Card(10, "S", a), // player 4
                new Card(20, "L", a), // player 2
                // Stage 2
                new Card(5, "F", a),  // player 4
                new Card(10, "S", a),  // player 2
                // Stage 1
                new Card(15, "B", a), // player 4
                new Card(10, "S", a), // player 2

                // 1st quest: Q4
                // Cards P1 (sponsor) draws cards to replace those used in quest + number of stages
                new Card(35, "F", a),
                new Card(35, "F", a),
                new Card(30, "F", a),
                new Card(30, "F", a),
                new Card(25, "F", a),
                new Card(25, "F", a),
                new Card(20, "F", a),
                new Card(20, "F", a),
                new Card(15, "F", a),
                new Card(15, "F", a),
                new Card(15, "F", a),
                new Card(10, "S", a),

                // Stage 4
                new Card(10, "H", a), // player 4
                new Card(15, "B", a), // player 2
                // Stage 3
                new Card(10, "S", a), // player 4
                new Card(15, "F", a), // player 2
                // Stage 2
                new Card(15, "F", a), // player 4
                new Card(5, "F", a), // player 2
                // Stage 1
                new Card(35, "F", a), // player 4
                new Card(5, "D", a), // player 3
                new Card(30, "F", a)  // player 2
        );
        rigAdventureEventDeck(eventCards, adventureCards);

    }

    @Then("player {int} hand should be {string}")
    public void playerHandShouldBe(int playerNumber, String result) {
        assertTrue(game.getPlayer(playerNumber).hand.size() < 13);
        assertEquals(result, game.getPlayer(playerNumber).handToString());
    }


    private void rigAdventureEventDeck(List<Card> eventCards, List<Card> adventureCards) {
        Deck adventureDeck = game.adventureDeck;
        Deck eventDeck = game.eventDeck;

        for (Card card : eventCards) {
            eventDeck.add(eventDeck.removeCard(card));
        }
        Collections.reverse(eventDeck.deck);

        for (Card card : adventureCards) {
            adventureDeck.add(adventureDeck.removeCard(card));
        }
        Collections.reverse(adventureDeck.deck);

        System.out.println(eventDeck);
        System.out.println(adventureDeck);


    }

    void setHand(Player p, int[] values, String[] types) {
        for (int i = 0; i < 12; i++) {
            p.addCard(game.adventureDeck.removeCard(new Card(values[i], types[i], Card.CardType.ADVENTURE)));
        }
    }

    void setInitialHands1(Game game) {
        int[] values1 = {5, 5, 15, 15, 5, 10, 10, 10, 10, 15, 15, 20};
        String[] types1 = {"F", "F", "F", "F", "D", "S", "S", "H", "H", "B", "B", "L"};
        int[] values2 = {5, 5, 15, 15, 40, 5, 10, 10, 10, 15, 15, 30};
        String[] types2 = {"F", "F", "F", "F", "F", "D", "S", "H", "H", "B", "B", "E"};
        int[] values3 = {5, 5, 5, 15, 5, 10, 10, 10, 10, 10, 15, 20};
        String[] types3 = {"F", "F", "F", "F", "D", "S", "S", "S", "H", "H", "B", "L"};
        int[] values4 = {5, 15, 15, 40, 5, 5, 10, 10, 10, 15, 20, 30};
        String[] types4 = {"F", "F", "F", "F", "D", "D", "S", "H", "H", "B", "L", "E"};

        setHand(game.players.get(0), values1, types1);
        setHand(game.players.get(1), values2, types2);
        setHand(game.players.get(2), values3, types3);
        setHand(game.players.get(3), values4, types4);
        game.players.get(0).hand.sort();
        game.players.get(1).hand.sort();
        game.players.get(2).hand.sort();
        game.players.get(3).hand.sort();
    }

    void setInitialHands2(Game game) {
        int[] values1 = {5, 10, 10, 10, 20, 20, 25, 25, 25, 10, 10, 15};
        String[] types1 = {"F", "F", "F", "F", "F", "F", "F", "F", "F", "H", "S", "B"};
        int[] values2 = {5, 5, 10, 10, 10, 10, 10, 10, 15, 15, 20, 30};
        String[] types2 = {"F", "D", "S", "S", "S", "S", "H", "H", "B", "B", "L", "E"};
        int[] values3 = {5, 5, 10, 15, 20, 25, 5, 5, 10, 10, 10, 15};
        String[] types3 = {"F", "F", "F", "F", "F", "F", "D", "D", "H", "H", "S", "B"};
        int[] values4 = {10, 25, 5, 5, 10, 10, 10, 15, 20, 20, 20, 30};
        String[] types4 = {"F", "F", "D", "D", "H", "H", "S", "B", "L", "L", "L", "E"};

        setHand(game.players.get(0), values1, types1);
        setHand(game.players.get(1), values2, types2);
        setHand(game.players.get(2), values3, types3);
        setHand(game.players.get(3), values4, types4);
        game.players.get(0).hand.sort();
        game.players.get(1).hand.sort();
        game.players.get(2).hand.sort();
        game.players.get(3).hand.sort();
    }

    @And("ask players for sponsorship:")
    public void askPlayersForSponsorship(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.requestSponsorships();

    }

    @And("ask players to participate, participants {string}:")
    public void askPlayersToParticipate(String players, List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.participateInQuest();
        assertEquals(players, game.quest.stages.get(game.quest.currentStage).participants.toString());
    }

    @And("ask sponsor for cards:")
    public void askSponsorForCards(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.sponsorSetsUpQuest();
        System.out.println(game.quest);

    }


    @And("quest sponsor is P{int}")
    public void questSponsorIsP(int playerNumber) {
        assertEquals(playerNumber, game.quest.sponsor.playerNumber);
    }

    @And("players attack with card selected:")
    public void playersAttack(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.handleParticipantAttacks();

    }


    @And("P{int} attack card\\(s) is {string} and attack value is {int}")
    public void pAttackCardsIsAndAttackValueIs(int playerNumber, String attackCards, int pAttack) {
        assertEquals(attackCards, game.players.get(playerNumber - 1).attack.toString());
        assertEquals(pAttack, game.players.get(playerNumber - 1).attackValue);
    }


    @And("resolve stage:")
    public void resolveStage(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.resolveStage();
    }


    @And("participant\\(s) eligible for next stage {string}")
    public void participantSEligibleForNextStage(String participants) {
        assertEquals(participants, game.quest.stages.get(game.quest.currentStage).participants.toString());
    }

    @And("P{int} has {int} shield\\(s)")
    public void pHasShieldS(int playerNumber, int shields) {
        assertEquals(shields, game.players.get(playerNumber - 1).shields);
    }

    @And("P{int} has {int} cards")
    public void pHasCards(int playerNumber, int numberCards) {
        assertEquals(numberCards, game.players.get(playerNumber - 1).getHand().size());
        System.out.println(game.adventureDeck);
    }

    @And("all adventure cards are accounted for")
    public void allAdventureCardsAreAccountedFor() {
        int count = game.adventureDeck.size() + game.adventureDiscardDeck.size() + game.players.get(0).hand.size() + game.players.get(1).hand.size() + game.players.get(2).hand.size() + game.players.get(3).hand.size();
        assertEquals(100, count);
    }

    @And("all event cards are accounted for")
    public void allEventCardsAreAccountedFor() {
        assertEquals(17, game.eventDeck.size() + game.eventDiscardDeck.size());
    }

    @And("quest is complete")
    public void questIsComplete() {
        assertNull(game.quest);
    }


    @And("Player\\(s) {string} is declared as the winner\\(s)")
    public void playerSIsDeclaredAsTheWinnerS(String winners) {
        game.checkForWinner();
        assertEquals(winners, game.getWinners());
    }
}
