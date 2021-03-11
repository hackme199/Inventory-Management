import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { CheckoutItem } from '../models/checkout-item';
import { DispatchHistoryService } from '../services/dispatch-history.service';
import { jsPDF } from 'jspdf';

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

  remove_X(){
    if (!document.getElementById("XBut")){
      return
    }
    if(document.getElementById("XBut")){
      var element = document.getElementById("XBut");
      element.parentNode.removeChild(element);
      this.remove_X()
    }
  }

  print(areaID): void {
    let printContents, popupWin;
    // printContents = document.getElementById('print-section').innerHTML;
    if(document.getElementById("retBut")){
      var element = document.getElementById("retBut");
      element.parentNode.removeChild(element);
    }
    if(document.getElementById("XBut")){
      this.remove_X()
    }
    
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
        // <body style="background-image: url('../assets/acpBg.jpeg');" onload="window.print();window.close()">
    popupWin.document.write(`
      <html>
        <head>
          <title>Dispatch Reciept</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
        </head>
    <body onload="window.print();window.close()">
    <center><img src="../assets/acpLogo.jpeg" height="100px"></center>
    ${printContents}
    </body>
      </html>`
    );
    popupWin.document.close();
    location.reload(); 
    // window.print()
}

}
