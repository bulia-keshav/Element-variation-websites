// Updated multi-level-dropdown.component.ts with cart integration
import { Component, EventEmitter, Output, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  label: string;
  value?: string;
  children?: MenuItem[];
}

export interface FilterSelection {
  gender: string;
  subcategory: string;
  brand: string;
  displayText: string;
}

@Component({
  selector: 'app-multi-level-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown-container" [ngClass]="{'open': isOpen}">
      <button class="dropdown-trigger" (click)="toggleDropdown()">
        <span>{{ selectedText }}</span>
        <span class="dropdown-arrow" [ngClass]="{'rotated': isOpen}">▼</span>
      </button>
       <div class="dropdown-menu" [style.display]="isOpen ? 'block' : 'none'">
        <div 
          *ngFor="let item of menuItems" 
          class="dropdown-item"
          [ngClass]="{'has-submenu': item.children && item.children.length > 0}"
          (click)="onItemClick(item, $event)">
          
          <span>{{ item.label }}</span>
          
          <!-- Level 2 Submenu -->
          <div 
            *ngIf="item.children && item.children.length > 0 && activeItem === item"
            class="dropdown-submenu">
            <div 
              *ngFor="let subItem of item.children"
              class="dropdown-item"
              [ngClass]="{'has-submenu': subItem.children && subItem.children.length > 0}"
              (click)="onSubItemClick(subItem, $event)">
              
              <span>{{ subItem.label }}</span>

              <!-- Level 3 Submenu -->
              <div 
                *ngIf="subItem.children && subItem.children.length > 0 && activeSubItem === subItem"
                class="dropdown-submenu-l3">
                <div 
                  *ngFor="let subSubItem of subItem.children"
                  class="dropdown-item"
                  (click)="onFinalSelection(item, subItem, subSubItem, $event)">
                  {{ subSubItem.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-container {
      position: relative;
      display: inline-block;
      margin: 20px 0;
    }

    .dropdown-trigger {
      background: #232f3e;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dropdown-trigger:hover {
      background: #37475a;
    }

    .dropdown-arrow {
      transition: transform 0.3s;
    }

    .dropdown-arrow.rotated {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 200px;
      z-index: 1000;
    }

    .dropdown-item {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    .dropdown-item:last-child {
      border-bottom: none;
    }

    .dropdown-item:hover {
      background: #f8f9fa;
    }

    .dropdown-item.has-submenu::after {
      content: "►";
      color: #666;
    }

    .dropdown-submenu {
      position: absolute;
      left: 100%;
      top: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 180px;
      z-index: 1001;
    }

    .dropdown-submenu-l3 {
      position: absolute;
      left: 100%;
      top: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 160px;
      z-index: 1002;
    }
  `]
})
export class MultiLevelDropdownComponent {
  @Input() selectedText: string = 'All Products';
  @Output() selectionChange = new EventEmitter<FilterSelection>();

  isOpen: boolean = false;
  activeItem: MenuItem | null = null;
  activeSubItem: MenuItem | null = null;

  menuItems: MenuItem[] = [
    {
      label: 'Men',
      children: [
        {
          label: 'Shoes',
          children: [
            { label: 'Nike', value: 'nike' },
            { label: 'Adidas', value: 'adidas' }
          ]
        },
        {
          label: 'Clothing',
          children: [
            { label: 'T-Shirts', value: 'tshirts' },
            { label: 'Jeans', value: 'jeans' }
          ]
        }
      ]
    },
    {
      label: 'Women',
      children: [
        {
          label: 'Shoes',
          children: [
            { label: 'Nike', value: 'nike' },
            { label: 'Adidas', value: 'adidas' }
          ]
        },
        {
          label: 'Electronics',
          children: [
            { label: 'Headphones', value: 'headphones' },
            { label: 'Smartwatch', value: 'smartwatch' }
          ]
        }
      ]
    },
    {
      label: 'Home',
      children: [
        { label: 'Plants', value: 'plants' },
        { label: 'Candles', value: 'candles' }
      ]
    }
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.resetActiveStates();
    }
  }

  onItemClick(item: MenuItem, event: Event): void {
    if (item.children && item.children.length > 0) {
      event.stopPropagation();
      this.activeItem = this.activeItem === item ? null : item;
      this.activeSubItem = null; // Close level 3 when toggling level 2
    }
  }

  onSubItemClick(subItem: MenuItem, event: Event): void {
    if (subItem.children && subItem.children.length > 0) {
      event.stopPropagation();
      this.activeSubItem = this.activeSubItem === subItem ? null : subItem;
    }
  }

  onFinalSelection(mainItem: MenuItem, subItem: MenuItem, finalItem: MenuItem, event: Event): void {
    event.stopPropagation();
    
    const selection: FilterSelection = {
      gender: mainItem.label.toLowerCase(),
      subcategory: subItem.label.toLowerCase(),
      brand: finalItem.value || finalItem.label.toLowerCase(),
      displayText: `${mainItem.label} > ${subItem.label} > ${finalItem.label}`
    };

    this.selectedText = selection.displayText;
    this.selectionChange.emit(selection);
    this.closeDropdown();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeDropdown();
    }
  }

  private closeDropdown(): void {
    this.isOpen = false;
    this.resetActiveStates();
  }

  private resetActiveStates(): void {
    this.activeItem = null;
    this.activeSubItem = null;
  }
}

// Updated ProductFilterComponent with cart integration
@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, MultiLevelDropdownComponent],
  template: `
    <div>
      <h1>Shop Our Products</h1>
      
      <app-multi-level-dropdown
        [selectedText]="currentFilterText"
        (selectionChange)="onFilterChange($event)">
      </app-multi-level-dropdown>

      <div class="products-section">
        <h2>{{ productsTitle }}</h2>
        <div class="products-grid">
          <div *ngFor="let product of filteredProducts" class="product">
            <div class="category-tag">{{ product.category | titlecase }}</div>
            <h3>{{ product.name }}</h3>
            <div class="product-info">
              <div>{{ product.description }}</div>
              <div class="price">\${{ product.price }}</div>
              <div class="rating">★★★★☆ {{ product.rating }}</div>
            </div>
            <button class="add-btn" (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-section h2 {
      margin: 30px 0 20px 0;
      color: #232f3e;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .product {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .product:hover {
      transform: translateY(-2px);
    }

    .product h3 {
      color: #232f3e;
      margin-bottom: 10px;
    }

    .product-info {
      margin: 10px 0;
    }

    .category-tag {
      background: #e8f4f8;
      color: #007185;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      margin-bottom: 8px;
      display: inline-block;
    }

    .price {
      font-size: 18px;
      font-weight: bold;
      color: #b12704;
    }

    .rating {
      color: #ff9900;
      margin: 5px 0;
    }

    .add-btn {
      background: #ff9900;
      color: black;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .add-btn:hover {
      background: #e68900;
    }
  `]
})
export class ProductFilterComponent {
  @Output() cartUpdate = new EventEmitter<any>();
  
  currentFilterText: string = 'All Products';
  productsTitle: string = 'Featured Products';
  currentFilter: FilterSelection | null = null;

  // Updated products data to match the HTML version
  allProducts = [
    // Featured Products (shown initially)
    { id: 'headphones', name: 'Wireless Headphones', price: 89, rating: '4.2', category: 'electronics', description: 'Bluetooth noise-canceling headphones', gender: 'women', subcategory: 'electronics', brand: 'headphones' },
    { id: 'smartwatch', name: 'Smart Fitness Watch', price: 199, rating: '4.4', category: 'electronics', description: 'Track your fitness and health metrics', gender: 'women', subcategory: 'electronics', brand: 'smartwatch' },
    { id: 'tshirt', name: 'Cotton T-Shirt', price: 25, rating: '4.0', category: 'clothing', description: 'Comfortable 100% cotton t-shirt', gender: 'men', subcategory: 'clothing', brand: 'tshirts' },
    { id: 'plant', name: 'Indoor Plant Set', price: 45, rating: '4.5', category: 'home', description: 'Set of 3 air-purifying plants', gender: 'home', subcategory: 'garden', brand: 'plants' },
    { id: 'candle', name: 'Scented Candles Pack', price: 32, rating: '4.2', category: 'home', description: 'Pack of 4 aromatherapy candles', gender: 'home', subcategory: 'decor', brand: 'candles' },
    
    // Nike Products (only visible through dropdown)
    { id: 'nike_air_max_90', name: 'Nike Air Max 90', price: 110, rating: '4.6', category: 'shoes', description: 'Classic Air Max with visible air cushioning', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    { id: 'nike_air_max_pro', name: 'Nike Air Max Pro', price: 95, rating: '4.5', category: 'shoes', description: 'Professional running shoes with advanced cushioning', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    { id: 'nike_air_max_270', name: 'Nike Air Max 270', price: 130, rating: '4.7', category: 'shoes', description: 'Lifestyle shoes with maximum Air unit', gender: 'men', subcategory: 'shoes', brand: 'nike' },
    { id: 'nike_women_air_max', name: 'Nike Women Air Max', price: 105, rating: '4.4', category: 'shoes', description: 'Stylish women\'s Air Max sneakers', gender: 'women', subcategory: 'shoes', brand: 'nike' },
    
    // Other brand products
    { id: 'adidas_ultraboost', name: 'Adidas Ultraboost', price: 180, rating: '4.7', category: 'shoes', description: 'Premium running shoes with boost technology', gender: 'men', subcategory: 'shoes', brand: 'adidas' },
    { id: 'adidas_women', name: 'Adidas Women Sneakers', price: 140, rating: '4.3', category: 'shoes', description: 'Comfortable women\'s sneakers', gender: 'women', subcategory: 'shoes', brand: 'adidas' },
    { id: 'jeans', name: 'Denim Jeans', price: 65, rating: '4.3', category: 'clothing', description: 'Classic fit blue denim jeans', gender: 'men', subcategory: 'clothing', brand: 'jeans' }
  ];

  get filteredProducts() {
    if (!this.currentFilter) {
      // Show featured products when no filter is applied
      return this.allProducts.filter(p => ['headphones', 'smartwatch', 'tshirt', 'plant', 'candle'].includes(p.id));
    }

    return this.allProducts.filter(product => 
      product.gender === this.currentFilter!.gender && 
      product.subcategory === this.currentFilter!.subcategory && 
      product.brand === this.currentFilter!.brand
    );
  }

  onFilterChange(selection: FilterSelection): void {
    this.currentFilter = selection;
    this.currentFilterText = selection.displayText;
    this.productsTitle = selection.displayText;
  }

  addToCart(product: any): void {
    this.cartUpdate.emit(product);
  }
}
