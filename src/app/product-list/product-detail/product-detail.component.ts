import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../IProduct';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if (id) {
      this.getProduct(id);
    }
  }
  pageTitle = "Product Details";
  errorMessage="";
  product: IProduct | undefined;

  onBack() {
    this.router.navigate(['/products']);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: prod => this.product = prod,
      error: err => this.errorMessage = err
    });
  }
}
