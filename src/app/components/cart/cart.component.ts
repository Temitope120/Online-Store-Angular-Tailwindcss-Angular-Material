import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import {loadStripe} from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Travel Box",
        price: 250,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Sneakers",
        price: 250,
        quantity: 1,
        id: 2,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Aesthetic Mug",
        price: 20,
        quantity: 1,
        id: 3,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "Yoga Mat",
        price: 20,
        quantity: 1,
        id: 4,
      }
    ]
  }


  dataSource: Array<CartItem> = [];
  displayedColumns: string[] = [
    'Product', 'Name', 'Price', 'Quantity', 'Total', 'Action',
  ];

  constructor(private cartService: CartService, private http:HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;

    })

  }


  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(){
    this.cartService.clearCart();
  }

  onRemoveFromCart(item:CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item:CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item:CartItem): void {
    this.cartService.removeQuantity(item)

  }

  onCheckOut(): void{
    this.http.post('http://localhost:4242/checkout', {
      items:this.cart.items
    } ).subscribe(async(res:any)=>{
      let stripe = await loadStripe('pk_test_51QY7N6ApQyoqt174BKdT2woaHFSkufa5OocwzKE9WU6SmGJcgzt4pyV8rFcDMRZptH3B2RlI944WJVButdQqi8Ak00bbpnHqZd');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
