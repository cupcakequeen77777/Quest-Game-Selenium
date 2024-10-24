import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class TestDeck extends Deck {
    private ArrayList<Card> testCards;

    public TestDeck(ArrayList<Card> cards) {
        testCards = new ArrayList<>(cards);
    }


    @Override
    public Card drawCard() {
        return testCards.removeFirst();
    }
}
