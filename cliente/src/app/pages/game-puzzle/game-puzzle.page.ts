import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-puzzle',
  templateUrl: './game-puzzle.page.html',
  styleUrls: ['./game-puzzle.page.scss'],
})
export class GamePuzzlePage implements OnInit {

  loading: boolean = false

  constructor() { }

  ngOnInit() {

  }

  moverTiles(cell1: string, cell2: string) {
    var temp = document.getElementById(cell1)!.className
    document.getElementById(cell1)!.className = document.getElementById(cell2)!.className
    document.getElementById(cell2)!.className = temp
  }

  mezclarTiles() {
    for(var row=1; row<=3; row++){
      for(var column=1; column<=3; column++){
        var row2    = Math.floor(Math.random()*3 + 1)
        var column2 = Math.floor(Math.random()*3 + 1)

        this.moverTiles("cell"+row+column, "cell"+row2+column2)
      }
    }
  }

  clickTile(row: number, column: number) {
    var cell = document.getElementById("cell"+row+column)
    var tile = cell!.className
    if(tile="tile tile9"){
      if(column<3) {
        if(document.getElementById("cell"+row+(column+1))!.className=="tile tile9"){
          this.moverTiles("cell"+row+column,"cell"+row+(column+1));
          return;
        }
      }

      if(column>1) {
        if(document.getElementById("cell"+row+(column-1))!.className=="tile tile9"){
          this.moverTiles("cell"+row+column,"cell"+row+(column-1));
          return;
        }
      }

      if(row>1){
        if(document.getElementById("cell"+(row-1)+column)!.className=="tile tile9"){
          this.moverTiles("cell"+row+column,"cell"+(row-1)+column);
          return
        }
      }

      if(row<3){
        if(document.getElementById("cell"+(row+1)+column)!.className=="tile tile9"){
          this.moverTiles("cell"+row+column,"cell"+(row+1)+column);
          return
        }
      }
    }
  }

}
