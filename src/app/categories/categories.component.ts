import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  productsList: Product[]

  constructor(private category: CategoryService) { }

  ngOnInit(): void {
    this.productsList = this.category.getCategories()
  }

}
