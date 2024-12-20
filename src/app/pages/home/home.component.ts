import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/components/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  cols: number = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;


  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products;
      console.log(this.products, 'check for id');

    })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];


  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log(newCategory, 'got here?');
    this.getProducts();
    
  }

  onAddItemToCart(product: Product): void {
    console.log(product, 'here');

    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    })
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort:string): void{
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
