import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm = this.formBuilder.group({
    name: '',
    description: '',
    category:'',
    id : 401
  });

  productList : Product[]

  model : Product = {id: 10, name: '', description: '', category:'', imageUrl: ''}

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
    
    this.model.id = this.productList.length
    console.log(this.model.id)

    console.log(this.model)
    this.product.addProduct(this.model)

    this.productForm.reset();
  }

}
