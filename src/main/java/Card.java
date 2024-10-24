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
            if(typeValue()==0 && card.typeValue()==0){
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
