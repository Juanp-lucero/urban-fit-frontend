import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  CartService
} from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl:
    './navbar.component.html',

  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent {

  constructor(
    public cartService:
    CartService
  ) {}

  toggleCart(): void {

    this.cartService
      .toggleCart();
  }

  cartCount(): number {

    return this
      .cartService
      .items()
      .length;
  }
}