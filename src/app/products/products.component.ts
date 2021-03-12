import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Params, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Categories } from '../models/category';
import { MessengerService } from '../services/messenger.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[]
  categoryName : string
  product: Product[]

  constructor(
    private route: ActivatedRoute,
    private products : ProductService,
    private msg: MessengerService
    ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productNameFromRoute = routeParams.get('name');    
    this.categoryName = productNameFromRoute
    this.products.getProducts().subscribe((products) => {
      this.productList = products.filter(product => product.category === this.categoryName)
      console.log(this.productList)
    // console.log('categoryName:',this.categoryName)
    })
    this.handleSubscription()
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.productItems();
    })
  }

  productItems() {
    this.products.getProducts().subscribe(products => {
      this.productList = products.filter(product => product.category === this.categoryName)
      console.log(this.productList)      // console.log(this.cartItems)
      // this.calcCartTotal();
    })
  }
}

