package Game;

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

    public String toJson() {
        StringBuilder str = new StringBuilder();
        str.append("{\n");
        str.append("\"numStages\": ").append(numStages).append(",\n");
        str.append("\"isCompleted\": ").append(isCompleted).append(",\n");
        str.append("\"currentStage\": ").append(currentStage).append(",\n");
        str.append("\"sponsor\": ").append(sponsor).append(",\n");
        str.append("\"stages\": [");
        for (int i = 0; i < stages.size(); i++) {
            str.append(stages.get(i).toJson());
            if (i != stages.size() - 1) {
                str.append(", ");
            }
        }
        str.append("]\n");
        str.append("}\n");

        return str.toString();
    }
}

