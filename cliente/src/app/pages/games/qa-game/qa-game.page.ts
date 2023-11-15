import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-qa-game',
  templateUrl: './qa-game.page.html',
  styleUrls: ['./qa-game.page.scss'],
})
export class QaGamePage implements OnInit {

  loading: boolean = false

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['home'])
  }

}
