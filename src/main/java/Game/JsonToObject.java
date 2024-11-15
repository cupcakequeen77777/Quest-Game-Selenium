package Game;

import com.google.gson.Gson;

public class JsonToObject {

    public static void main(String[] args) {
        // Creating object of Organisation
        Game game = new Game();

        System.out.println(game.toGson());

        // Converting json to object
//        game = getGameObject();

        // Displaying object
        System.out.println(game);
    }

    private static Game getGameObject() {
        // Storing preprocessed json(Added slashes)
        String GameJson =

                "{\"playerTurn\": 0, \"players\": [{\"playerNumber\": 0, \"shields\": 0, \"hand\": [{\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}], \"stages\": [{\"participants\": [], \"stageNumber\": 0}, {\"participants\": [], \"stageNumber\": 0}, {\"participants\": [], \"stageNumber\": 0}], \"numStages\": 0, \"currentStage\": 0}], \"playerNumber\": 0, \"shields\": 0, \"hand\": [{\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}, {\"cardNumber\": 0, \"name\": \"\", \"type\": \"ADVENTURE\"}], \"stages\": [{\"participants\": [], \"stageNumber\": 0}, {\"participants\": [], \"stageNumber\": 0}, {\"participants\": [], \"stageNumber\": 0}], \"numStages\": 0, \"currentStage\": 0}";        // Creating a Gson Object
        Gson gson = new Gson();

        // Converting json to object
        // first parameter should be preprocessed json
        // and second should be mapping class
        return gson.fromJson(GameJson, Game.class);
    }
}
