import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as userSelectors from '../ui-state/selectors/user.selectors'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  name$     = this.store.select(userSelectors.selectName)
  lastName$ = this.store.select(userSelectors.selectLastName)

  loading: boolean = false



  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {


  }

  addUniqueClass(ids: string[], _class: string) {
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.add(_class)
    }
  }

  removeUniqueClass(ids: string[], _class: string){
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.remove(_class)
    }
  }

  navigatePuzzle() {
    this.router.navigate(['game-puzzle'])
  }



}
