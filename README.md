# Grand Bay of the Sea - Punta Cana Dive Center Website

## 🌊 Project Overview

Grand Bay of the Sea is a modern, professional website for a premier dive center located in Punta Cana, Dominican Republic. This comprehensive web application showcases diving courses, excursions, dive sites, and provides seamless booking and payment functionality for visitors looking to explore the underwater world of the Caribbean.

**Live Website**: [https://www.grandbay-puntacana.com/](https://www.grandbay-puntacana.com/)

## 🚀 Key Features

### 🏊‍♂️ Diving Services
- **Scuba Diving Courses**: From beginner (Discover Scuba Diving) to advanced certifications (Advanced Open Water, Deep Diver, Wreck Diver, etc.)
- **Dive Excursions**: Catalina Island, Saona Island, Bayahibe, and Shark Dive experiences
- **Liveaboard Adventures**: Whale watching and Silverbank expeditions
- **Local Dive Sites**: Comprehensive information about dive locations around Punta Cana

### 💳 Booking & Payment System
- **PayPal Integration**: Secure payment processing for deposits and full payments
- **Dynamic Pricing**: Real-time price calculations based on guest count and package selection
- **Date Selection**: Smart date picker with availability restrictions (no Sunday operations)
- **Booking Forms**: Comprehensive forms with guest information, certification levels, and preferences

### 📱 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Photo Galleries**: High-quality image showcases with lightbox functionality
- **Video Backgrounds**: Immersive video content using Cloudinary integration
- **Smooth Animations**: Motion-based interactions for enhanced user engagement

### 🎨 Content Management
- **Contentful CMS**: Headless CMS for easy content updates and management
- **Rich Text Support**: Flexible content editing with rich text formatting
- **SEO Optimization**: Meta tags, sitemaps, and structured data for search engines
- **Multi-language Ready**: Internationalization support structure

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15**: Latest version with App Router for optimal performance
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type-safe development experience

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Headless UI**: Accessible UI components
- **Heroicons**: Beautiful SVG icons
- **Motion**: Smooth animations and transitions

### Content & Media
- **Contentful**: Headless CMS for content management
- **Cloudinary**: Video and image optimization
- **Plaiceholder**: Image placeholder generation for better loading experience

### Payment & Forms
- **PayPal React SDK**: Secure payment processing
- **React Email**: Email template generation
- **Nodemailer**: Server-side email functionality

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Sharp**: Image processing and optimization

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (root)/            # Main website routes
│   │   ├── courses/       # Scuba diving courses
│   │   ├── trips/         # Dive excursions
│   │   ├── sites/         # Dive sites information
│   │   ├── photo-gallery/ # Image galleries
│   │   └── contact/       # Contact information
│   ├── (tui)/             # TUI-specific routes (no-index)
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── layout/           # Header, footer, navigation
│   ├── HeroComponent/    # Hero sections and backgrounds
│   ├── PaymentComponents/ # Booking and payment forms
│   ├── PayPalComponents/ # PayPal integration
│   ├── CourseCards/      # Course display components
│   └── RichTextComponents/ # Content rendering
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
├── hooks/                # Custom React hooks
├── styles/               # Global styles and CSS
└── emails/               # Email templates
```

## 🎯 Main Pages & Features

### Homepage (`/`)
- Hero section with dynamic background images
- Service overview with interactive cards
- Video backgrounds showcasing diving experiences
- Google Maps integration for location
- Diving organization certifications

### Courses (`/courses`)
- **Discover Scuba Diving**: Introduction course for beginners
- **Scuba Diver**: Basic certification (12m/40ft depth limit)
- **Open Water Diver**: Full certification for worldwide diving
- **Advanced Open Water**: Advanced techniques and deep diving
- **Specialty Courses**: Shark Conservation, Enriched Air, Wreck Diver, etc.

### Trips (`/trips`)
- **Catalina Island**: Day trips to pristine dive sites
- **Saona Island**: Caribbean island adventures
- **Bayahibe**: Local dive site excursions
- **Shark Dive**: Thrilling shark encounters
- **Whale Watching**: Seasonal marine life experiences

### Dive Sites (`/sites`)
- Detailed information about local dive locations
- Depth information and difficulty levels
- Marine life descriptions
- Interactive site cards with expandable content

### Photo Gallery (`/photo-gallery`)
- High-quality image showcases
- Lightbox functionality for full-screen viewing
- Organized by categories and experiences
- Optimized loading with placeholders

## 💳 Payment System

### PayPal Integration
- **Secure Processing**: Live PayPal integration for production
- **Deposit System**: 50% deposit required for bookings
- **Dynamic Pricing**: Real-time calculation based on guest count
- **Form Validation**: Complete form validation before payment
- **Booking Confirmation**: Automatic email notifications

### Booking Features
- **Date Selection**: Smart calendar with availability restrictions
- **Guest Management**: Support for 1-20 guests per booking
- **Certification Levels**: Diver certification tracking
- **Hotel Information**: Pickup and accommodation details
- **Tour Selection**: Multiple excursion options

## 🎨 Design & UX Features

### Visual Elements
- **Hero Sections**: Full-screen background images and videos
- **Clipped Paths**: Modern geometric design elements
- **Responsive Images**: Optimized for all device sizes
- **Smooth Transitions**: Motion-based page transitions
- **Interactive Cards**: Hover effects and animations

### User Interface
- **Navigation**: Dropdown menus with hover functionality
- **Mobile-First**: Responsive design optimized for mobile
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔧 Development & Deployment

### Environment Setup
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Code formatting
npm run format

# Linting
npm run lint
```

### Environment Variables
Required environment variables for full functionality:
- `CONTENTFUL_SPACE_ID`: Contentful space identifier
- `CONTENTFUL_ACCESS_TOKEN`: Contentful API access token
- PayPal configuration (configured in components)

### Deployment
- **Platform**: Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Image Optimization**: Netlify image optimization plugin
- **CDN**: Global content delivery network

## 📊 Performance Optimizations

### Image Optimization
- **Next.js Image Component**: Automatic optimization
- **Plaiceholder**: Blur placeholders for better UX
- **Sharp**: High-performance image processing
- **Responsive Images**: Device-specific image sizes

### Loading Performance
- **Static Generation**: Pre-rendered pages for fast loading
- **Code Splitting**: Automatic bundle optimization
- **Lazy Loading**: Images and components loaded on demand
- **Service Worker**: Caching for offline functionality

## 🔍 SEO & Marketing

### Search Engine Optimization
- **Meta Tags**: Dynamic meta descriptions and titles
- **Structured Data**: Rich snippets for search results
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling directives
- **Canonical URLs**: Duplicate content prevention

### Social Media
- **Open Graph**: Facebook and social media sharing
- **Twitter Cards**: Twitter-specific meta tags
- **Social Links**: Facebook, Instagram, WhatsApp integration
- **Contact Information**: Email and phone number display

## 🛡️ Security Features

### Data Protection
- **HTTPS**: Secure communication protocol
- **Form Validation**: Client and server-side validation
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Cross-site request forgery prevention
- **Input Sanitization**: Clean data processing

### Payment Security
- **PayPal Security**: PCI-compliant payment processing
- **No Card Storage**: Payment data handled by PayPal
- **Secure Forms**: Encrypted form submissions
- **Session Management**: Secure user sessions

## 📞 Contact & Support

### Business Information
- **Company**: Grand Bay of the Sea
- **Location**: Punta Cana, Dominican Republic
- **Email**: [karnes.james@gmail.com](mailto:karnes.james@gmail.com)
- **Website**: [https://www.grandbay-puntacana.com/](https://www.grandbay-puntacana.com/)

### Social Media
- **Facebook**: [Grand Bay of the Sea](https://www.facebook.com/grandbayofthesea)
- **Instagram**: [@grandbayofthesea](https://www.instagram.com/grandbayofthesea)
- **WhatsApp**: +1 (829) 723-9338

## 📄 License

This project is proprietary software developed for Grand Bay of the Sea dive center. All rights reserved.

---

**Developer**: James Karnes  
**Last Updated**: 2024  
**Version**: 1.0.0
