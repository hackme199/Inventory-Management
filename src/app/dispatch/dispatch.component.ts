import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { FormBuilder } from '@angular/forms';
import { MessengerService } from '../services/messenger.service';


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  productForm = this.formBuilder.group({
    name: '',
    phone: ''
  });

  proceedFlag: boolean = false

  model = {name: '', phone: ''}
  dispatchList: CartItem[]

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private formBuilder: FormBuilder,
    private msg: MessengerService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    // this.cart.getCartItems().subscribe((cartItems) => {
    //   this.dispatchList = cartItems
    //   console.log(this.dispatchList)
    // })
    this.handleSubscription();
    this.loadCartItems();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: CartItem) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.dispatchList = items;
      // console.log(this.cartItems)
      // this.calcCartTotal();
      // this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      //   for (let i in items) { 
      //     this.dispatchList.push(new DispatchItem(items[i]))
      //   }
      //   console.log(this.dispatchList)
      // })
    })
  }


  onSubmit(): void {
    this.model.name = this.productForm.value.name
    this.model.phone = this.productForm.value.phone
    
  //   this.model.id = this.productList.length
    console.log(this.model)

    // console.log(this.model)
  //   this.product.addProduct(this.model)

    this.productForm.reset();
  }

}
