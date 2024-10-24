Feature: A1_scenario

  Scenario: Example
    Given rig a new game of Adventure starts
    When the cards have been distributed to the players
    Then player 1 hand should be "F5 F5 F15 F15 Dagger Sword Sword Horse Horse Axe Axe Lance "
    Then player 2 hand should be "F5 F5 F15 F15 F40 Dagger Sword Horse Horse Axe Axe Excalibur "
    Then player 3 hand should be "F5 F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance "
    Then player 4 hand should be "F5 F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Lance Excalibur "