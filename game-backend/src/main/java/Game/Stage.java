package Game;

import com.google.gson.Gson;

import java.util.ArrayList;

public class Stage {
    Card foeCard;
    Deck weaponCards;
    int value;
    public ArrayList<Player> participants;

    public Stage() {
        foeCard = null;
        weaponCards = new Deck(20);
        value = 0;
        participants = new ArrayList<>();
    }

    public void addCard(Card card) {
        if (isValidCard(card)) {
            if (foeCard == null && card.isFoe()) {
                foeCard = card;
            } else if (card.isWeapon()) {
                weaponCards.add(card);
                weaponCards.sort();
            } else {
                // Handle invalid card type
                throw new IllegalArgumentException("Invalid card type: " + card.type + card.cardValue);
            }
            calculateValue();
        } else {
            // Handle invalid card (e.g., duplicate)
            throw new IllegalArgumentException("Invalid card: " + card);
        }
    }

    public int getValue() {
        return value;
    }

    public boolean isValidCard(Card card) {
        // Check if the card is a foe or weapon
        if (!card.type.equals("F") && !card.isWeapon()) {
            return false;
        }

        // Check if the card is a duplicate
        if (foeCard != null && card.equals(foeCard)) {
            return false;
        }
        for (Card weapon : weaponCards.getDeck()) {
            if (card.equals(weapon)) {
                return false;
            }
        }

        return true;
    }

    public int calculateValue() {
        if (foeCard != null) {
            value = foeCard.getValue();
        }
        for (Card weapon : weaponCards.getDeck()) {
            value += weapon.getValue();
        }
        return value;
    }

    public boolean isComplete() {
        return foeCard != null;
    }


    public boolean isEmpty() {
        return value == 0;
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append(value);
        str.append("\n").append(foeCard).append(" ");
        for (Card weaponCard : weaponCards.getDeck()) {
            str.append(weaponCard.toString()).append(" ");
        }
        return str.toString();
    }

//    // Method to convert Stage object to JSON string
//    public String toJson() {
//        StringBuilder json = new StringBuilder();
//        String newFoeCard;
//        if (foeCard == null) {
//            newFoeCard = "null";
//        } else {
//            newFoeCard = foeCard.toString();
//        }
//        json.append("{");
//        json.append("\"foeCard\":\"").append(newFoeCard).append("\",");
//        json.append("\"weaponCards\":\"").append(weaponCards.toJson()).append("\",");
//        json.append("\"value\":\"").append(value).append("\",");
//        json.append("\"participants\":\"").append(participantsToJson());
//        json.append("\"}");
//        return json.toString();
//    }

    // Method to convert Stage object to JSON
    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }

    // Helper method to convert participants list to JSON
    private String participantsToJson() {
        StringBuilder json = new StringBuilder();
        json.append("[");
        for (int i = 0; i < participants.size(); i++) {
            json.append(participants.get(i).playerNumber);
            if (i < participants.size() - 1) {
                json.append(",");
            }
        }
        json.append("]");
        return json.toString();
    }


//    public String toJson() {
//        StringBuilder json = new StringBuilder();
//        String newFoeCard;
//        if (foeCard == null) {
//            newFoeCard = "null";
//        } else {
//            newFoeCard = foeCard.toString();
//        }
//        json.append("{");
//        json.append("\"foeCard\":\"").append(newFoeCard).append("\",");
//        json.append("\"weaponCards\":\"").append(weaponCards.toJson()).append("\",");
//        json.append("\"value\":\"").append(value).append("\"");
////                ",");
////        json.append("\"participants\":").append("\"[");
////        for (int i = 0; i < participants.size(); i++) {
////            json.append(participants.get(i).playerNumber);
////            if (i < participants.size() - 1) {
////                json.append(",");
////            }
////        }
////        json.append("]\"");
//        json.append("}");
//        return json.toString();
//    }
}
