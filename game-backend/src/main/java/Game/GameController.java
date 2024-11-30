package Game;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:8080")
public class GameController {

    Game game;

    public GameController() {
        game = new Game();
//        resetGame();
    }

    @PostMapping("/start")
    public void startGame() {
//        game.distributeCards();
        distributeCardsFor2winner_game_2winner_quest();
    }

    public void distributeCardsFor2winner_game_2winner_quest() {
        String[] events = {"Q4", "Q3"};
        String[] P1 = {"F5", "F5", "F10", "F10", "F15", "F15", "D5", "H10", "H10", "B15", "B15", "L20"};
        String[] P2 = {"F40", "F50", "H10", "H10", "S10", "S10", "S10", "B15", "B15", "L20", "L20", "E30"};
        String[] P3 = {"F5", "F5", "F5", "F5", "D5", "D5", "D5", "H10", "H10", "H10", "H10", "H10"};
        String[] P4 = {"F50", "F70", "H10", "H10", "S10", "S10", "S10", "B15", "B15", "L20", "L20", "E30"};
        String[] cards = {"F5", "F40", "F10", "F10", "F30", "F30", "F15", "F15", "F20", "F5", "F10", "F15", "F15",
                "F20", "F20", "F20", "F20", "F25", "F25", "F30", "F5", "F5", "F15", "F15", "F25", "F25", "F20",
                "F20", "F25", "F30", "S10", "B15", "B15", "L20"};

        distributeCardsForScenario(events, P1, P2, P3, P4, cards);

    }

    public void distributeCardsForScenario(String[] events, String[] P1, String[] P2, String[] P3, String[] P4, String[] cards) {
        List<String> adventures = new ArrayList<>(List.of());
        for (int i = 0; i < P1.length; i++) {
            adventures.add(P1[i]);
            adventures.add(P2[i]);
            adventures.add(P3[i]);
            adventures.add(P4[i]);
        }
        Collections.addAll(adventures, cards);
        List<Card> eventCards = new ArrayList<>(List.of());
        List<Card> adventureCards = new ArrayList<>(List.of());
        for (String event : events) {
            eventCards.add(new Card(event, Card.CardType.EVENT));
        }
        for (String adventure : adventures) {
            adventureCards.add(new Card(adventure, Card.CardType.ADVENTURE));
        }
        Collections.reverse(eventCards);
        Collections.reverse(adventureCards);
        rigAdventureEventDeck(eventCards, adventureCards);
        game.distributeCards();
        System.out.println(game.players.get(0).hand); // REMOVE
        System.out.println(game.players.get(1).hand); // REMOVE
        System.out.println(game.players.get(2).hand); // REMOVE
        System.out.println(game.players.get(3).hand); // REMOVE

    }

    private void rigAdventureEventDeck(List<Card> eventCards, List<Card> adventureCards) {
        Deck adventureDeck = game.getAdventureDeck();
        Deck eventDeck = game.getEventDeck();

        for (Card card : eventCards) {
            eventDeck.add(eventDeck.removeCard(card));
        }
        Collections.reverse(eventDeck.deck);

        for (Card card : adventureCards) {
            adventureDeck.add(adventureDeck.removeCard(card));
        }
        Collections.reverse(adventureDeck.deck);

        System.out.println(eventDeck); // REMOVE
        System.out.println(adventureDeck); // REMOVE

    }

    @GetMapping("/get-game-state")
    public String get_game_state() {
        return game.toGson();
    }

    @PostMapping("/play_turn")
    public String play_turn() {
        return game.players.get(game.playerTurn).hand.toString();
    }

    @PostMapping("/draw_event_card")
    public String draw_event_card() {
        Card newCard = game.drawEventCard();
        game.eventCard = newCard;
        if (newCard.type.equals("Q")) {
            game.quest = new Quest(newCard.cardValue);
        }
        return newCard.toString(); // Card that was drawn
    }

    @PostMapping("/draw_adventure_card")
    public String draw_adventure_card() {
        Card newCard = game.drawAdventureCard();
        game.players.get(game.playerTurn).addCard(newCard);
        return newCard.toString(); // Card that was drawn
    }

    @PostMapping("/queens_favor")
    public String queens_favor() {
        Card card1 = game.drawAdventureCard();
        game.players.get(game.playerTurn).addCard(card1);
        Card card2 = game.drawAdventureCard();
        game.players.get(game.playerTurn).addCard(card2);
        return card1.toString() + " " + card2; // Card that was drawn
    }

    @GetMapping("/next_turn")
    public int next_turn() {
        return game.nextTurn();
    }

    @GetMapping("/next_player")
    public int next_player() {
        return game.nextPlayer();
    }

    @PostMapping("/play_plague_card")
    public String play_plague_card() {
        game.players.get(game.playerTurn).plague();
        return "plague card played";
    }

    @PostMapping("/play_prosperity_card")
    public String play_prosperity_card() {
        Card card;
        for (Player player : game.players) {
            card = game.drawAdventureCard();
            player.addCard(card);

            card = game.drawAdventureCard();
            player.addCard(card);
            player.hand.sort();
        }
        return "prosperity card played";
    }

    @PostMapping("/decline_quest")
    public int decline_quest() {
        game.players.get(game.currentPlayer).sponsor = false;
        return game.currentPlayer;
    }

    @PostMapping("/accept_quest")
    public String accept_quest() {
        game.quest.sponsor = game.players.get(game.currentPlayer); // TODO: fix this!!!
        game.players.get(game.currentPlayer).sponsor = true;
        return "accept_quest";
    }


//
//    @PostMapping("/stand")
//    public String stand() {
//        while (dealer.getScore() < 17) {
//            dealer.addCard(deck.drawCard());
//        }
//
//        int playerScore = player.getScore();
//        int dealerScore = dealer.getScore();
//
//        if (dealerScore > 21 || playerScore > dealerScore) {
//            return "Player wins! Player score: " + playerScore + ", Dealer score: " + dealerScore;
//        } else if (playerScore < dealerScore) {
//            return "Dealer wins! Player score: " + playerScore + ", Dealer score: " + dealerScore;
//        } else {
//            return "It's a tie! Player score: " + playerScore + ", Dealer score: " + dealerScore;
//        }
//    }
//
//    private void resetGame() {
//        deck = new Deck();
//        deck.shuffleDeck();
//        player = new Player();
//        dealer = new Player();
//    }
}

