package Game;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:8080")
//@CrossOrigin(origins = "http://127.0.0.1:8081")
public class GameController {

//    private Deck deck;
//    private Player player;
//    private Player dealer;
    Game game;

    public GameController() {
        game = new Game();
//        resetGame();
    }

    @GetMapping("/start")
    public String startGame() {
//        resetGame();
//        player.addCard(deck.drawCard());
//        player.addCard(deck.drawCard());
//        dealer.addCard(deck.drawCard());
//        dealer.addCard(deck.drawCard());
//        return "Game started. Player score: " + player.getScore();
        game.distributeCards();

        return (game.playerTurn + 1) + "";
    }

//   @PostMapping("/get-current-player")
//    public String get_current_player() {
//        return (game.playerTurn + 1) + "";
//    }

    @PostMapping("/get-current-hand")
    public String get_current_hand() {
        return game.players.get(game.playerTurn).hand.toString();
    }

    @PostMapping("/start-turn")
    public String start_turn() {
        return game.players.get(game.playerTurn).hand.toString();
    }

    @PostMapping("/play_turn")
    public String play_turn() {

        return game.players.get(game.playerTurn).hand.toString();
    }

//    @PostMapping("/hit")
//    public String hit() {
//        player.addCard(deck.drawCard());
//        if (player.getScore() > 21) {
//            return "Bust! Player score: " + player.getScore();
//        }
//        return "Player hits. Current score: " + player.getScore();
//    }
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

