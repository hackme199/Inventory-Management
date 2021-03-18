import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessengerService } from '../services/messenger.service';
import { CheckoutService } from '../services/checkout.service';
import { getMaxListeners } from 'process';


@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  dispatchForm = this.formBuilder.group({
    // name: '',
    name: new FormControl(name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    // phone: '',
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10), Validators.maxLength(10)
    ]),
    place: new FormControl('',[
      Validators.required]),
    dispatcherName: new FormControl(name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    remarks: ''
  });

  get name() { return this.dispatchForm.get('name'); }
  get dispatcherName() { return this.dispatchForm.get('dispatcherName'); }
  get place() { return this.dispatchForm.get('place'); }
  get phone() { return this.dispatchForm.get('phone'); }


  myDate = new Date();

  proceedFlag: boolean = false

  model = {
    name: '',
    phone: 0,
    place: '',
    dispatcherName: '',
    remarks: '',
    cartItems: [],
    date: this.myDate,
    returnStatus: false
  }
  dispatchList: CartItem[]

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private formBuilder: FormBuilder,
    private msg: MessengerService,
    private cartService: CartService,
    private checkout: CheckoutService
    ) { }

  ngOnInit(): void {
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
    })
  }

  onSubmit() {
    this.model.name = this.dispatchForm.value.name
    this.model.place = this.dispatchForm.value.place
    this.model.phone = this.dispatchForm.value.phone
    this.model.dispatcherName = this.dispatchForm.value.dispatcherName
    this.model.remarks = this.dispatchForm.value.remarks
    this.model.cartItems = this.dispatchList

    this.checkout.writeToCheckout(this.model).subscribe((data) => {
      console.log(data)
    })
    this.proceedFlag = true

    this.cartService.clearCart()
    console.log(this.model)

    this.http.post('https://formspree.io/f/xrgonwvq',
        { Name: this.model.name, Place:this.model.place,
          Phone: this.model.phone, Dispatcher: this.model.dispatcherName, Remarks: this.model.remarks,
          Items: this.model.cartItems},
        ).subscribe(
          response => {
            console.log(response);
          }
        );
    
  }

}
