# HomeDecor Indonesia - Project Documentation

## 🏠 Project Overview

**HomeDecor Indonesia** is a modern e-commerce website built with Next.js 14.2.20, specializing in home furniture, decorations, and interior design products. The platform integrates with WooCommerce for backend e-commerce functionality and provides a comprehensive shopping experience for home decor enthusiasts in Indonesia.

### 🛠️ Technology Stack

- **Framework**: Next.js 14.2.20 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **State Management**: React hooks with Next.js built-in features
- **E-commerce**: WooCommerce REST API integration
- **Theme**: Dark mode support with next-themes
- **Icons**: Lucide React & React Icons
- **Animations**: Framer Motion
- **Typography**: Poppins Google Font + Futura Book local font
- **Package Manager**: npm

## 📁 Project Structure

```
homedecorindonesia/
├── app/                          # Next.js App Router structure
│   ├── api/                      # API routes (WooCommerce integration)
│   │   ├── products/             # Product listing API
│   │   ├── products/[id]/        # Single product API
│   │   ├── orders/               # Orders API
│   │   └── menu/                 # Menu API
│   ├── furniture/               # Furniture categories
│   │   ├── bedroom/              # Bedroom furniture subcategories
│   │   ├── dining-room/         # Dining room furniture subcategories
│   │   └── living-room/         # Living room furniture subcategories
│   ├── product/[slug]/           # Dynamic product pages
│   ├── about-us/                 # About page
│   ├── all-galery/              # Gallery page
│   ├── blogs/                   # Blog page
│   ├── curtains/                # Curtains category
│   ├── rugs/                    # Rugs category
│   ├── upholstery/              # Upholstery category
│   ├── wallpapers/              # Wallpapers category
│   ├── fonts/                   # Custom fonts directory
│   ├── layout.jsx               # Root layout component
│   ├── page.jsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── Homepage/                # Homepage-specific components
│   ├── Header/                  # Navigation components
│   ├── Product/                 # Product-related components
│   ├── Common/                  # Common utility components
│   ├── Footer.jsx               # Footer component
│   ├── Carousel.jsx             # Hero carousel
│   ├── ProductsGrid.jsx         # Product grid display
│   ├── ProductsPage.jsx         # Product listing page
│   ├── BottomNavigation.jsx     # Mobile navigation
│   ├── WhatsappFloating.jsx     # WhatsApp contact button
│   └── BlogSection.jsx          # Blog section component
├── lib/                         # Utility libraries
│   ├── utils.js                 # CN utility function for styling
│   └── woocommerce.js           # WooCommerce API integration
├── constant/                    # Constants and configuration
│   └── index.js                 # Navigation links and menu structure
├── services/                    # Service layer
│   ├── api.js                   # API service functions
│   ├── media.js                 # Media service
│   └── pages.js                 # Page-related services
├── public/                      # Static assets
│   └── img/                     # Images organized by category
│       ├── category/
│       ├── reviews/
│       ├── services/
│       ├── shop-by-fabrics/
│       └── shop-by-room/
├── .env.local                   # Environment variables (not tracked)
├── package.json                 # Dependencies and scripts
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # Project documentation
```

## 🌐 Website Sitemap

### Primary Navigation
- **Home** (`/`) - Main landing page with hero carousel and featured sections
- **Furniture** (`/furniture`) - Main furniture category with multi-level dropdown
- **Lighting** (`/lighting`) - Lighting products category
- **Decoration** (`/home-decor`) - Home decoration items
- **Cushions** - Various types of cushions
- **Fabrics** - Drapery and promotional fabrics
- **Rugs** (`/rugs`) - Rugs collection
- **Curtains** (`/curtains`) - Curtains collection
- **Upholstery** (`/upholstery`) - Upholstery services
- **Wallpapers** (`/wallpapers`) - Wallpaper collection
- **Flooring** (`/flooring`) - Flooring options
- **Catalogues** (`/catalogues`) - Product catalogs
- **Photo Gallery** (`/all-galery`) - Visual gallery
- **Blog** (`/blogs`) - Articles and inspiration
- **SALE** - Discounted items and promotions

### Furniture Category Structure

#### Living Room (`/furniture/living-room/`)
- **Sofas** (`/furniture/living-room/sofas`)
- **Sectional & Corner Sofas** (`/furniture/living-room/sectional-corner-sofas`)
- **Day Bed / Cleopatra** (`/furniture/living-room/cleopatra-day-beds`)
- **Arm Chairs** (`/furniture/living-room/arm-chairs`)
- **Side Table** (`/furniture/living-room/side-table`)
- **Coffee Table** (`/furniture/living-room/coffee-table`)
- **Bench** (`/furniture/living-room/bench`)
- **Ottoman & Pouf** (`/furniture/living-room/ottoman-pouf`)
- **Decorative Stool** (`/furniture/living-room/decorative-stools`)
- **Console Table** (`/furniture/living-room/console-tables`)
- **Chest Drawer** (`/furniture/living-room/chests`)
- **Sideboard & Buffet** (`/furniture/living-room/buffet`)
- **TV Stand** (`/furniture/living-room/tv-stands`)
- **Room Deviders** (`/furniture/living-room/room-deviders`)

#### Bedroom (`/furniture/bedroom/`)
- **Beds** (`/furniture/bedroom/bedsets`)
- **Headboards** (`/furniture/bedroom/headboards`)
- **Bed Side Table** (`/furniture/bedroom/bed-side-nightstand`)
- **Make Up Table** (`/furniture/bedroom/makeup-table`)
- **Chest Of Drawers and Dressers** (`/furniture/bedroom/chest-of-drawers-and-dressers`)
- **TV Cabinets** (`/furniture/bedroom/tv-cabinets`)
- **Bed Benches** (`/furniture/bedroom/bed-benches`)

#### Dining Room (`/furniture/dining-room/`)
- **Dining Table** (`/furniture/dining-room/dining-tables`)
- **Dining Chairs** (`/furniture/dining-room/dining-chairs`)
- **Bar Chair** (`/furniture/dining-room/bar-chairs`)
- **Trolleys & Bar Carts** (`/furniture/dining-room/trolleys-bar-carts`)

#### Home Office (`/furniture-office/`)
- **Study Tables** (`/product-category/study-tables`)
- **Study Chairs** (`/product-category/office-chairs`)
- **Bookcase** (`/product-category/furniture/bookcases`)

#### Accents
- **Display Accent** (`/product-category/display-cabinets`)

### Dynamic Pages
- **Product Details** (`/product/[slug]`) - Individual product pages
- **Category Pages** - Dynamic category-based product listings

### Information Pages
- **About Us** (`/about-us`) - Company information and story
- **Blog** (`/blogs`) - Articles, tips, and inspiration
- **Gallery** (`/all-galery`) - Visual showcase of products

## 🎯 Key Features

### E-commerce Functionality
- **WooCommerce Integration**: Full backend integration for product management
- **Product Catalog**: Dynamic product listings with categories and filters
- **Shopping Cart**: Basic cart functionality for product management
- **Search**: Product search with WooCommerce API integration
- **Product Details**: Detailed product pages with images and specifications
- **Related Products**: Automated product recommendations
- **Order Management**: API endpoints for order processing

### User Experience
- **Responsive Design**: Mobile-first approach with dedicated bottom navigation
- **Dark Mode**: Theme switching capability
- **WhatsApp Integration**: Floating WhatsApp button for customer support
- **Carousel**: Hero banner showcasing featured products
- **Interactive Navigation**: Multi-level dropdown menus
- **Performance**: Optimized with Next.js image optimization and caching

### Homepage Sections
1. **Hero Carousel** - Featured products and promotions
2. **Shop By Category** - Category-based browsing
3. **Shop By Room** - Room-based product organization
4. **Shop By Fabrics** - Fabric-based product filtering
5. **Services** - Company services showcase
6. **Luxury Accordion** - Product features and benefits
7. **Customer Reviews** - Testimonials and social proof
8. **Showrooms** - Physical location information

## 🔧 Configuration

### Environment Variables
Required environment variables for WooCommerce integration:

```env
NEXT_PUBLIC_WC_STORE_URL=your-store-url.com
WC_READ_KEY=your-read-consumer-key
WC_READ_SECRET=your-read-consumer-secret
WC_WRITE_KEY=your-write-consumer-key
WC_WRITE_SECRET=your-write-consumer-secret
WC_FULL_KEY=your-full-consumer-key
WC_FULL_SECRET=your-full-consumer-secret
```

### WooCommerce API Clients
The project provides three levels of API access:
- **Read Client** (`createWooClientRead()`) - For fetching products and categories
- **Write Client** (`createWooClientWrite()`) - For creating and updating orders
- **Full Client** (`createWooClientFull()`) - Full administrative access

## 🎨 Design System

### Typography
- **Primary**: Poppins Google Font
- **Secondary**: Futura Book (local font)
- **Variable**: CSS custom properties for dynamic theming

### Color Scheme
- Custom CSS variables for consistent theming
- Dark mode support with next-themes
- Tailwind CSS integration with custom color palette

### Components
- **Shadcn/ui** components for consistent UI
- **Framer Motion** for smooth animations
- **Lucide React** icons for modern iconography

## 📱 Responsive Features

### Mobile Optimization
- **Bottom Navigation**: Dedicated mobile navigation bar
- **Touch-friendly**: Optimized for touch interactions
- **Responsive Grid**: Adaptive product grid layouts
- **Mobile Menu**: Hamburger menu for mobile devices

### Performance Optimization
- **Image Optimization**: Next.js Image component with remote patterns
- **Caching**: API response caching with configurable revalidation
- **Code Splitting**: Automatic code splitting with Next.js
- **SSR/SSG**: Server-side rendering with static generation where appropriate

## 🔌 API Integration

### WooCommerce REST API
- **Products API**: Fetch products, categories, and variations
- **Orders API**: Create and manage customer orders
- **Store API**: Public-facing store endpoints
- **Fallback System**: Graceful degradation between API versions

### Custom API Routes
- `/api/products` - Product listing with pagination
- `/api/products/[id]` - Individual product details
- `/api/orders` - Order management
- `/api/menu` - Navigation menu structure

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- WooCommerce store with REST API access

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd homedecorindonesia
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` file with WooCommerce API credentials:
```env
NEXT_PUBLIC_WC_STORE_URL=https://your-store.com
WC_READ_KEY=your-read-key
WC_READ_SECRET=your-read-secret
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📊 Project Status

### Recent Updates
- ✅ Modern e-commerce features implementation
- ✅ Product components enhancement
- ✅ Wallpapers page addition
- ✅ About-us page development
- ✅ WooCommerce integration improvements
- ✅ Mobile responsiveness enhancements
- ✅ Dark mode theme support

### Current Features
- ✅ Full e-commerce functionality
- ✅ Responsive design
- ✅ Modern UI components
- ✅ Search functionality
- ✅ Category-based browsing
- ✅ Product detail pages
- ✅ WhatsApp integration
- ✅ Blog section
- ✅ Customer reviews
- ✅ Gallery showcase

### Future Enhancements
- 🔄 Advanced filtering and sorting
- 🔄 User account system
- 🔄 Wishlist functionality
- 🔄 Product comparison
- 🔄 Advanced search with filters
- 🔄 Multi-language support
- 🔄 Payment gateway integration
- 🔄 Order tracking system

## 🤝 Contributing

### Development Guidelines
1. Follow Next.js App Router conventions
2. Use Tailwind CSS for styling
3. Maintain responsive design principles
4. Test on multiple devices and browsers
5. Follow JavaScript ES6+ standards

### Code Structure
- Use components for reusable UI elements
- Implement proper error handling
- Optimize images and assets
- Maintain consistent naming conventions
- Document new features and components

## 📞 Support

### Customer Support
- **WhatsApp**: Floating WhatsApp button for instant support
- **Contact**: Through website contact forms
- **Showrooms**: Physical locations for in-person assistance

### Technical Support
- **Documentation**: Comprehensive code documentation
- **API Reference**: WooCommerce API integration details
- **Performance**: Optimized for speed and user experience

---

*Last Updated: October 26, 2025*
*Version: 0.1.0*
*Framework: Next.js 14.2.20*