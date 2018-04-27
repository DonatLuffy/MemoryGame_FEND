# Memory Game Project

## In HTML file adding the following:
-  ><script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> by (https://sweetalert.js.org) to make amazing alert.

## In CSS file :
- adding timer class to display timer inline next with stars and restart.
- adding animation on show and match cards, the animation from [w3schools](https://www.w3schools.com/cssref/css3_pr_animation.asp) and [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) .
- adding some styles on Stars that shows on the alert .

## In JavaScrpit file important notations:
- the script start from *runGame()* which has 2 even listener `restartGame` and `displayCard`:
* `displayCard`: click only on the cards that filped down, and prevent more than two card to show, then check if all cards have been matched to display Congratulations.
and it calls they functions
- `addToListOfOpen`: insert card to list of open cards, if list has two cards, increment number of moves and check if they are same, if it's then lock them, if are not the same hide them and  decrease stars after 10 moves. then reset the list of open.
- `displayCongratulations`: display Congratulations alert, stop timer, Given a choice to restart game or cancel.

- `stratTimer`: to start timer.
- `stopTimer`: to stop timer by using `clearInterval` function.
* `restartGame`: reset the game board, the timer, the star rating, and the number of moves.
1. stop timer
2. flip down all cards
3. rest the number of moves
4. rest the star rating
5. shuffle cards
6. add all card that shffled on the deck
7. reset number cards that matches
8. add Event Listener again on `displayCard`