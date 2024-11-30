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
//        the_cards_have_been_distributed_to_the_players_Testing();
        distributeCardsFor2winner_game_2winner_quest();
    }

    public void distributeCardsFor2winner_game_2winner_quest() {
        List<String> events = Arrays.asList("Q4", "Q3");
        String[] P1 = {"F5", "F5", "F10", "F10", "F15", "F15", "D5", "H10", "H10", "B15", "B15", "L20"};
        String[] P2 = {"F40", "F50", "H10", "H10", "S10", "S10", "S10", "B15", "B15", "L20", "L20", "E30"};
        String[] P3 = {"F5", "F5", "F5", "F5", "D5", "D5", "D5", "H10", "H10", "H10", "H10", "H10"};
        String[] P4 = {"F50", "F70", "H10", "H10", "S10", "S10", "S10", "B15", "B15", "L20", "L20", "E30"};
        String[] cards = {"F5", "F40", "F10", "F10", "F30", "F30", "F15", "F15", "F20", "F5", "F10", "F15", "F15", "F20", "F20", "F20", "F20", "F25", "F25", "F30", "F5", "F5", "F15", "F15", "F25", "F25", "F20", "F20", "F25", "F30", "S10", "B15", "B15", "L20"};

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
        System.out.println(game.players.get(0).hand);
        System.out.println(game.players.get(1).hand);
        System.out.println(game.players.get(2).hand);
        System.out.println(game.players.get(3).hand);

    }

    public void the_cards_have_been_distributed_to_the_players_Testing() {
        setInitialHands1(game);

        List<Card> eventCards = Arrays.asList(
                new Card(4, "Q", Card.CardType.EVENT),
                new Card(4, "Q", Card.CardType.EVENT));
        Collections.reverse(eventCards);
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

    void setInitialHands1(Game game) {
        int[] values1 = {5, 5, 15, 15, 5, 10, 10, 10, 10, 15, 15, 20};
        String[] types1 = {"F", "F", "F", "F", "D", "S", "S", "H", "H", "B", "B", "L"};
        int[] values2 = {5, 5, 15, 15, 40, 5, 10, 10, 10, 15, 15, 30};
        String[] types2 = {"F", "F", "F", "F", "F", "D", "S", "H", "H", "B", "B", "E"};
        int[] values3 = {5, 5, 5, 15, 5, 10, 10, 10, 10, 10, 15, 20};
        String[] types3 = {"F", "F", "F", "F", "D", "S", "S", "S", "H", "H", "B", "L"};
        int[] values4 = {5, 15, 15, 40, 5, 5, 10, 10, 10, 15, 20, 30};
        String[] types4 = {"F", "F", "F", "F", "D", "D", "S", "H", "H", "B", "L", "E"};

        setHand(game.getPlayers().get(0), values1, types1);
        setHand(game.getPlayers().get(1), values2, types2);
        setHand(game.getPlayers().get(2), values3, types3);
        setHand(game.getPlayers().get(3), values4, types4);
        game.getPlayers().get(0).getHand().sort();
        game.getPlayers().get(1).getHand().sort();
        game.getPlayers().get(2).getHand().sort();
        game.getPlayers().get(3).getHand().sort();
    }

    void setHand(Player p, int[] values, String[] types) {
        for (int i = 0; i < 12; i++) {
            p.addCard(game.getAdventureDeck().removeCard(new Card(values[i], types[i], Card.CardType.ADVENTURE)));
        }
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

        System.out.println(eventDeck);
        System.out.println(adventureDeck);


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

