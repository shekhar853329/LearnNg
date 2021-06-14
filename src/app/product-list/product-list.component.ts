import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './IProduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  showImage = false;
  imageWidth = 50;
  imageMargin = 2;
  pageTitle = "Product List";
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  errormessage = '';

  sub!: Subscription;

  private _listFilter: string = '';

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  performFilter(value: string): IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter((x: IProduct) => x.productName.toLocaleLowerCase().includes(value));
  }

  constructor(private service: ProductService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.service.getProducts().subscribe(
      data => {
        this.products = data
        this.filteredProducts = this.products
      }
      ,
      error => {
        this.errormessage = error; console.log(this.errormessage);
      }
    );
    this.listFilter = '';
  }
  
  toogleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingChange(message: string): void {
    this.pageTitle = "Product List : " + message;
  }

}
