import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { CheckoutItem } from '../models/checkout-item';
import { DispatchHistoryService } from '../services/dispatch-history.service';

@Component({
  selector: 'app-view-dispatch',
  templateUrl: './view-dispatch.component.html',
  styleUrls: ['./view-dispatch.component.css']
})
export class ViewDispatchComponent implements OnInit {

  historyList : CheckoutItem[]
  dispatchId : number
  itemToView: CheckoutItem
  markFlag= false

  constructor(
    private history: DispatchHistoryService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const dispatchIdfromRoute = routeParams.get('id');    
    this.dispatchId = +dispatchIdfromRoute

    // this.history.getHistoryItem(this.dispatchId).subscribe(data => {
    //   this.itemToView = data
    //   console.log(this.itemToView)
    // })
    this.fetchItemToView()

    this.markFlag = this.itemToView.returnStatus
  }

  fetchItemToView() {
    this.history.getHistoryItem(this.dispatchId).subscribe(data => {
      this.itemToView = data
      // console.log(this.itemToView)
    })
  }

  returned () {
    this.itemToView.returnStatus = true
    this.markFlag = true
    this.itemToView.returnStatus = this.markFlag
    this.history.setReturnStatus(this.dispatchId , this.itemToView).subscribe(updatedItem => {
      this.itemToView = updatedItem
    })

    this.fetchItemToView()
  }

  reduceQty(item : CartItem) {
    this.itemToView.cartItems.forEach( cartItem => {
      if(cartItem.id === item.id) {
        if(cartItem.qty ==0 || this.itemToView.returnStatus){
          return 
        }
        cartItem.qty--
      }
    })
    this.history.reduceQty(this.dispatchId, this.itemToView).subscribe(data =>{
      this.itemToView = data
    })
    this.fetchItemToView()
  }

}
