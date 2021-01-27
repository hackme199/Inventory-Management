import { Injectable } from '@angular/core';
import { CheckoutItem } from '../models/checkout-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { checkoutsUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  checkoutItem : CheckoutItem

  constructor(private http : HttpClient) { }

  writeToCheckout(item: CheckoutItem): Observable<CheckoutItem> {
    return this.http.post<CheckoutItem>(checkoutsUrl, item );
  }
}
