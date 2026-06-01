import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Product
} from '../../models/product.model';

import {
  ApiService
} from '../../services/api.service';

import {
  CartService
} from '../../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './catalog.component.html',

  styleUrls: [
    './catalog.component.css'
  ]
})
export class CatalogComponent
implements OnInit {

  productos:
  Product[] = [];

  productosFiltrados:
  Product[] = [];

  pedidos:
  any[] = [];

  busqueda = '';

  mostrarCompras =
  false;

  constructor(
    private apiService:
    ApiService,

    private cartService:
    CartService
  ) {}

  ngOnInit(): void {

    this.cargarProductos();
  }

  cargarProductos(): void {

    this.apiService
      .obtenerProductos()
      .subscribe({

        next: (
          data: Product[]
        ) => {

          this.productos =
            data;

          this.productosFiltrados =
            data;
        },

        error: (
          err: any
        ) => {

          console.error(
            'Error cargando productos',
            err
          );
        }
      });
  }

  buscarProducto():
  void {

    const texto =
    this.busqueda
      .toLowerCase();

    this.productosFiltrados =
    this.productos.filter(

      producto =>

      producto.nombre
      .toLowerCase()
      .includes(
        texto
      )
    );
  }

  agregarAlCarrito(
    producto: Product
  ): void {

    this.cartService
      .addToCart(
        producto
      );
  }

  irCatalogo():
  void {

    const catalogo =
    document.getElementById(
      'catalogo'
    );

    catalogo?.scrollIntoView({

      behavior:
      'smooth'
    });
  }

  toggleCompras():
  void {

    this.mostrarCompras =
    !this.mostrarCompras;

    if (
      this.mostrarCompras
    ) {

      this.apiService
        .obtenerPedidos()
        .subscribe({

          next:
          (data) => {

            this.pedidos =
              data;
          },

          error:
          (err) => {

            console.error(
              err
            );
          }
        });
    }
  }
}