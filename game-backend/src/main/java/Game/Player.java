package Game;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Scanner;


public class Player {
    public int playerNumber;
    Deck hand;
    final int MAX_CARDS = 12;
    public int shields;
    boolean sponsor = false;
    public Deck attack;
    public int attackValue;

    public Player(int playerNumber) {
        this.playerNumber = playerNumber;
        hand = new Deck(MAX_CARDS);
        shields = 0;
        attack = new Deck(MAX_CARDS);
    }

    public Deck getHand() {
        return hand;
    }

    public boolean hasWon() {
        return shields >= 7;
    }

    public void setShields(int shields) {
        this.shields = shields;
    }

    public void plague() {
        shields = shields - 2;
        if (shields < 0) {
            shields = 0;
        }
    }

    public void addCard(Card card) {
        hand.add(card);
        hand.deck.removeAll(Arrays.asList("", null));
        if (hand.size() > 1) {
            hand.sort();
        }
    }

    public Card removeCard(int index) {
        return hand.removeCard(index);
    }

    public int numberToTrim() {
        if (hand.size() > MAX_CARDS) {
            return hand.size() - MAX_CARDS;
        }
        return 0;
    }

    public String toString() {
        return playerNumber + "";
    }

    public String toJson() {
        return "{\"playerNumber\":" + playerNumber + ",\"shields\":" + shields + ",\"hand\":\"" + hand.toJson() + "\"}";
    }

    public int setupAttack(Scanner input, PrintWriter output) {
        output.print("Game.Player " + playerNumber + " set up your attack.\n");
        output.flush();

        while (true) {
            output.print(handToString() + "\n");
            output.flush();
            output.print("Select cards for the stage attack: ");
            output.flush();
            String userInput = input.nextLine();
            output.print(userInput + "\n");
            output.flush();
            if (userInput.equalsIgnoreCase("quit")) {
                break;
            }
            int cardIndex;
            try {
                cardIndex = Integer.parseInt(userInput);
            } catch (NumberFormatException a) {
                continue;
            }

            if (cardIndex >= 0 && cardIndex < hand.size()) {
                Card card = hand.removeCard(cardIndex);
                // Validate card type (foe or weapon) and uniqueness within the stage
                if (isValidAttackCard(card)) {
                    attack.add(card);
                    output.print("Selected: " + card + "\n");
                    output.flush();
                } else {
                    output.print("Invalid card selection.\n");
                    output.flush();
                }
            } else {
                output.print("Invalid card index.\n");
                output.flush();
            }
        }

        // Calculate total attack value based on attackDeck
        attackValue = calculateAttackValue(attack);
        output.print("Your attack value is " + attackValue + "\n");
        output.flush();

        return attackValue;

    }


    public boolean isValidAttackCard(Card card) {
        if (card == null || card.isFoe()) {
            return false;
        }
        for (Card a : attack.getDeck()) {
            if (a.equals(card)) {
                return false;
            }
        }
        return true;
    }

    private int calculateAttackValue(Deck attackDeck) {
        int totalValue = 0;
        for (Card card : attackDeck.getDeck()) {
            totalValue += card.getValue();
        }
        return totalValue;
    }

    public String handToString() {
        StringBuilder builder = new StringBuilder();
        for (Card card : hand.getDeck()) {
            builder.append(card).append(" ");
        }
        return builder.toString();
    }


}
