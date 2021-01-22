import { Component, OnInit,ViewChild,NgModule  } from '@angular/core';

import { Categories } from '../../models/category';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm = this.formBuilder.group({
    name: '',
    id: 200
  });

  categoryList: Categories[]
  addedCategory : boolean = false
  model: Categories = { name: '', id: 200 }

  constructor(
    private product: ProductService,
    private route: ActivatedRoute,
    private category: CategoryService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.category.getCategories().subscribe(categories => {
      this.categoryList = categories
    })
  }

  onSubmit(): void {
    // Process checkout data here
    // this.items = this.cartService.clearCart();
    // console.warn('Your order has been submitted', this.categoryForm.value);
    this.model.name = this.categoryForm.value.name
    this.model.id = this.categoryList.length
    console.log(this.model)
    this.category.addCategory(this.model)
    this.addedCategory = true
    this.categoryForm.reset();
  }

}
