import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm = this.formBuilder.group({
    name: new FormControl(name, [
      Validators.required,
      Validators.minLength(4),
    ]),
    // name: '',
    description: '',
    category:'',
    id : 401,
    qty: 1
  });

  productList : Product[]
  addedProduct: boolean = false

  get name() { return this.productForm.get('name'); }

  model : Product = {id: 10, name: '', description: '', category:'', imageUrl: '', qty: 10}

  constructor(
    private product: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categoryNameFromRoute = routeParams.get('category');
    this.model.category = categoryNameFromRoute
    this.product.getProducts().subscribe(products => {
      this.productList = products
    })
  }

  onSubmit(): void {
    this.model.name = this.productForm.value.name
    this.model.description = this.productForm.value.description
    
    this.model.id = this.productList.length+1
    // console.log(this.model.id)

    this.model.qty = this.productForm.value.qty
    // console.log(this.model.qty)

    // console.log(this.model)
    this.product.addProduct(this.model)

    this.addedProduct = true
    this.product.getProducts().subscribe(products => {
      this.productList = products
    })

    this.productForm.reset();
  }

}
