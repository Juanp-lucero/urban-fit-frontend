import { Injectable, signal }
from '@angular/core';

import { Product }
from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // PRODUCTOS DEL CARRITO
  private _items =
    signal<Product[]>([]);

  items =
    this._items.asReadonly();

  // ABRIR / CERRAR CARRITO
  cartOpen =
    signal(false);

  // TOGGLE CARRITO
  toggleCart() {

    this.cartOpen.update(
      state => !state
    );
  }

  // AGREGAR PRODUCTO
  addToCart(
    product: Product
  ) {

    this._items.update(items => {

      const existe =
        items.find(
          p => p.id === product.id
        );

      // SI YA EXISTE
      if (existe) {

        // VALIDAR STOCK
        if (
          (existe.cantidad || 1)
          >= product.stock
        ) {

          alert(
            'No hay más stock disponible'
          );

          return items;
        }

        return items.map(p =>

          p.id === product.id
            ? {
                ...p,
                cantidad:
                  (p.cantidad || 1) + 1
              }
            : p
        );
      }

      // PRODUCTO NUEVO
      return [
        ...items,
        {
          ...product,
          cantidad: 1
        }
      ];
    });
  }

  // AUMENTAR CANTIDAD
  increaseQuantity(
    id: number
  ) {

    this._items.update(items =>

      items.map(p => {

        if (p.id === id) {

          if (
            (p.cantidad || 1)
            >= p.stock
          ) {

            alert(
              'Stock máximo alcanzado'
            );

            return p;
          }

          return {
            ...p,
            cantidad:
              (p.cantidad || 1) + 1
          };
        }

        return p;
      })
    );
  }

  // DISMINUIR CANTIDAD
  decreaseQuantity(
    id: number
  ) {

    this._items.update(items =>

      items
        .map(p =>

          p.id === id
            ? {
                ...p,
                cantidad:
                  (p.cantidad || 1) - 1
              }
            : p
        )
        .filter(
          p =>
            (p.cantidad || 1) > 0
        )
    );
  }

  // ELIMINAR PRODUCTO
  removeFromCart(
    productId: number
  ) {

    this._items.update(
      items =>

        items.filter(
          p =>
            p.id !== productId
        )
    );
  }

  // TOTAL DEL CARRITO
  getTotal(): number {

    return this
      ._items()
      .reduce(

        (acc, p) =>

          acc +

          (
            p.precio *
            (p.cantidad || 1)
          ),

        0
      );
  }

  // LIMPIAR CARRITO
  clearCart(): void {

    this._items.set([]);
  }
}