// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLevelDropdownComponent, ProductFilterComponent } from './multi-level-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MultiLevelDropdownComponent, ProductFilterComponent],
  template: `
    <div class="header">
      <div class="logo">SimpleZon</div>
      <div class="nav">
        <a href="#" 
           (click)="showProducts($event)" 
           [class.active]="currentPage === 'products'">
          Products
        </a>
        <a href="#" 
           (click)="showCart($event)" 
           [class.active]="currentPage === 'cart'">
          Cart 
          <span class="cart-count">{{ cartCount }}</span>
        </a>
      </div>
    </div>

    <div class="container">
      <!-- Products Page -->
      <div *ngIf="currentPage === 'products'" id="products-page">
        <app-product-filter 
          (cartUpdate)="onCartUpdate($event)">
        </app-product-filter>
      </div>

      <!-- Cart Page -->
      <div *ngIf="currentPage === 'cart'" class="cart-page">
        <h1>Shopping Cart</h1>
        <div *ngIf="cart.length === 0" class="empty-cart">
          Your cart is empty
        </div>
        <div *ngIf="cart.length > 0">
          <div *ngFor="let item of cart" class="cart-item">
            <div>
              <h3>{{ item.name }}</h3>
              <div>Category: {{ item.category }} | Qty: {{ item.quantity }}</div>
              <div>Rating: ★ {{ item.rating }}</div>
            </div>
            <div>
              <div class="price">\${{ item.price * item.quantity }}</div>
              <button (click)="removeFromCart(item.id)" class="remove-btn">
                Remove
              </button>
            </div>
          </div>
          
          <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-details">
              <div>Subtotal: \${{ cartTotal }}</div>
              <div>Shipping: FREE</div>
              <hr>
              <div class="total">Total: \${{ cartTotal }}</div>
            </div>
            <button class="checkout-btn" (click)="proceedToCheckout()">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <!-- Success Page -->
      <div *ngIf="currentPage === 'success'" class="success-page">
        <div class="success-container">
          <div class="success-icon">✅</div>
          <h1 class="success-title">Congratulations!</h1>
          <p class="success-subtitle">Your order has been placed successfully</p>
          
          <div class="order-summary">
            <h3>Order Summary</h3>
            <div *ngFor="let item of lastOrder.items" class="order-item">
              <span>{{ item.name }} (Qty: {{ item.quantity }})</span>
              <span>\${{ item.price * item.quantity }}</span>
            </div>
            <div class="order-item total-paid">
              <span>Total Paid:</span>
              <span>\${{ lastOrder.total }}</span>
            </div>
          </div>
          
          <button class="continue-btn" (click)="continueShopping()">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Global Styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    .header {
      background: #232f3e;
      color: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    
    .nav {
      display: flex;
      gap: 20px;
    }
    
    .nav a {
      color: white;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .nav a:hover,
    .nav a.active {
      background: #37475a;
    }
    
    .cart-count {
      background: #ff9900;
      color: black;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 12px;
      margin-left: 5px;
    }
    
    .container {
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 20px;
    }
    
    /* Cart Page Styles */
    .cart-page h1 {
      color: #232f3e;
      margin-bottom: 20px;
    }
    
    .empty-cart {
      text-align: center;
      padding: 50px;
      color: #666;
      font-size: 18px;
    }
    
    .cart-item {
      background: white;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .cart-item h3 {
      color: #232f3e;
      margin-bottom: 5px;
    }
    
    .cart-item .price {
      font-size: 18px;
      font-weight: bold;
      color: #b12704;
      margin-bottom: 10px;
    }
    
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    .remove-btn:hover {
      background: #c82333;
    }
    
    .cart-summary {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .cart-summary h2 {
      color: #232f3e;
      margin-bottom: 15px;
    }
    
    .summary-details {
      margin: 10px 0;
    }
    
    .summary-details div {
      margin: 5px 0;
    }
    
    .summary-details hr {
      margin: 10px 0;
      border: none;
      border-top: 1px solid #ddd;
    }
    
    .summary-details .total {
      font-weight: bold;
      font-size: 18px;
      color: #b12704;
    }
    
    .checkout-btn {
      background: #ff9900;
      color: black;
      border: none;
      padding: 15px 30px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
      font-size: 16px;
      margin-top: 15px;
    }
    
    .checkout-btn:hover {
      background: #e68900;
    }
    
    /* Success Page Styles */
    .success-page {
      padding: 20px 0;
    }
    
    .success-container {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .success-icon {
      font-size: 60px;
      color: #28a745;
      margin-bottom: 20px;
    }
    
    .success-title {
      font-size: 32px;
      color: #232f3e;
      margin-bottom: 10px;
    }
    
    .success-subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 16px;
    }
    
    .order-summary {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: left;
    }
    
    .order-summary h3 {
      margin-bottom: 15px;
      color: #232f3e;
    }
    
    .order-item {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 5px 0;
    }
    
    .order-item:not(:last-child) {
      border-bottom: 1px solid #dee2e6;
    }
    
    .order-item.total-paid {
      font-weight: bold;
      font-size: 18px;
      color: #b12704;
      border-top: 2px solid #dee2e6;
      padding-top: 10px;
      margin-top: 15px;
    }
    
    .continue-btn {
      background: #232f3e;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;
      font-size: 16px;
    }
    
    .continue-btn:hover {
      background: #37475a;
    }
  `]
})
export class AppComponent {
  currentPage: 'products' | 'cart' | 'success' = 'products';
  cart: any[] = [];
  lastOrder: { items: any[], total: number } = { items: [], total: 0 };

  get cartCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  showProducts(event: Event): void {
    event.preventDefault();
    this.currentPage = 'products';
  }

  showCart(event: Event): void {
    event.preventDefault();
    this.currentPage = 'cart';
  }

  onCartUpdate(cartData: any): void {
    const existingItem = this.cart.find(item => item.id === cartData.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        id: cartData.id,
        name: cartData.name,
        price: cartData.price,
        category: cartData.category,
        rating: cartData.rating,
        quantity: 1
      });
    }
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  proceedToCheckout(): void {
    this.lastOrder.items = [...this.cart];
    this.lastOrder.total = this.cartTotal;
    this.cart = [];
    this.currentPage = 'success';
  }

  continueShopping(): void {
    this.currentPage = 'products';
  }
}
