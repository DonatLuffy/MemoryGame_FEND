/*
 * Create a list that holds all of your cards
 */
const arrCards = document.getElementsByClassName('card');


//to display cards on the deck
const deck = document.querySelector('.deck');
let listOfOpenCards = [];

//to access on section score-panel
const scorePanel = document.querySelector('.score-panel');

// to resart the game
const restart = scorePanel.querySelector('.restart');

//to add timer on the page
let timer_div = document.createElement('div');
timer_div.setAttribute('class', 'timer');
let timer = 0;
scorePanel.appendChild(timer_div);

//to access to # of moves
let moves = scorePanel.querySelector('.moves');

//to access to stars
let numOfStars = scorePanel.querySelector('.stars');
let counterStars = 3;
let numOfMatched = 0;  // number of card that matches [1-8]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
* @description Start game
*/
function runGame() {
	restart.addEventListener('click', restartGame); // event to restart game
	deck.addEventListener('click', displayCard); //event to display Cards
}


/**
* @description Adds two numbers
* @param event
*/
function displayCard(event){
	if(event.target.className === 'card' && listOfOpenCards.length < 2){ //click only on the cards that filped down &&
																		// to prevent more than two card to show
		event.target.className = 'card open show';
		addToListOfOpen(event);
	}
	if(numOfMatched === 8){
		stopTimer();
		setTimeout(displayCongratulations ,1000);
	}
}

/**
* @description add card on list and lock them if they similar or flip them
* @param event
*/
function addToListOfOpen(event) {
	listOfOpenCards.push(event.target);
	if (listOfOpenCards.length === 2){
		incrementMoveCounter();//counter++
		if(haveSameClass()){
			setTimeout(lockCard,500);
			numOfMatched++;
		}else{
			setTimeout(remove_hide_Cards,500);// hide after 0.5sec if two card not matched
			loseStar(event);
		}
	}
}

/**
* @description check if two cards have same class
* @returns {boolean} equality class name
*/
function haveSameClass() {
	let c1 = listOfOpenCards[0].firstElementChild; 
	let c2 = listOfOpenCards[1].firstElementChild;
	return (c1.className === c2.className);
}

//lock two card and remove them from list
function lockCard() {
	if (listOfOpenCards.length === 2){
		listOfOpenCards.map(x => x.className = 'card match');
		listOfOpenCards = [];
	}
}

//hide two card and remove them from list
function remove_hide_Cards() {
	listOfOpenCards.map(x => x.className = 'card');
	listOfOpenCards = [];
}

//increment moves counter
function incrementMoveCounter() {
	let counter = Number (moves.textContent);
	moves.textContent = counter + 1;
	return moves.textContent;
}

//lose star if two card not same
function loseStar(event) {
	let counterMoves = Number (moves.textContent);
	if((counterMoves - numOfMatched) % 10 === 0 && counterStars != 1){//decrease stars after balance between counterMoves and numOfMatched with 10
		numOfStars.children[counterStars-1].firstElementChild.className = 'fa fa-star-o';
		counterStars--;
	}else{
		// alert('You are Lose!')
		// deck.removeEventListener('click', displayCard);
	}
}

//display Congratulations alert
function displayCongratulations() {
	stopTimer();
	let stars = scorePanel.querySelector('.stars');
	swal({
		  title: "Congratulations! You Won!",
		  content: stars,
		  text: "With: " + moves.textContent +" moves",
		  icon: "success",
		  buttons: [true,"play again!"],
	})
	.then((wantToRestart) => {
		wantToRestart? restartGame() : deck.removeEventListener('click', displayCard);
	});
}

//start timer
function stratTimer(){
	let countTimer = 0;
	function time() {
		countTimer++;
		timer_div.textContent = countTimer;
	}
	timer = setInterval(time, 1000);
}

// stop timer
function stopTimer() {
	clearInterval(timer);
}

//reset the game board, the timer, and the star rating 
function restartGame() {
	stopTimer();
	//to flip over all cards and restart game
	let toFlip = [];
	for(let i=0; i < arrCards.length; i++){
		toFlip[i] = arrCards[i];
		toFlip[i].className = 'card';
	}
	//
	moves.textContent = 0;//rest the counter

	//rest the stars
	counterStars = 3;
	for(let i=0 ; i < numOfStars.children.length; i++){
		numOfStars.children[i].firstElementChild.className = 'fa fa-star';
	}
	scorePanel.insertAdjacentElement('afterbegin',numOfStars);

	// to shuffle cards
	let arrOfCards = [];
	for(let i=0 ; i < deck.children.length; i++){
		arrOfCards[i] = deck.children[i];
	}
	shuffle(arrOfCards);
	//add cards to deck
	for(let i=0 ; i < arrOfCards.length; i++){
		deck.appendChild(arrOfCards[i]);
	}

	numOfMatched = 0;//reset number cards that matches

	stratTimer();
	deck.addEventListener('click', displayCard);
}

runGame();
stratTimer();
