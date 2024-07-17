import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST } from '../../constants';
import { AppEndpoints } from '../app.endpoints';
import { Order } from '../order-history/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${HOST}${AppEndpoints.ORDERS}`);
  }
}

