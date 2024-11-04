Feature: 1winner_game_with_events

  Scenario: 1winner_game_with_events
    Given rig a new game of Adventure starts

    When the cards have been distributed to the players for 1winner_game_with_events
    And player 1 hand should be "F5 F5 F15 F15 Dagger Sword Sword Horse Horse Axe Axe Lance "
    And player 2 hand should be "F5 F5 F15 F15 F40 Dagger Sword Horse Horse Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F5 F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Lance Excalibur "

    #  1. P1 draws a 4 stage quest and decides to sponsor it. P1 builds 4 stages
    # Stage 1: F5
    And P1 starts their turn and draws "Q4":
      |  |
    And P1 starts a quest of 4 stages
    And ask players for sponsorship:
      | y |
    And quest sponsor is P1
    And ask sponsor for cards:
      | 0    |
      | quit |
      | 0    |
      | 3    |
      | quit |
      | 0    |
      | 1    |
      | quit |
      | 0    |
      | 2    |
      | quit |
      #  Quest
      #  Stage 1: 5
      #  F5
      #  Stage 2: 15
      #  F5 Sword
      #  Stage 3: 20
      #  F15 Dagger
      #  Stage 4: 25
      #  F15 Horse

    #  2. P2, P3 and P4 participate in and win all stages.

    #    Stage 1
    #   P2 is asked and decides to participate – draws an F30 – discards an F5 (to trim down to 12 cards)
    #   P3 is asked and decides to participate – draws a Sword - discards an F5 (to trim down to 12 cards)
    #   P4 is asked and decides to participate – draws an Axe - discards an F5 (to trim down to 12 cards)
    And ask players to participate "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |

    And player 1 hand should be "Sword Horse Axe Axe Lance "
    And player 2 hand should be "F5 F15 F15 F30 F40 Dagger Sword Horse Horse Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Axe Lance Excalibur "


    And players attack with card selected:
      | 5    |
      | quit |
      |      |
      | 4    |
      | quit |
      |      |
      | 3    |
      | quit |
      |      |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Dagger " and attack value is 5
    And P3 attack card(s) is "Sword " and attack value is 10
    And P4 attack card(s) is "Dagger " and attack value is 5


    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 3, 4]"

    # Stage 2:
    #    P2 is asked and decides to participate. P2 draws a F10
    #    P3 is asked and decides to participate. P3 draws a Lance
    #    P4 is asked and decides to participate. P4 draws a Lance
    And ask players to participate "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Sword Horse Horse Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Sword Horse Horse Axe Axe Lance Lance Excalibur "

    And players attack with card selected:
      | 7    |
      | 6    |
      | quit |
      |      |
      | 7    |
      | 4    |
      | quit |
      |      |
      | 6    |
      | 4    |
      | quit |
      |      |
    And P2 attack card(s) is "Horse Sword " and attack value is 20
    And P3 attack card(s) is "Horse Sword " and attack value is 20
    And P4 attack card(s) is "Horse Sword " and attack value is 20

    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 3, 4]"


    # Stage 3:
    #   P2 is asked and decides to participate. P2 draws an Axe
    #   P3 is asked and decides to participate. P3 draws a Sword
    #   P4 is asked and decides to participate. P4 draws a F30
    And ask players to participate "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Horse Axe Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Sword Horse Axe Lance Lance "
    And player 4 hand should be "F15 F15 F30 F40 Dagger Horse Axe Axe Lance Lance Excalibur "

    And players attack with card selected:
      | 7    |
      | 6    |
      | quit |
      |      |
      | 9    |
      | quit |
      |      |
      | 8    |
      | quit |
      |      |
    And P2 attack card(s) is "Axe Horse " and attack value is 25
    And P3 attack card(s) is "Lance " and attack value is 20
    And P4 attack card(s) is "Lance " and attack value is 20

    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 3, 4]"

    # Stage 4:
    #   P2 is asked and decides to participate. P2 draws a Lance
    #   P3 is asked and decides to participate. P3 draws a Horse
    #   P4 is asked and decides to participate. P4 draws a Sword
    And ask players to participate "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |

    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Axe Axe Lance Excalibur "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F15 F15 F30 F40 Dagger Sword Horse Axe Axe Lance Excalibur "

    And players attack with card selected:
      | 9    |
      | quit |
      |      |
      | 9    |
      | 7    |
      | 4    |
      | quit |
      |      |
      | 10   |
      | quit |
      |      |
    And P2 attack card(s) is "Excalibur " and attack value is 30
    And P3 attack card(s) is "Axe Horse Sword " and attack value is 35
    And P4 attack card(s) is "Excalibur " and attack value is 30

    # P1 draws 4+8=12 cards, has 17 cards, discards 5 cards
    # P1 draws F10 F10 F20 F25 F25 F25 F25 F30 F30 F35 F50 F50
    And resolve stage:
      | 16 |
      | 15 |
      | 14 |
      | 13 |
      | 12 |

    And P3 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And all adventure cards are accounted for
    And all event cards are accounted for


    #  3. P2, P3 and P4 each earn 4 shields
    #       P2, P3 and P4 each earn 4 shields. (No need to assert they won as the number of shields confirms this)

    # IMPORTANT: Mandatory assert asked for the scenario
    And P1 has 0 shield(s)
    And P2 has 4 shield(s)
    And P3 has 4 shield(s)
    And P4 has 4 shield(s)

    And player 1 hand should be "F10 F10 F20 F25 F25 F25 F25 F30 F30 F35 F50 F50 "
    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Axe Axe Lance "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Horse Lance "
    And player 4 hand should be "F15 F15 F30 F40 Dagger Sword Horse Axe Axe Lance "


    #  4. P2 draws ‘Plague’ and loses 2 shields
    #       P2 goes down to 2 shields
    # IMPORTANT: Mandatory assert asked for the scenario
    And P2 starts their turn and draws "Plague":
      |  |
    And P2 has 2 shield(s)

    #  5. P3 draws ‘Prosperity’: All 4 players receive 2 adventure cards the number of cards in the hand of each player
    #  increases by 2
    # P1 draws F10, F20
    # P2 draws Sword Horse
    # P3 draws Dagger, Horse
    # P4 draws F25, F35
    # IMPORTANT: Mandatory assert asked for the scenario
    And P3 starts their turn and draws "Prosperity":
      | 12 |
    And P1 has 12 cards
    And P2 has 11 cards
    And P3 has 10 cards
    And P4 has 12 cards

    And player 1 hand should be "F10 F10 F10 F20 F20 F25 F25 F25 F25 F30 F30 F35 "
    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Sword Horse Axe Axe Lance "
    And player 3 hand should be "F5 F5 F15 Dagger Dagger Sword Sword Horse Horse Lance "
    And player 4 hand should be "F15 F15 F30 F35 F35 F40 Dagger Sword Horse Axe Axe Lance "


    #  6. P4 draws ‘Queen’s favor’ and thus draws 2 adventure cards
    #       the number of cards in the hand of P4 increases by 2
    # P4 draws F10, F10
    # IMPORTANT: Mandatory assert asked for the scenario
    And P4 starts their turn and draws "Queen’s favor":
      | 12 |
    And P4 has 12 cards
    And player 4 hand should be "F10 F10 F15 F15 F30 F35 F35 F40 Dagger Sword Horse Axe "


    #  7. P1 draws a 3 stage quest and decides to sponsor it. P1 builds 3 stages
    And P1 starts their turn and draws "Q3":
      |  |
    And P1 starts a quest of 3 stages
    And ask players for sponsorship:
      | y |
    And quest sponsor is P1
    And ask sponsor for cards:
      | 0    |
      | quit |
      | 2    |
      | quit |
      | 3    |
      | quit |

    # Quest
    # Stage 1: 5
    # F5
    # Stage 2: 15
    # F5 Sword
    # Stage 3: 20
    # F15 Dagger
    # Stage 4: 25
    # F15 Horse


    #  8. P2, P3 and P4 participate in stage 1. P2 and P3 win, whereas P4 loses.
    #    Stage 1
    #   P2 is asked and decides to participate. P2 draws a Sword
    #   P3 is asked and decides to participate. P3 draws a Sword
    #   P4 is asked and decides to participate. P4 draws a F20
    And ask players to participate "[2, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |

    And player 1 hand should be "F10 F10 F20 F25 F25 F25 F30 F30 F35 "
    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Sword Sword Horse Axe Axe Lance "
    And player 3 hand should be "F5 F5 F15 Dagger Dagger Sword Sword Sword Horse Horse Lance "
    And player 4 hand should be "F10 F15 F15 F20 F30 F35 F35 F40 Dagger Sword Horse Axe "

    And players attack with card selected:
      | 6    |
      | quit |
      |      |
      | 5    |
      | quit |
      |      |
      | 8    |
      | quit |
      |      |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Sword " and attack value is 10
    And P3 attack card(s) is "Sword " and attack value is 10
    And P4 attack card(s) is "Dagger " and attack value is 5


    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 3]"

    #  9. P2 and P3 participate in and win stages 2 and 3
    # Stage 2:
    #   P2 is asked and decides to participate. P2 draws a Horse
    #   P3 is asked and decides to participate. P3 draws a F20
    And ask players to participate "[2, 3]":
      | y |
      |   |
      | y |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |

    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Sword Horse Horse Axe Axe Lance "
    And player 3 hand should be "F5 F5 F15 F20 Dagger Dagger Sword Sword Horse Horse Lance "

    And players attack with card selected:
      | 7    |
      | 6    |
      | quit |
      |      |
      | 8    |
      | 7    |
      | quit |
      |      |

    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Horse Sword " and attack value is 20
    And P3 attack card(s) is "Horse Sword " and attack value is 20
    And P4 attack card(s) is "" and attack value is 0


    And resolve stage:
      |  |
    And participant(s) eligible for next stage "[2, 3]"


    # Stage 3:
    #   P2 is asked and decides to participate. P2 draws a Sword
    #   P3 is asked and decides to participate. P3 draws a F15
    And ask players to participate "[2, 3]":
      | y |
      |   |
      | y |
      |   |
      | 0 |
      |   |
      | 0 |
      |   |

    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Sword Horse Axe Axe Lance "
    And player 3 hand should be "F5 F5 F15 F15 F20 Dagger Dagger Sword Horse Lance "

    And players attack with card selected:
      | 8    |
      | 6    |
      | quit |
      |      |
      | 9    |
      | 5    |
      | quit |
      |      |

    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Axe Sword " and attack value is 25
    And P3 attack card(s) is "Lance Dagger " and attack value is 25
    And P4 attack card(s) is "" and attack value is 0


    And resolve stage:
      | 0 |

    And P3 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And all adventure cards are accounted for
    And all event cards are accounted for
    And P1 has 12 cards
    And player 2 hand should be "F5 F10 F15 F15 F30 F40 Horse Axe Lance "
    And player 3 hand should be "F5 F5 F15 F15 F20 Dagger Sword Horse "

    #  10. P2 and P3 earn 3 shields: P3 is declared (and asserted as) the winner
    #       P2 and P3 have their total number of shields increase by 3 and thus P3 reaches 7 and is the winner
    # IMPORTANT: Mandatory assert asked for the scenario
    Then P1 has 0 shield(s)
    And P2 has 5 shield(s)
    And P3 has 7 shield(s)
    And P4 has 4 shield(s)

    # IMPORTANT: Mandatory assert asked for the scenario
    # P3 is declared (and asserted as) the winner
    And Player(s) "3 " is declared as the winner(s)


