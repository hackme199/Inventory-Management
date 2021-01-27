import { Component, OnInit } from '@angular/core';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CheckoutItem } from '../models/checkout-item';
import { DispatchItem } from '../models/dispatch-item';
import { DispatchHistoryService } from '../services/dispatch-history.service';

@Component({
  selector: 'app-dispatch-history',
  templateUrl: './dispatch-history.component.html',
  styleUrls: ['./dispatch-history.component.css']
})
export class DispatchHistoryComponent implements OnInit {

  historyList : CheckoutItem[]

  constructor(private history: DispatchHistoryService) { }

  ngOnInit(): void {
    this.history.getHistory().subscribe(dispatchedItems => {
      this.historyList = dispatchedItems.reverse()
      console.log(this.historyList)
    })
  }

}
