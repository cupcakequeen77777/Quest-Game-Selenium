Feature: A1_scenario

  Scenario: A1_scenario
    Given rig a new game of Adventure starts

    When the cards have been distributed to the players for A1_scenario
    And player 1 hand should be "F5 F5 F15 F15 Dagger Sword Sword Horse Horse Axe Axe Lance "
    And player 2 hand should be "F5 F5 F15 F15 F40 Dagger Sword Horse Horse Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F5 F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Lance Excalibur "

    And P1 starts their turn and draws "Q4":
      |  |

    And P1 starts a quest of 4 stages
    And ask players for sponsorship:
      | n |
      | y |
    And quest sponsor is P2
    And ask sponsor for cards:
      | 0    |
      | 6    |
      | quit |
      | 1    |
      | 4    |
      | quit |
      | 1    |
      | 2    |
      | 3    |
      | quit |
      | 1    |
      | 2    |
      | quit |

    #  Stage 1:
    #   a. P1 is asked and decides to participate – draws an F30 – discards an F5 (to trim down to 12 cards)
    #   b. P3 is asked and decides to participate – draws a Sword - discards an F5 (to trim down to 12 cards)
    #   c. P4 is asked and decides to participate – draws an Axe - discards an F5 (to trim down to 12 cards)
    And ask players to participate, participants "[1, 3, 4]":
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
    And player 1 hand should be "F5 F15 F15 F30 Dagger Sword Sword Horse Horse Axe Axe Lance "
    And player 2 hand should be "F5 Horse Excalibur "
    And player 3 hand should be "F5 F5 F15 Dagger Sword Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Axe Lance Excalibur "

    #   d. Note: Please be sure to build  all attacks with the weapons selected in the order presented below
    #   e. P1 sees their hand and builds an attack: Dagger + Sword => value of 15
    #   f. P3 sees their hand and builds an attack: Sword + Dagger => value of 15
    #   g. P4 sees their hand and builds an attack: Dagger + Horse => value of 15
    And players attack with card selected:
      | 4    |
      | 4    |
      | quit |
      |      |
      | 4    |
      | 3    |
      | quit |
      |      |
      | 3    |
      | 5    |
      | quit |
      |      |
    And P1 attack card(s) is "Dagger Sword " and attack value is 15
    And P2 attack card(s) is "" and attack value is 0
    And P3 attack card(s) is "Sword Dagger " and attack value is 15
    And P4 attack card(s) is "Dagger Horse " and attack value is 15

    #   h. Resolution: all 3 attacks are sufficient thus all participants can go onto the next stage
    #   i. All 3 participants discard the cards used for their attacks
    And resolve stage:
      |  |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "" and attack value is 0
    And P3 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0

    #  Stage 2:
    #    a. P1 is asked and decides to participate. P1 draws a F10
    #    b. P3 is asked and decides to participate. P3 draws a Lance
    #    c. P4 is asked and decides to participate. P4 draws a Lance
    And ask players to participate, participants "[1, 3, 4]":
      | y |
      |   |
      | y |
      |   |
      | y |
      |   |
    And player 1 hand should be "F5 F10 F15 F15 F30 Sword Horse Horse Axe Axe Lance "
    And player 2 hand should be "F5 Horse Excalibur "
    And player 3 hand should be "F5 F5 F15 Sword Sword Sword Horse Horse Axe Lance Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Sword Horse Axe Axe Lance Lance Excalibur "


    #  d. P1 sees their hand and builds an attack: Horse + Sword => value of 20
    #  e. P3 sees their hand and builds an attack: Axe + Sword => value of 25
    #  f. P4 sees their hand and builds an attack: Horse + Axe=> value of 25
    And players attack with card selected:
      | 6    |
      | 5    |
      | quit |
      |      |
      | 8    |
      | 3    |
      | quit |
      |      |
      | 5    |
      | 6    |
      | quit |
      |      |
    And P1 attack card(s) is "Horse Sword " and attack value is 20
    And P2 attack card(s) is "" and attack value is 0
    And P3 attack card(s) is "Axe Sword " and attack value is 25
    And P4 attack card(s) is "Horse Axe " and attack value is 25

    # g. Resolution:
    #   i. P1’s attack is insufficient – P1 loses and cannot go to the next stage
    #     • Assert P1 has no shields and their hand is F5 F10 F15 F15 F30 Horse Axe Axe Lance (displayed in this order)
    #   ii. P3’s and P4’s attack are sufficient go onto the next stage
    # h. All 3 participants discard the cards used for their attacks

    And resolve stage:
      |  |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "" and attack value is 0
    And P3 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And participant(s) eligible for next stage "[3, 4]"
    # IMPORTANT: Mandatory assert asked for the scenario
    And P1 has 0 shield(s)
    And player 1 hand should be "F5 F10 F15 F15 F30 Horse Axe Axe Lance "


    #  Stage 3:
    #   a. P3 is asked and decides to participate. P3 draws an Axe
    #   b. P4 is asked and decides to participate. P4 draws a Sword
    And ask players to participate, participants "[3, 4]":
      | y |
      |   |
      | y |
      |   |
    And player 3 hand should be "F5 F5 F15 Sword Sword Horse Horse Axe Lance Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Sword Sword Axe Lance Lance Excalibur "

    #   c. P3 sees their hand and builds an attack: Lance + Horse + Sword => value of 40
    #   d. P4 sees their hand and builds an attack: Axe + Sword + Lance => value of 45
    And players attack with card selected:
      | 8    |
      | 5    |
      | 3    |
      | quit |
      |      |
      | 6    |
      | 4    |
      | 5    |
      | quit |
      |      |
    And P3 attack card(s) is "Lance Horse Sword " and attack value is 40
    And P4 attack card(s) is "Axe Sword Lance " and attack value is 45


    #   e. Resolution: P3’s and P4’s attack are sufficient go onto the next stage
    #   f. All 2 participants discard the cards used for their attacks
    And resolve stage:
      |  |
    And P3 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And participant(s) eligible for next stage "[3, 4]"


    #  Stage 4:
    #      a. P3 is asked and decides to participate. P3 draws a F30
    #      b. P4 is asked and decides to participate. P4 draws a Lance
    And ask players to participate, participants "[3, 4]":
      | y |
      |   |
      | y |
      |   |
    And player 3 hand should be "F5 F5 F15 F30 Sword Horse Axe Lance "
    And player 4 hand should be "F15 F15 F40 Dagger Sword Lance Lance Excalibur "

    #      c. P3 sees their hand and builds an attack: Axe + Horse + Lance => value of 45
    #      d. P4 sees their hand and builds an attack: Dagger + Sword + Lance + Excalibur => value of 65
    And players attack with card selected:
      | 6    |
      | 5    |
      | 5    |
      | quit |
      |      |
      | 3    |
      | 3    |
      | 3    |
      | 4    |
      | quit |
      |      |
    And P3 attack card(s) is "Axe Horse Lance " and attack value is 45
    And P4 attack card(s) is "Dagger Sword Lance Excalibur " and attack value is 65


    #      e. Resolution:
    #          i. P3’s attack is insufficient – P3 loses and receives no shields
    #          ii. P4’s attack is sufficient – P4 receives 4 shields
    #      f. All 2 participants discard the cards used for their attacks
    #          i. assert P3 has no shields and has the 5 cards: F5 F5 F15 F30 Sword
    #          ii. assert P4 has 4 shields and has the cards: F15 F15 F40 Lance
    #      g. P2 discards all 9 cards used in the quest and draws 9+4 = 13 random cards and then trims down to 12 cards.
      #  It does not matter which cards are selected to discard.
    #     • assert P2 has 12 cards in hand


    And resolve stage:
      | 0 |

    Then P3 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0
    And all adventure cards are accounted for
    And all event cards are accounted for

    # IMPORTANT: Mandatory assert asked for the scenario
    And P3 has 0 shield(s)
    And player 3 hand should be "F5 F5 F15 F30 Sword "
    # IMPORTANT: Mandatory assert asked for the scenario
    And P4 has 4 shield(s)
    And player 4 hand should be "F15 F15 F40 Lance "

    # IMPORTANT: Mandatory assert asked for the scenario
    And P2 has 12 cards




