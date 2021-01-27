import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { checkoutsUrl } from '../config/api';
import { CheckoutItem } from '../models/checkout-item';

@Injectable({
  providedIn: 'root'
})
export class DispatchHistoryService {

  constructor(private http: HttpClient) { }

  getHistory(): Observable<CheckoutItem[]> {
    return this.http.get<CheckoutItem[]>(checkoutsUrl)
  }

  getHistoryItem(id: number): Observable<CheckoutItem> {
    return this.http.get<CheckoutItem>(checkoutsUrl + '/' + id)
  }

  setReturnStatus(id: number,item: CheckoutItem): Observable<CheckoutItem> {
    return this.http.put<CheckoutItem>(checkoutsUrl + '/' + id, item)
  }

  reduceQty(id: number,item: CheckoutItem): Observable<CheckoutItem> {
    return this.http.put<CheckoutItem>(checkoutsUrl + '/' + id, item)
  }
}
