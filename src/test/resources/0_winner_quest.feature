Feature: 0_winner_quest

#  FIXME: move to A2_Tests.feature

  Scenario: 0_winner_quest
    Given rig a new game of Adventure starts

    When the cards have been distributed to the players for 0_winner_quest
    And player 1 hand should be "F5 F5 F15 F15 Dagger Sword Sword Horse Horse Axe Axe Lance "
    And player 2 hand should be "F5 F5 F15 F15 F40 Dagger Sword Horse Horse Axe Axe Excalibur "
    And player 3 hand should be "F5 F5 F5 F15 Dagger Sword Sword Sword Horse Horse Axe Lance "
    And player 4 hand should be "F5 F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Lance Excalibur "

    #  • P1 draws a 2 stage quest and decides to sponsor it. P1 builds 2 stages
    And P1 starts their turn and draws "Q2":
      |  |
    And P1 starts a quest of 2 stages
    And ask players for sponsorship:
      | y |
    And quest sponsor is P1
    And ask sponsor for cards:
      | 0    |
      | 9    |
      | 7    |
      | 5    |
      | quit |
      | 1    |
      | 6    |
      | 5    |
      | 4    |
      | 3    |
      | 2    |
      | quit |

    #  • P2, P3 and P4 participate in stage 1 and all lose stage 1!
    #  Stage 1:
    #   a. P2 is asked and decides to participate – draws an F30 – discards an Excalibur (to trim down to 12 cards)
    #   b. P3 is asked and decides to participate – draws a Sword - discards an Lance (to trim down to 12 cards)
    #   c. P4 is asked and decides to participate – draws an Axe - discards an Excalibur (to trim down to 12 cards)
    And ask players to participate, participants "[2, 3, 4]":
      | y  |
      |    |
      | y  |
      |    |
      | y  |
      |    |
      | 12 |
      |    |
      | 12 |
      |    |
      | 12 |
      |    |

    And player 1 hand should be "F5 F15 "
    And player 2 hand should be "F5 F5 F15 F15 F30 F40 Dagger Sword Horse Horse Axe Axe "
    And player 3 hand should be "F5 F5 F5 F15 Dagger Sword Sword Sword Sword Horse Horse Axe "
    And player 4 hand should be "F5 F15 F15 F40 Dagger Dagger Sword Horse Horse Axe Axe Lance "

  #   d. Note: Please be sure to build  all attacks with the weapons selected in the order presented below
    #   e. P2 sees their hand and builds an attack: Dagger  => value of 5
    #   f. P3 sees their hand and builds an attack: Dagger => value of 5
    #   g. P4 sees their hand and builds an attack: Horse => value of 10
    And players attack with card selected:
      | 6    |
      | quit |
      |      |
      | 4    |
      | quit |
      |      |
      | 7    |
      | quit |
      |      |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "Dagger " and attack value is 5
    And P3 attack card(s) is "Dagger " and attack value is 5
    And P4 attack card(s) is "Horse " and attack value is 10

    And resolve stage:
      | 0 |
    And P1 attack card(s) is "" and attack value is 0
    And P2 attack card(s) is "" and attack value is 0
    And P3 attack card(s) is "" and attack value is 0
    And P4 attack card(s) is "" and attack value is 0

    # IMPORTANT: Mandatory assert asked for the scenario
    And P1 has 0 shield(s)
    And P2 has 0 shield(s)
    And P3 has 0 shield(s)
    And P4 has 0 shield(s)

    #  • The quest ends with no winner but P1 does discards and draws. (Here you need to figure out what to assert to confirm this outcome J.)
    #   All cards used by the sponsor to build the quest are discarded by the game who then draws the same number of cards + the number of stages, and then possibly trims their hand
    #  P1 draws 2 + 10 cards used during quest
    And P1 has 12 cards
    And P2 has 11 cards
    And P3 has 11 cards
    And P4 has 11 cards

    And quest is complete
    And all event cards are accounted for
    And all adventure cards are accounted for

