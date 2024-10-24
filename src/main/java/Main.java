import java.io.PrintWriter;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        PrintWriter output = new PrintWriter(System.out);
        Game game = new Game(input, output);

        game.players.add(new Player(1));
        game.players.add(new Player(2));
        game.players.add(new Player(3));
        game.players.add(new Player(4));

        // Start game, decks are created, hands of the 4 players are set up with random cards
        game.InitializeAdventureDeck();
        game.InitializeEventDeck();
        game.adventureDeck.shuffle();
        game.eventDeck.shuffle();
        game.distributeCards();

        while (!game.checkForWinner()) {

            Card newCard = game.startTurn();


            if (newCard.type.equals("Q")) {

                Card quest = newCard;
                game.eventDeck.add(quest);
                game.eventCard = quest;


                if (game.requestSponsorships()) {

                    game.sponsorSetsUpQuest();

                    while (true) {

                        if (game.eligibleParticipants().isEmpty()) {
                            break;
                        }

                        game.participateInQuest();

                        if (game.quest.stages.get(game.quest.currentStage).participants.isEmpty()) {
                            break;
                        }

                        game.handleParticipantAttacks();
                        game.resolveStage();
                        if (game.quest.currentStage >= game.quest.numStages || game.quest.stages.get(game.quest.currentStage).participants.isEmpty()) {
                            break;
                        }
                    }
                }
            }

        }
        game.print("Winners: " + game.getWinners());
    }


}
