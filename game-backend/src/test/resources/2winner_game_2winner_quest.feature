Feature: 2winner_game_2winner_quest

  Scenario: 2winner_game_2winner_quest
    Given rig a new game of Adventure starts

    When the cards have been distributed to the players for 2winner_game_2winner_quest
    And player 1 hand should be "F5 F10 F10 F10 F20 F20 F25 F25 F25 Sword Horse Axe "
    And player 2 hand should be "F5 Dagger Sword Sword Sword Sword Horse Horse Axe Axe Lance Excalibur "
    And player 3 hand should be "F5 F5 F10 F15 F20 F25 Dagger Dagger Sword Horse Horse Axe "
    And player 4 hand should be "F10 F25 Dagger Dagger Sword Horse Horse Axe Lance Lance Lance Excalibur "

    # • P1 draws a 4-stage quest and decides to sponsor it. P1 builds 4 stages, the first of which only has a foe and no weapon.
    And P1 starts their turn and draws "Q4":
      |  |
    And P1 starts a quest of 4 stages
    And ask players for sponsorship:
      | y |
    And quest sponsor is P1

    And ask sponsor for cards:
      | 1    |
      | quit |
      | 0    |
      | 7    |
      | quit |
      | 0    |
      | 6    |
      | quit |
      | 0    |
      | 5    |
      | quit |

    And player 1 hand should be "F20 F20 F25 F25 F25 "

#    Quest
#    Stage 1: 10
#    F10
#    Stage 2: 15
#    F5 Sword
#    Stage 3: 20
#    F10 Horse
#    Stage 4: 25
#    F10 Axe

    # • P2, P3 and P4 participate in stage 1 and build their attack.
    #    Stage 1
    #   P2 is asked and decides to participate – draws an F30 – discards an F5 (to trim down to 12 cards)
    #   P3 is asked and decides to participate – draws a Dagger - discards an F25 (to trim down to 12 cards)
    #   P4 is asked and decides to participate – draws an F35 - discards an F10 (to trim down to 12 cards)
    And ask players to participate, participants "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |
      | 0 |
      |   |
      | 5 |
      |   |
      | 0 |
      |   |

    And player 1 hand should be "F20 F20 F25 F25 F25 "
    And player 2 hand should be "F30 Dagger Sword Sword Sword Sword Horse Horse Axe Axe Lance Excalibur "
    And player 3 hand should be "F5 F5 F10 F15 F20 Dagger Dagger Dagger Sword Horse Horse Axe "
    And player 4 hand should be "F25 F35 Dagger Dagger Sword Horse Horse Axe Lance Lance Lance Excalibur "


    And players attack with card selected:
      | 2    |
      | quit |
      |      |
      | 5    |
      | quit |
      |      |
      | 5    |
      | quit |
      |      |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Sword " and attack value is 10
    And P3 attack card(s) is "Dagger " and attack value is 5
    And P4 attack card(s) is "Horse " and attack value is 10

    # • P2 and P4 have their attack win over this stage, whereas P3 loses.
    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 4]"

    And player 3 hand should be "F5 F5 F10 F15 F20 Dagger Dagger Sword Horse Horse Axe "

    # • P2 and P4 participate in and win stages 2, then 3 and then 4.
    # Stage 2:
    #    P2 is asked and decides to participate. P2 draws a F5
    #    P4 is asked and decides to participate. P4 draws a F15
    And ask players to participate, participants "[2, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F30 Dagger Sword Sword Sword Horse Horse Axe Axe Lance Excalibur "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Horse Axe Lance Lance Lance Excalibur "

    And players attack with card selected:
      | 3    |
      | 2    |
      | quit |
      |      |
      | 7    |
      | quit |
      |      |

    And P2 attack card(s) is "Sword Dagger " and attack value is 15
    And P4 attack card(s) is "Axe " and attack value is 15


    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 4]"

    # Stage 3:
    #    P2 is asked and decides to participate. P2 draws a F15
    #    P4 is asked and decides to participate. P4 draws a Sword
    And ask players to participate, participants "[2, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F15 F30 Sword Sword Horse Horse Axe Axe Lance Excalibur "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Sword Horse Lance Lance Lance Excalibur "

    And players attack with card selected:
      | 5    |
      | 4    |
      | quit |
      |      |
      | 8    |
      | quit |
      |      |

    And P2 attack card(s) is "Horse Sword " and attack value is 20
    And P4 attack card(s) is "Lance " and attack value is 20

    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 4]"




    # Stage 4:
    #    P2 is asked and decides to participate. P2 draws a Axe
    #    P4 is asked and decides to participate. P4 draws a Horse
    And ask players to participate, participants "[2, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F15 F30 Sword Horse Axe Axe Axe Lance Excalibur "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Sword Horse Horse Lance Lance Excalibur "

    And players attack with card selected:
      | 5    |
      | 3    |
      | quit |
      |      |
      | 11   |
      | quit |
      |      |

    And P2 attack card(s) is "Axe Sword " and attack value is 25
    And P4 attack card(s) is "Excalibur " and attack value is 30

    And player 2 hand should be "F5 F15 F30 Horse Axe Axe Lance Excalibur "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Sword Horse Horse Lance Lance "

    And resolve stage:
      | 0 |
    # Player 1 draws 4+7=11 cards to 16 cards and discards 4 cards
    And player 1 hand should be "F20 F20 F25 F25 F25 F25 F25 F30 F30 F35 F35 Sword "
    And player 2 hand should be "F5 F15 F30 Horse Axe Axe Lance Excalibur "
    And player 3 hand should be "F5 F5 F10 F15 F20 Dagger Dagger Sword Horse Horse Axe "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Sword Horse Horse Lance Lance "

    # • P2 and P4 each earn 4 shields.
    And P2 has 4 shield(s)
    And P4 has 4 shield(s)

    # • P2 draws a 3 stage quest and declines to sponsor it. P3 sponsors this quest and builds its stages.
    And P2 starts their turn and draws "Q3":
      |  |
    And P2 starts a quest of 3 stages

    And ask players for sponsorship:
      | n |
      | y |
    And quest sponsor is P3
    And ask sponsor for cards:
      | 0    |
      | quit |
      | 0    |
      | 3    |
      | quit |
      | 0    |
      | 2    |
      | quit |

#    Quest
#    Stage 1: 5
#    F5
#    Stage 2: 10
#    F5 Dagger
#    Stage 3: 15
#    F10 Dagger


    And player 3 hand should be "F15 F20 Sword Horse Horse Axe "

    # P2 and P4 participate in and win stages 1, 2 and 3.

    # Stage 1:
    # P1 declines to participate.
    # P2 is asked and decides to participate. P2 draws a Sword
    # P4 is asked and decides to participate. P4 draws a Axe
    And ask players to participate, participants "[2, 4]":
      | n |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F15 F30 Sword Horse Axe Axe Lance Excalibur "
    And player 4 hand should be "F15 F25 F35 Dagger Dagger Sword Sword Horse Horse Axe Lance Lance "

    And players attack with card selected:
      | 3    |
      | quit |
      |      |
      | 5    |
      | quit |
      |      |

    And P2 attack card(s) is "Sword " and attack value is 10
    And P4 attack card(s) is "Sword " and attack value is 10

    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 4]"

    # Stage 2:
    # P2 is asked and decides to participate. P2 draws a Sword
    # P4 is asked and decides to participate. P4 draws a F5
    And ask players to participate, participants "[2, 4]":
      | y |
      |   |
      | y |
      |   |
      | n |
      |   |

    And player 2 hand should be "F5 F15 F30 Sword Horse Axe Axe Lance Excalibur "
    And player 4 hand should be "F5 F15 F25 F35 Dagger Dagger Sword Horse Horse Axe Lance Lance "

    And players attack with card selected:
      | 5    |
      | quit |
      |      |
      | 6    |
      | 4    |
      | quit |
      |      |

    And P2 attack card(s) is "Axe " and attack value is 15
    And P4 attack card(s) is "Sword Dagger " and attack value is 15

    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 4]"

    # Stage 3:
    # P2 is asked and decides to participate. P2 draws a Lance
    # P4 is asked and decides to participate. P4 draws a Sword
    And ask players to participate, participants "[2, 4]":
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F15 F30 Sword Horse Axe Lance Lance Excalibur "
    And player 4 hand should be "F5 F15 F25 F35 Dagger Sword Horse Horse Axe Lance Lance "

    And players attack with card selected:
      | 8    |
      | quit |
      |      |
      | 9    |
      | 6    |
      | 5    |
      | 4    |
      | quit |
      |      |

    And P2 attack card(s) is "Excalibur " and attack value is 30
    And P4 attack card(s) is "Lance Horse Sword Dagger " and attack value is 45

    And player 2 hand should be "F5 F15 F30 Sword Horse Axe Lance Lance "
    And player 4 hand should be "F5 F15 F25 F35 Horse Axe Lance "

    # P3 draws 3+5=8 cards, discards cards
    And resolve stage:
      | 0 |
    And P3 has 12 cards

    And P2 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And all adventure cards are accounted for
    And all event cards are accounted for

    # IMPORTANT: Mandatory assert asked for the scenario
    # • P2 and P4 each earn 3 shields and both are declared (and asserted as) winners.
    Then P2 has 7 shield(s)
    And P4 has 7 shield(s)
    And Player(s) "2 4 " is declared as the winner(s)


