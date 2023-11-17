import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-lector-arjs',
  templateUrl: './lector-arjs.page.html',
  styleUrls: ['./lector-arjs.page.scss'],
})
export class LectorArjsPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['home'])
  }

}
