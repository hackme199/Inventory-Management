import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from '../models/cart-item';
import { cartUrl, productsUrl } from '../config/api';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { MessengerService } from './messenger.service';
import { ProductService } from './product.service';
import { ProductsComponent } from '../products/products.component';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  constructor(
    private http: HttpClient,
    private msg : MessengerService,
    private products: ProductService
    ) { }

  getCartItems(): Observable<CartItem[]> {
    //TODO: Mapping the obtained result to our CartItem props. (pipe() and map())
    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];

        for (let item of result) {
          // console.log(item)
          let productExists = false

          for (let i in cartItems) {
            if (cartItems[i].productId === item.product.id) {
              cartItems[i].qty++
              productExists = true
              break;
            }
          }

          if (!productExists) {
            cartItems.push(new CartItem(item.id, item.product));
          }
        }
        // console.log(cartItems)

        return cartItems;
      })
    );
  }

  clearCart(){
    this.http.get<CartItem[]>(cartUrl).subscribe(cartItems => {
      // console.log(cartItems)
      cartItems.forEach(item => {
        console.log(item)
        this.http.delete(cartUrl + '/' + item.id).subscribe(()=> {
          this.msg.sendMsg(item)
        })
      })
    })
    this.getCartItems().subscribe(cartItems => {
      // console.log(cartItems)
      cartItems.forEach(item => {
        console.log(item)
        // this.http.delete(cartUrl + '/' + item.id).subscribe(()=> {
        //   this.msg.sendMsg(item)
        // })
      })
    })
  }

  addProductToCart(product: Product): Observable<any> {
    // product.qty--
    // this.http.post(productsUrl, { product });
    return this.http.post(cartUrl, { product })
  }

  reduceQty(product: Product): Observable<any> {
    var newProd = product.qty--
    this.http.delete(productsUrl + '/' + product.id).subscribe(() => {
      this.msg.sendMsg(newProd);
    })
    return this.http.post(productsUrl, product);
  }

  incQty(product: Product): Observable<any> {
    var newProd = product.qty++
    this.http.delete(productsUrl + '/' + product.id).subscribe(() => {
      this.msg.sendMsg(newProd);
    })
    return this.http.post(productsUrl, product);
  }
}