import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { Categories } from '../models/category'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryList: Categories[]

  constructor(private category: CategoryService) { }

  ngOnInit(): void {
    this.category.getCategories().subscribe((categories) => {
      this.categoryList = categories
      // console.log(this.categoryList)
    })
  }

}
