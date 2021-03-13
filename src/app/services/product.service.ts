import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { categoriesUrl, productsUrl } from '../config/api';
import { Categories } from "../models/category";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[];
  categoryList: Categories[];

  constructor(
    private http: HttpClient,
    private category : CategoryService) { }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(productsUrl);
    }

  addProduct(product: Product) {
    this.http.post<Product>(productsUrl, product).toPromise().then(data => {
      console.log(data)
      this.getProducts().subscribe(products => {
        this.productList = products})
    }) 
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(productsUrl + '/' + id)
  }

}
