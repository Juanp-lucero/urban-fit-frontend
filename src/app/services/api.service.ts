import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product }
from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl =
  'https://urban-fit-backend.onrender.com';

  constructor(
    private http:
    HttpClient
  ) {}

  obtenerProductos():
  Observable<Product[]> {

    return this.http.get<Product[]>(
      `${this.apiUrl}/productos`
    );
  }

  crearPedido(
    pedido: any
  ) {

    return this.http.post(
      `${this.apiUrl}/pedidos`,
      pedido
    );
  }

  obtenerPedidos() {

    return this.http.get<any[]>(
      `${this.apiUrl}/pedidos`
    );
  }
}