import { Component }
from '@angular/core';

import {
  RouterOutlet
}
from '@angular/router';

import {
  NavbarComponent
}
from './components/navbar/navbar.component';

import {
  CartComponent
}
from './components/cart/cart.component';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    RouterOutlet,
    NavbarComponent,
    CartComponent
  ],

  templateUrl:
    './app.html',

  styleUrls: [
    './app.css'
  ]
})
export class App {

}