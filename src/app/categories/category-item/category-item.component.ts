import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Categories } from 'src/app/models/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {

  @Input() categoryItem: Categories

  constructor() { }

  ngOnInit(): void {
  }

}
