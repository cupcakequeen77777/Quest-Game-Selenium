package Game;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

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
        game.distributeCards();
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
        if(newCard.type.equals("Q")){
            game.quest = new Quest(newCard.cardValue);
        }
        return newCard.toString(); // Card that was drawn
    }

    @PostMapping("/draw_adventure_card")
    public String draw_adventure_card() {
        Card newCard = game.drawAdventureCard();
        game.players.get(game.playerTurn).hand.add(newCard);
        return newCard.toString(); // Card that was drawn
    }

    @PostMapping("/play_plague_card")
    public String play_plague_card() {
        game.players.get(game.playerTurn).plague();
        game.nextTurn();
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
        game.nextPlayer();
        if(game.currentPlayer == game.playerTurn){
            game.currentPlayer = game.nextTurn();
            return -1;
        }
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

