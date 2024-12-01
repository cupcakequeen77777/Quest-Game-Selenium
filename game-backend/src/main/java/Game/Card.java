package Game;

import java.util.Objects;

public class Card {
    public enum CardType {
        ADVENTURE,
        EVENT
    }

    int cardValue;
    String type;
    CardType cardType;

    public Card(int value, String t, CardType c) {
        cardValue = value;
        type = t;
        cardType = c;
    }

    public Card(String str, CardType c) {
        str = str.trim();
        str = str.toUpperCase();
        if (str.equals("Dagger".toUpperCase())) {
            type = "D";
            cardValue = 5;
        } else if (str.equals("Horse".toUpperCase())) {
            type = "H";
            cardValue = 10;
        } else if (str.equals("Sword".toUpperCase())) {
            type = "S";
            cardValue = 10;
        } else if (str.equals("Axe".toUpperCase())) {
            type = "B";
            cardValue = 15;
        } else if (str.equals("Lance".toUpperCase())) {
            type = "L";
            cardValue = 20;
        } else if (str.equals("Excalibur".toUpperCase())) {
            type = "E";
            cardValue = 30;
        } else if (str.equals("Plague".toUpperCase())) {
            type = "E";
            cardValue = 1;
        } else if (str.equals("Queen’s favor".toUpperCase())) {
            type = "E";
            cardValue = 2;
        } else if (str.equals("Prosperity".toUpperCase())) {
            type = "E";
            cardValue = 3;
        } else {
            cardValue = Integer.parseInt(str.substring(1));
            type = str.substring(0, 1).toUpperCase();
        }
        cardType = c;
    }

    public int getValue() {
        return cardValue;
    }

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        if (cardType.equals(CardType.EVENT))
            if (type.equals("E")) {
                if (cardValue == 1) {
                    return "Plague";
                } else if (cardValue == 2) {
                    return "Queen’s favor";
                } else {
                    return "Prosperity";
                }
            } else {
                return type + cardValue;
            }
        if (isFoe()) {
            return type + cardValue;
        }
        switch (type) {
            case "D" -> {
                return "Dagger";
            }
            case "H" -> {
                return "Horse";
            }
            case "S" -> {
                return "Sword";
            }
            case "B" -> {
                return "Axe";
            }
            case "L" -> {
                return "Lance";
            }
            case "E" -> {
                return "Excalibur";
            }
        }

        return "";
    }

    public int typeValue() {
        if (cardType.equals(CardType.ADVENTURE)) {
            return switch (type) {
                case "F" -> 0;
                case "D" -> 1;
                case "S" -> 2;
                case "H" -> 3;
                case "B" -> 4;
                case "L" -> 5;
                case "E" -> 6;
                default -> -1;
            };
        }
        return -1;
    }

    // Displaying the hand of a player means listing foes first in increasing order, then weapons, also in increasing order, with swords before horses.
    public int compare(Card card) {
        if (cardType == CardType.ADVENTURE && card.cardType == CardType.ADVENTURE) {
            if (typeValue() == 0 && card.typeValue() == 0) {
                return Integer.compare(cardValue, card.cardValue);
            }
            return Integer.compare(typeValue(), card.typeValue());
        } else if (cardType == CardType.EVENT && card.cardType == CardType.EVENT) {
            return 0;
        }
        throw new RuntimeException("Cards are of different types");
    }

    public boolean equals(Card card) {
        return cardValue == card.cardValue && type.equals(card.type);
    }

    public boolean isWeapon() {
        return !type.equals("F") && !type.equals("E") && !type.equals("Q");
    }

    public boolean isFoe() {
        return type.equals("F");
    }


}
