import { Component, OnInit } from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  performFilter(value: string): IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter((x: IProduct) => x.productName.toLocaleLowerCase().includes(value));
  }

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.products = this.service.getProducts();
    this.listFilter = '';
  }
  private _listFilter: string = '';

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;    
    this.filteredProducts = this.performFilter(value);
  }

  showImage = false;
  imageWidth = 50;
  imageMargin = 2;
  pageTitle = "Product List";
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  toogleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingChange(message: string): void {
    this.pageTitle = "Product List : " + message;
  }

}
