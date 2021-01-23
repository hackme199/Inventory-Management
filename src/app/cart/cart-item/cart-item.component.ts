import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { cartUrl } from '../../config/api';
import { HttpClient } from '@angular/common/http';
import { MessengerService } from 'src/app/services/messenger.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem

  constructor(
    private http: HttpClient,
    private msg : MessengerService
    ) { }

  ngOnInit(): void {
    // console.log(this.cartItem)
  }

  handleDeleteCartItem(cartItem: CartItem) {
    if (cartItem.qty >1) {
      this.http.delete(cartUrl + "/" + cartItem.id).subscribe(() => {
        this.msg.sendMsg(this.cartItem)
      })
      // this.cartService.addProductToCart(this.productItem).subscribe(()=> {
      //   this.msg.sendMsg(this.productItem)
      // })
    }
    else {
      this.http.delete(cartUrl + "/" + cartItem.id).subscribe(() => {
        this.msg.sendMsg(this.cartItem)
      })
    }
  }

}
