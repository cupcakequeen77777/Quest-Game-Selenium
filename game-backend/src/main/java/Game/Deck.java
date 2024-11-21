package Game;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.annotations.Expose;

import java.util.*;

public class Deck {
    @Expose
    public ArrayList<Card> deck;
    private final int cardLimit;

    public Deck(int cardLimit) {
        this.cardLimit = cardLimit;
        deck = new ArrayList<>(cardLimit);
    }

    public Deck(ArrayList<Card> d) {
        this.cardLimit = 100;
        deck = d;
    }

    public Deck() {
        this.cardLimit = 100;
        deck = new ArrayList<>();
    }

    public ArrayList<Card> getDeck() {
        return deck;
    }

    public boolean isEmpty() {
        return deck.isEmpty();
    }

    public Card getCard(int i) {
        return deck.get(i);
    }

    public Card removeCard(Card x) {
        for (int i = 0; i < deck.size(); i++) {
            if (deck.get(i).equals(x)) {
                return deck.remove(i);
            }
        }
        throw new RuntimeException("Couldn't find card " + x.type + x.cardValue + " to remove");
    }

    public Card removeCard(int index) {
        return deck.remove(index);
    }

    public Deck removeAll() {
        Deck d = new Deck(cardLimit);
        d.deck = deck;
        deck = new ArrayList<>();
        return d;
    }

    public void add(Card card) {
        if (card != null) {
            if (card.cardValue != 1000) {
                deck.add(card);
            }
        }
    }

    public void addAll(Deck d) {
        deck.addAll(d.getDeck());
    }

    public Card drawCard() {
        return deck.remove(0);
    }

    public void shuffle() {
        Collections.shuffle(deck);
    }

    public void sort() {
        deck.sort(new CardComparator());
    }

    public int size() {
        deck.removeAll(Arrays.asList("", null));
        return deck.size();
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        for (Card card : getDeck()) {
            builder.append(card).append(" ");
        }
        return builder.toString();
    }

    public String toJson() {
        StringBuilder builder = new StringBuilder();
        for (Card card : getDeck()) {
            builder.append(card).append(" ");
        }
        return builder.toString();
    }

    static class CardComparator implements Comparator<Card> {
        @Override
        public int compare(Card c1, Card c2) {
            if (c1 == null) {
                return c2 == null ? 0 : 1; // Null is lower
            } else if (c2 == null) {
                return -1; // Non-null is higher
            } else {
                return c1.compare(c2);
            }
        }


    }

}
