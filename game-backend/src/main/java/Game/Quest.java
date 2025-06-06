package Game;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class Quest {
    public List<Stage> stages;
    int numStages;
    boolean isCompleted;
    public int currentStage;
    public Player sponsor;

    public Quest(int numStages) {
        this.numStages = numStages;
        stages = new ArrayList<>(numStages);
        isCompleted = false;
        currentStage = 0;
        sponsor = null;
    }

    public void addStage(Stage stage) {
        if (stages.size() < numStages) {
            stages.add(stage);
        } else {
            throw new IllegalStateException("Cannot add more stages than the quest's maximum");
        }
    }


    public boolean isStageValid(int stageIndex) {
        if (stageIndex == 0 && stages.get(stageIndex).isComplete()) { // First stage
            return true; // Only check for non-emptiness
        } else if (stageIndex == 0) {
            return false;
        }
        return !stages.get(stageIndex).isEmpty() && stages.get(stageIndex).getValue() > stages.get(stageIndex - 1).getValue();
    }

    public int countCardsUsed() {
        int count = 0;
        for (Stage stage : stages) {
            count += stage.weaponCards.size() + 1; // number of weapon cards and one foe card per stage
        }
        return count;
    }

    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("-------------------\n");
        str.append("Game.Quest\n");

        int counter = 1;
        for (Stage stage : stages) {
            str.append("Game.Stage ").append(counter).append(": ").append(stage).append("\n");
            counter++;
        }
        str.append("-------------------\n");

        return str.toString();
    }

    // Method to convert Stage object to JSON
    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}

