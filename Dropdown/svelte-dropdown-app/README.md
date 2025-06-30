# SimpleZon Svelte Dropdown App

A modern e-commerce interface built with Svelte and Tailwind CSS, featuring a sophisticated multi-level dropdown navigation system.

## Features

- **Multi-level Dropdown Navigation**: 3-level hierarchical product filtering (Gender > Category > Brand)
- **Click-based Interaction**: Non-hover dropdown system for better mobile compatibility
- **Shopping Cart**: Full cart functionality with add/remove items and quantity management
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **State Management**: Reactive state management using Svelte stores
- **Modern UI**: Clean, modern interface with smooth animations

## Project Structure

```
src/
├── components/
│   ├── Header.svelte              # Main navigation header
│   ├── ProductsPage.svelte        # Products listing page
│   ├── CartPage.svelte           # Shopping cart page
│   ├── SuccessPage.svelte        # Order confirmation page
│   ├── MultiLevelDropdown.svelte # Complex dropdown component
│   └── ProductCard.svelte        # Individual product display
├── stores.js                     # Svelte stores for state management
├── app.css                       # Global CSS with Tailwind
├── App.svelte                    # Main app component
└── main.js                       # App entry point
```

## Technologies Used

- **Svelte**: Modern reactive framework
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd svelte-dropdown-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Product Data Structure

Products are organized with the following hierarchy:
- **Gender**: Men, Women, Home
- **Subcategory**: Shoes, Clothing, Electronics, Garden, Decor
- **Brand**: Nike, Adidas, T-Shirts, Jeans, Headphones, Smartwatch, Plants, Candles

## Key Features

### Multi-Level Dropdown
- Supports 3 levels of navigation
- Click-to-open/close (no hover required)
- Proper state management for open/closed submenus
- Closes when clicking outside
- Mobile-friendly design

### Shopping Cart
- Add items with quantity tracking
- Remove items functionality
- Real-time cart count in header
- Order total calculation
- Checkout process with confirmation

### Responsive Design
- Mobile-first approach
- Responsive grid layout
- Touch-friendly interface
- Optimized for all screen sizes

### State Management
- Centralized state using Svelte stores
- Reactive updates across components
- Persistent cart state
- Filter state management

## Customization

### Adding New Products
Edit the `products` object in `src/stores.js`:

```javascript
export const products = {
  new_product: {
    name: 'Product Name',
    price: 99,
    rating: '4.5',
    category: 'category',
    description: 'Product description',
    gender: 'men|women|home',
    subcategory: 'shoes|clothing|electronics|garden|decor',
    brand: 'brand_name'
  }
};
```

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `src/app.css` for global styles
- Component-specific styles are in individual `.svelte` files

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Performance

- Vite for fast development and building
- Svelte's compile-time optimizations
- Tailwind CSS purging for minimal CSS bundle
- Lazy loading and reactive updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
