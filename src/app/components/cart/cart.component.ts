import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { CartService }
from '../../services/cart.service';

import { ApiService }
from '../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './cart.component.html',

  styleUrls: [
    './cart.component.css'
  ]
})
export class CartComponent {

  constructor(
    public cartService:
    CartService,

    private apiService:
    ApiService
  ) {}

  remove(
    id: number
  ) {

    this.cartService
      .removeFromCart(id);
  }

  clear() {

    this.cartService
      .clearCart();
  }

  total() {

    return this
      .cartService
      .getTotal();
  }

  comprar() {

    const productos =
      this.cartService
      .items();

    // VALIDAR TALLAS
    const sinTalla =
      productos.some(

        p =>
        !p.tallaSeleccionada
      );

    if (sinTalla) {

      alert(
        'Selecciona la talla de todos los productos 😭'
      );

      return;
    }

    const pedido = {

      fecha:
      new Date(),

      total:
      this.total(),

      cliente:
      null,

      productos:
      productos,

      pago:
      null
    };

    this.apiService
      .crearPedido(
        pedido
      )
      .subscribe({

        next: () => {

          alert(
            'Compra realizada 😎🔥'
          );

          this.cartService
            .clearCart();

          this.cartService
            .toggleCart();
        },

        error: (
          err
        ) => {

          console.error(
            err
          );

          alert(
            'Error al comprar 😭'
          );
        }
      });
  }
}