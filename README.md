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

- **Sanity CMS**: Headless CMS for all site content, with Sanity Studio embedded at `/studio` — courses, trips, blog, dive sites, SEO, and the `siteSettings` singleton (logo, social links, PADI logos)
- **Portable Text**: Flexible content editing with rich text formatting (GROQ queries in `src/sanity/queries/`)
- **SEO Optimization**: Per-page Sanity-driven meta tags, sitemaps, and structured data with build-time verification
- **Bilingual**: Full English/Spanish internationalization via next-intl (`/es` URL prefix)

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15**: App Router with ISR (7-day revalidate) for optimal performance
- **React 19**: Modern React with server components and form actions
- **TypeScript**: Type-safe development experience
- **next-intl**: English/Spanish internationalization

### Styling & UI

- **Tailwind CSS**: Utility-first CSS with a semantic token system (CSS variables) powering light and dark themes
- **Bricolage Grotesque / Instrument Sans / Crimson Pro**: Display, body, and editorial typefaces via next/font
- **Headless UI**: Accessible UI components
- **Motion**: Smooth animations and transitions

### Content & Media

- **Sanity**: Headless CMS for all content (Studio embedded at `/studio`)
- **Cloudinary**: Video optimization and hero video backgrounds
- **Sanity CDN + next/image**: Crop/hotspot-aware responsive images with LQIP blur placeholders

### Payment, Data & Email

- **PayPal React SDK**: Secure payment processing
- **Supabase**: Booking record storage (server-side service role)
- **React Email + Resend/Nodemailer**: Confirmation email templates and delivery

### Development Tools

- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting
- **Sharp**: Image processing and optimization

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── (root)/[locale]/    # Public bilingual site (en default, /es prefix)
│   │   ├── courses/        # PADI courses + [slug] detail pages
│   │   ├── trips/          # Dive excursions + [slug] detail pages
│   │   ├── sites/          # Dive sites + [site] detail pages
│   │   ├── blog/           # Blog categories and posts
│   │   ├── photo-gallery/  # Image galleries
│   │   └── contact/        # Contact form + map
│   ├── (tui)/tui/          # TUI white-label routes (noindex, English)
│   ├── studio/             # Embedded Sanity Studio
│   └── api/                # API routes
├── components/              # Reusable React components
│   ├── layout/             # Header, footer, navigation
│   ├── home/               # Homepage sections (hero, booking, FAQ…)
│   ├── courses/ trips/     # Redesign page sections
│   ├── PaymentComponents/  # Booking and payment forms
│   ├── PayPalComponents/   # PayPal integration
│   ├── BlockContent/       # Portable Text rendering
│   └── ThemeToggle/        # Dark mode toggle
├── sanity/                  # Schemas, GROQ queries, client, Studio structure
├── i18n/                    # next-intl routing + navigation
├── lib/ utils/ types/       # Utilities and helpers
└── emails/                  # Email templates
messages/                    # en.json / es.json UI strings
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

- **2026 Redesign**: Coral accent (#ff6a3d) on a deep-ocean palette, Bricolage Grotesque display type, rounded cards, and full-bleed image/video heroes
- **Dark Mode**: Class-based theme with a sun/moon header toggle — defaults to the OS preference, persists the visitor's choice
- **Hero Sections**: Full-screen background images and videos
- **Responsive Images**: Crop/hotspot-aware Sanity images optimized for all device sizes
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

- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`: Sanity project
- `NEXT_PUBLIC_SANITY_API_VERSION`: optional, defaults to 2025-11-13
- `SANITY_API_WRITE_TOKEN`: scripts only (migrations, asset uploads)
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`: booking storage
- `RESEND_API_KEY`: confirmation emails (or SMTP credentials for Nodemailer)
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: PayPal integration

### Deployment

- **Platform**: Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Image Optimization**: Netlify image optimization plugin
- **CDN**: Global content delivery network

## 📊 Performance Optimizations

### Image Optimization

- **Next.js Image Component**: Automatic optimization
- **LQIP Blur Placeholders**: Sanity-generated low-quality previews for better UX
- **Sharp**: High-performance image processing
- **Responsive Images**: Device-specific image sizes (srcset capped at 1920w)

### Loading Performance

- **ISR Static Generation**: Pre-rendered pages (7-day revalidate) for fast loading
- **Inlined Critical CSS**: `experimental.inlineCss` removes render-blocking stylesheets
- **Code Splitting**: Automatic bundle optimization
- **Lazy Loading**: Images, videos, and third-party widgets loaded on demand

## 🔍 SEO & Marketing

### Search Engine Optimization

- **Meta Tags**: Locale-aware titles/descriptions from Sanity, verified at build time (builds fail loudly on empty metadata)
- **Structured Data**: JSON-LD rich snippets for search results
- **Hreflang**: EN/ES alternate + canonical links on every page
- **Sitemap**: Automatic XML sitemap generation from Sanity slugs
- **AI Search (GEO)**: `llms.txt` and `llms-full.txt` reference files for AI-powered search engines
- **Robots.txt**: Search engine crawling directives

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

- **Facebook**: [Grand Bay of the Sea](https://www.facebook.com/grandbaydivecenter/)
- **Instagram**: [@grandbayoftheseard](https://www.instagram.com/grandbayoftheseard/)
- **WhatsApp**: +1 (829) 723-9338

## 📄 License

This project is proprietary software developed for Grand Bay of the Sea dive center. All rights reserved.

---

**Developer**: James Karnes  
**Last Updated**: July 2026  
**Version**: 2.0.0
