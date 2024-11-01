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

    @When("P{int} draws a quest of {int} stages")
    public void pDrawsAQuestOfStages(int playerNumber, int numStages) {
        assertEquals(playerNumber, game.playerTurn + 1);
        game.startTurn();
        assertEquals("Q", game.eventCard.getType());
        assertEquals(numStages, game.eventCard.getValue());
    }

    @And("the cards have been distributed to the players for scenario 1")
    public void the_cards_have_been_distributed_to_the_players_for_scenario_1() {
        setInitialHands1(game);
        List<Card> eventCards = List.of(new Card(4, "Q", Card.CardType.EVENT));

        List<Card> adventureCards = Arrays.asList(
                new Card(20, "L", Card.CardType.ADVENTURE),
                new Card(30, "F", Card.CardType.ADVENTURE),
                new Card(10, "S", Card.CardType.ADVENTURE),
                new Card(15, "B", Card.CardType.ADVENTURE),
                new Card(20, "L", Card.CardType.ADVENTURE),
                new Card(20, "L", Card.CardType.ADVENTURE),
                new Card(10, "F", Card.CardType.ADVENTURE),
                new Card(15, "B", Card.CardType.ADVENTURE),
                new Card(10, "S", Card.CardType.ADVENTURE),
                new Card(30, "F", Card.CardType.ADVENTURE)
        );
        rigAdventureEventDeck(eventCards, adventureCards);

    }

    @Then("player {int} hand should be {string}")
    public void playerHandShouldBe(int playerNumber, String result) {
        System.out.println(game.getPlayer(playerNumber).handToString());
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

    }

    void rigInitialHands(Game game) {
        int[] values1 = {5, 5, 15, 15, 5, 10, 10, 10, 10, 15, 15, 20};
        String[] types1 = {"F", "F", "F", "F", "D", "S", "S", "H", "H", "B", "B", "L"};
        int[] values2 = {5, 5, 15, 15, 40, 5, 10, 10, 10, 15, 15, 30};
        String[] types2 = {"F", "F", "F", "F", "F", "D", "S", "H", "H", "B", "B", "E"};
        int[] values3 = {5, 5, 5, 15, 5, 10, 10, 10, 10, 10, 15, 20};
        String[] types3 = {"F", "F", "F", "F", "D", "S", "S", "S", "H", "H", "B", "L"};
        int[] values4 = {5, 15, 15, 40, 5, 5, 10, 10, 10, 15, 20, 30};
        String[] types4 = {"F", "F", "F", "F", "D", "D", "S", "H", "H", "B", "L", "E"};

        rigHand(game.players.get(0), values1, types1);
        rigHand(game.players.get(1), values2, types2);
        rigHand(game.players.get(2), values3, types3);
        rigHand(game.players.get(3), values4, types4);
        game.players.get(0).hand.sort();
        game.players.get(1).hand.sort();
        game.players.get(2).hand.sort();
        game.players.get(3).hand.sort();
    }

    void rigHand(Player p, int[] values, String[] types) {

        for (int i = 0; i < 12; i++) {
            game.adventureDeck.add(p.hand.drawCard());
        }

        for (int i = 0; i < 12; i++) {
            p.addCard(game.adventureDeck.removeCard(new Card(values[i], types[i], Card.CardType.ADVENTURE)));
        }
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

    @And("ask players for sponsorship:")
    public void askPlayersForSponsorship(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.requestSponsorships();
    }

    @And("ask players to participate {string}:")
    public void askPlayersToParticipate(String players, List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.participateInQuest();
        assertEquals(players, game.quest.stages.get(game.quest.currentStage).participants.toString());
    }

    @And("ask sponsor for cards:")
    public void askSponsorForCards(List<String> data) {
        when(input.nextLine()).thenAnswer(AdditionalAnswers.returnsElementsOf(data));
        game.sponsorSetsUpQuest();
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
}
