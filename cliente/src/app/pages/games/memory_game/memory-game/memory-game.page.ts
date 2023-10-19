
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.page.html',
  styleUrls: ['./memory-game.page.scss'],
})



export class MemoryGamePage implements OnInit{

  public cardsTotal = 12;
  public cardsArray : {pos: number; val: number}[] = [];
  public userLife = 8;
  public imageDir = '../../../../../assets/img/memory_game/'
  public images = ['mgame','mgameo','mgamet','mgametr','mgamef','mgamefi','mgames','mgamese']  // Images Array suffix
  
  public gameState: any;
  public startGame: any;
  public countDown: any;
  public totalTime: any;
  public shownTime: any;
  public countTime: any;
  public interTime: any;
  public interCount: any;

  public selectCard1pos = -1;	// Selected card #1 position
  public selectCard1val = -1;	// Selected card #1 value
  public selectCard2pos = -1;	// Selected card #2 position
  public selectCard2val = -1;	// Selected card #2 value
  public selectOldPosix = -1; // Store old position
  public debugText = "Debug text goes here! :)"

  constructor() { }

  ngOnInit() {
  this.restartGame();
  }

  // Function to populate cards array with
  // position and value pairs from 0 to 6
  populateCards() {
  	this.cardsArray = [];
  	var x = 0;
  	var y = 0;
  	for (var i = 0; i < this.cardsTotal; i++) {
  		// Push card to array and assign value
  		this.cardsArray.push({pos:i, val:y});
  		// Flip x to assign next card same value
  		if (x == 0) x = 1;
  		else { x = 0; y++ }
  	}
  }

  // Function to select a card
  selectCard(pos: number, val: number, i: number) {
    var actOne = false; //Control para la primera seleccion de la carta
  	
  // Code to select the second card

    if (this.selectCard1pos > -1 && this.selectCard2pos == -1) {
      this.selectCard2pos = pos;
      this.selectCard2val = val;
      actOne = true;
    }

       // Code to select the first card
       if (this.selectCard1pos == -1 && !actOne){
        this.selectCard1pos = pos;
        this.selectCard1val = val;
        this.selectOldPosix = i;
      }

    // If we have both cards selected, check for match or fail
    if (actOne && this.selectCard1pos > -1 && this.selectCard2pos > -1) {
      setTimeout(() => { 
        //if the cards match
        if (this.selectCard1val == this.selectCard2val) {
          this.debugText = "cards match";
          this.cardsArray.splice(this.selectOldPosix, 1, {pos: this.selectOldPosix, val: -1});
          this.cardsArray.splice(i, 1, {pos: i, val: -1});
          this.resetSelects();
          this.winCon();
        }
        else{
          this.debugText = "cards don't match";
          this.userLife -= 1
          this.resetSelects();
          if (this.userLife <=0) this.loseCon();

        }

        //if don't match, take a life & reset
      }, 1000);
    }
  }

    // Function to shuffle an array
    shuffle(a: any[]) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}

  // Function to restart the game
  restartGame() {
    this.gameState = 'load';
    this.startGame = false;
    this.countDown = 3;
    this.totalTime = 60;
    this.countTime = 0;
    this.shownTime = 0;
    this.interCount = null;

    this.userLife = 8;
    this.resetSelects();
    this.populateCards();
  	this.shuffle(this.cardsArray);
  	this.shuffle(this.images); // Shuffle the images

    setTimeout(() => {
      this.startGame = true;
      this.gameState = 'init';
    }, this.countDown*1000);

    this.interCount = setInterval(() =>{
      if(this.countDown < 0) {
        clearInterval(this.interCount);
        this.interCount = null;
      }
      else this.countDown -= 1;
    }, 1000);

    // Timer when the game starts

    setTimeout(() => {
      this.interTime = setInterval(() =>{
        if(this.countTime >= this.totalTime)this.loseCon();
        if(this.gameState == 'init') {
          this.countTime += 1;   // Add 1 second to counter
          var minutes = Math.floor((this.totalTime - this.countTime) / 60);
          var seconds = (this.totalTime - this.countTime) - minutes * 60;
          this.shownTime = minutes.toString() + ":" + seconds.toString();
        }
        else {
          clearInterval(this.interTime);
          this.interTime = null;
        }
      }, 1000)
    }, this.countDown*1000+200);

  }

  // winCondition
  winCon() {
    var winCheck = false;
    for (var i = 0; i < this.cardsArray.length; i ++)
      if (this.cardsArray[i].val != -1) winCheck = true;

      if (winCheck == false) this.gameState = 'win';
  }

//loseCondition
  loseCon(){
    this.gameState = 'lose';
  }


  // Function to reset selected cards
	resetSelects() {
		this.selectCard1pos = -1;	// Selected card #1 position
  	this.selectCard1val = -1;	// Selected card #1 value
  	this.selectCard2pos = -1;	// Selected card #2 position
  	this.selectCard2val = -1;	// Selected card #2 value
	}
}