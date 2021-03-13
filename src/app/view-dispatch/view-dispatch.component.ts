import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { CheckoutItem } from '../models/checkout-item';
import { DispatchHistoryService } from '../services/dispatch-history.service';
import { jsPDF } from 'jspdf';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { MessengerService } from '../services/messenger.service';

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
  qtyFlag = false
  qtyCounter = 0

  constructor(
    private history: DispatchHistoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private msg : MessengerService
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
    this.chkQty()

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

  chkQty() {
    this.qtyCounter=0
    this.itemToView.cartItems.forEach(item => {
      this.qtyCounter += item.qty
    })
    console.log(this.qtyCounter)
    if (this.qtyCounter == 0) {
      this.itemToView.returnStatus = true
      console.log(this.qtyFlag)
      // return this.qtyFlag
    }
  }

  reduceQty(item : CartItem) {
    this.itemToView.cartItems.forEach( cartItem => {
      if(cartItem.id === item.id) {
        if(cartItem.qty ==0 || this.itemToView.returnStatus){
          return 
        }
        cartItem.qty--
        this.chkQty()
       
        this.productService.getProduct(cartItem.productId).subscribe(product => {
                  console.log(product)
                  this.cartService.incQty(product).subscribe(() => {
                    this.msg.sendMsg(product)
                  })
                })
      }
    })
    this.history.reduceQty(this.dispatchId, this.itemToView).subscribe(data =>{
      this.itemToView = data
    })
    this.fetchItemToView()
  }

//   handleDeleteCartItem(cartItem: CartItem) {
//     if (cartItem.qty >1) {
//       this.productService.getProduct(cartItem.productId).subscribe(product => {
//         console.log(product)
//         this.cartService.incQty(product).subscribe(() => {
//           this.msg.sendMsg(product)
//         })
//       })
//       this.http.delete(cartUrl + "/" + cartItem.id).subscribe(() => {
//         this.msg.sendMsg(this.cartItem)
//       })
      
//       // this.cartService.addProductToCart(this.productItem).subscribe(()=> {
//       //   this.msg.sendMsg(this.productItem)
//       // })
//     }
//     else {
//       this.productService.getProduct(cartItem.productId).subscribe(product => {
//         console.log(product)
//         this.cartService.incQty(product).subscribe(() => {
//           this.msg.sendMsg(product)
//         })
//       })
//       this.http.delete(cartUrl + "/" + cartItem.id).subscribe(() => {
//         this.msg.sendMsg(this.cartItem)
//       })
//     }
//   }

// }

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
