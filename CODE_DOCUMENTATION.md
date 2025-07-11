# Grand Bay of the Sea - Code Documentation

## 📁 Project Structure Overview

This document provides comprehensive documentation of the codebase structure, components, and functionality for the Grand Bay of the Sea dive center website.

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (with some JavaScript files)
- **Styling**: Tailwind CSS
- **CMS**: Contentful
- **Payment**: PayPal
- **Deployment**: Netlify

### Directory Structure

```
src/
├── app/                    # Next.js App Router
├── components/            # React Components
├── lib/                   # Utility Libraries
├── types/                 # TypeScript Definitions
├── utils/                 # Helper Functions
├── hooks/                 # Custom React Hooks
├── icons/                 # Icon Components
├── images/                # Static Images
├── styles/                # Global Styles
└── emails/                # Email Templates
```

## 📱 App Router Structure (`src/app/`)

### Route Groups

- **`(root)/`**: Main website routes (indexed by search engines)
- **`(tui)/`**: TUI-specific routes (no-index, for travel agency integration)

### Key Pages

- **`page.tsx`**: Homepage with hero sections and service overview
- **`layout.tsx`**: Root layout with metadata and global configuration
- **`sitemap.ts`**: Dynamic sitemap generation
- **`actions.ts`**: Server actions for form submissions

### Dynamic Routes

- **`courses/[slug]/`**: Individual course pages
- **`trips/[slug]/`**: Individual trip/excursion pages
- **`liveaboard-dominican-republic/`**: Liveaboard adventures

### API Routes

- **`api/contentful/`**: Contentful data fetching endpoints

## 🧩 Components Architecture (`src/components/`)

### Layout Components (`layout/`)

- **HeaderComponents/**: Navigation, dropdown menus, mobile menu
- **FooterComponents/**: Footer content, social media links
- **TuiLayout/**: TUI-specific layout components
- **ServiceWorkerCleanup.ts**: Service worker management

### Hero & Background Components

- **HeroComponent/**: Main hero sections with background images
- **BackgroundVideoComponent/**: Video background implementations
- **BackgroundImageComponent/**: Static background images
- **BackgroundCarouselComponents/**: Image carousel backgrounds

### Payment System (`PaymentComponents/`)

- **PaymentPopup.tsx**: Main payment modal for trips
- **PaymentPopupCourses.tsx**: Course-specific payment modal
- **PaymentPopupLocalDives.tsx**: Local dive payment modal
- **PaymentPopupFishing.tsx**: Fishing trip payment modal
- **PaymentPopupTrip.tsx**: Generic trip payment modal
- **DatePickerComponent.tsx**: Date selection with Sunday restrictions
- **DatePickerToursComponent.tsx**: Tour-specific date picker
- **TourSelect.tsx**: Tour selection dropdown
- **CertificationLevel.tsx**: Diver certification level selector

### PayPal Integration (`PayPalComponents/`)

- **CustomPayPal.tsx**: Basic PayPal button wrapper
- **CustomPayPalBookingForm.tsx**: Booking form with PayPal
- **CustomPagePayPal.tsx**: Custom payment page PayPal
- **PayPalButtonWrapper.jsx**: Core PayPal button implementation
- **PayPalButtonWrapperBooking.jsx**: Booking-specific PayPal wrapper

### Course System (`CourseComponents/`, `CourseCardsComponents/`)

- **CourseOverview.tsx**: Course information display
- **CourseCards.tsx**: Course card grid layout
- **AdvancedCourseCards.tsx**: Advanced course offerings
- **SingleCourseCard.tsx**: Individual course card component

### Trip & Tour System (`TourOverviews/`)

- **TripOverview.tsx**: Trip information and booking
- **LocalDivesOverview.tsx**: Local dive site overview
- **TuiLocalDiveOverview.tsx**: TUI-specific dive overview

### Content Display (`RichTextComponents/`)

- **RichText.tsx**: Contentful rich text renderer
- **TextComponent.tsx**: Animated text components

### Selection & Navigation (`SelectionComponents/`)

- **SelectionComponent.tsx**: Service selection interface
- **LinkComponent.tsx**: Interactive link cards

### Photo Gallery (`PhotoGalleryComponents/`)

- **NextJsImage.tsx**: Optimized image component for galleries
- **Photo gallery implementations**: Lightbox and carousel functionality

### Dive Sites (`DiveSitesComponents/`)

- **DiveSiteCard.tsx**: Individual dive site information cards

### Additional Components

- **BlogComponents/**: Blog post components
- **ContactForm/**: Contact form implementations
- **FloatingButtonComponents/**: Floating action buttons
- **DivingOrganizations/**: Certification organization displays
- **GoogleMapsComponent/**: Google Maps integration
- **StructuredData/**: SEO structured data components
- **TuiComponents/**: TUI-specific components

## 🔧 Utility Libraries (`src/lib/`)

### Contentful Integration (`contentful.ts`)

```typescript
// Main Contentful client configuration
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
})

// Key Functions:
- getAllEntries(contentType: string): Fetch all entries of a content type
- getEntry(entryId: string): Fetch single entry by ID
- searchEntries(contentType, query, select?, excludeSlugs?): Search with filters
- getAllEntriesExcludingSlugs(contentType, excludeSlugs): Fetch with exclusions
```

## 📝 Type Definitions (`src/types/`)

### Contentful Types (`contentfulTypes.ts`)

```typescript
export interface BlogPost {
  title: EntryFields.Text
  slug: EntryFields.Text
  content: EntryFields.RichText
  excerpt: EntryFields.Text
  publishDate: EntryFields.Date
  featuredImage: EntryFields.AssetLink
}
```

### React Select Types (`react-select.d.ts`)

- Custom type definitions for react-select components

## 🛠️ Utility Functions (`src/utils/`)

### Mobile Detection (`isMobile.ts`)

```typescript
export const isMobile = (userAgent: string): boolean => {
  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent)
}
```

- Detects mobile devices based on user agent string
- Used for responsive image optimization

## 🎣 Custom Hooks (`src/hooks/`)

### Window Width Hook (`useWindowWidth.js`)

```javascript
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  // Tracks window width for responsive design
}
```

### Image Protection Hook (`useImageProtection.js`)

```javascript
export const useImageProtection = () => {
  // Comprehensive image protection against:
  // - Right-click saving
  // - Drag and drop
  // - Touch operations (mobile)
  // - Keyboard shortcuts (Ctrl+S, Ctrl+C)
  // - Force touch (iOS)
}
```

## 💳 Payment System Architecture

### Payment Flow

1. **User Selection**: Choose course/trip from available options
2. **Form Completion**: Fill booking form with guest details
3. **Date Selection**: Pick available date (no Sundays)
4. **Payment Processing**: PayPal integration for secure payment
5. **Confirmation**: Email notification and thank you page

### PayPal Integration Details

- **Client ID**: Live PayPal production client ID
- **Currency**: USD (United States Dollar)
- **Components**: Buttons, validation, order creation
- **Security**: PCI-compliant payment processing

### Form Validation

- **Required Fields**: Name, email, hotel, guest count, date, tour selection
- **Guest Limits**: 1-20 guests per booking
- **Date Restrictions**: No Sunday operations
- **Real-time Validation**: Form completion required before payment

## 🎨 Styling System

### Tailwind CSS Implementation

- **Utility-First**: Comprehensive use of Tailwind utilities
- **Responsive Design**: Mobile-first approach with breakpoints
- **Custom Classes**: Extended with custom utility classes
- **Component Styling**: Consistent design system across components

### Animation System

- **Motion Library**: Smooth animations and transitions
- **Hover Effects**: Interactive element feedback
- **Loading States**: Smooth loading indicators
- **Page Transitions**: Seamless navigation experience

## 📊 Content Management

### Contentful Integration

- **Content Types**: Courses, trips, dive sites, page layouts
- **Rich Text**: Flexible content editing with rich text support
- **Asset Management**: Image and video optimization
- **Localization**: Multi-language content structure

### Dynamic Content

- **SEO Metadata**: Dynamic meta tags and descriptions
- **Sitemap Generation**: Automatic XML sitemap creation
- **Structured Data**: Rich snippets for search engines
- **Social Media**: Open Graph and Twitter Card support

## 🔒 Security Features

### Image Protection

- **Right-Click Prevention**: Disable image saving via context menu
- **Drag Protection**: Prevent drag and drop operations
- **Touch Protection**: Mobile-specific protection measures
- **Keyboard Shortcuts**: Block save and copy shortcuts

### Form Security

- **Input Validation**: Client and server-side validation
- **XSS Prevention**: Content Security Policy headers
- **CSRF Protection**: Cross-site request forgery prevention
- **Data Sanitization**: Clean input processing

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile**: < 768px (default)
- **Tablet**: 768px - 1024px (md:)
- **Desktop**: 1024px - 1280px (lg:)
- **Large Desktop**: 1280px+ (xl:)

### Component Adaptations

- **Navigation**: Collapsible mobile menu
- **Hero Sections**: Responsive image sizing
- **Payment Forms**: Mobile-optimized input fields
- **Photo Galleries**: Adaptive grid layouts

## 🚀 Performance Optimizations

### Image Optimization

- **Next.js Image Component**: Automatic optimization
- **Plaiceholder**: Blur placeholders for better UX
- **Sharp**: High-performance image processing
- **Responsive Images**: Device-specific sizing

### Loading Performance

- **Static Generation**: Pre-rendered pages
- **Code Splitting**: Automatic bundle optimization
- **Lazy Loading**: On-demand component loading
- **Service Worker**: Caching strategies

## 🔍 SEO Implementation

### Technical SEO

- **Meta Tags**: Dynamic title and description generation
- **Structured Data**: Rich snippets for search results
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling directives

### Content SEO

- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alt attributes
- **Internal Linking**: Strategic page connections
- **URL Structure**: Clean, descriptive URLs

## 📧 Email System

### Email Templates (`src/emails/`)

- **Booking Confirmations**: Automated booking notifications
- **Payment Receipts**: PayPal payment confirmations
- **Contact Forms**: Customer inquiry responses

### Email Integration

- **React Email**: Template generation
- **Nodemailer**: Server-side email sending
- **Form Handling**: Netlify forms integration

## 🧪 Development Workflow

### Code Quality

- **ESLint**: Code linting and quality assurance
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety and development experience

### Build Process

- **Development**: `npm run dev` - Hot reload development server
- **Build**: `npm run build` - Production build optimization
- **Start**: `npm start` - Production server
- **Lint**: `npm run lint` - Code quality checks
- **Format**: `npm run format` - Code formatting

## 🌐 Deployment Architecture

### Netlify Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Image Optimization**: Netlify image optimization plugin
- **Redirects**: Custom redirect rules for image optimization

### Environment Variables

- **CONTENTFUL_SPACE_ID**: Contentful space identifier
- **CONTENTFUL_ACCESS_TOKEN**: Contentful API access token
- **PayPal Configuration**: Client IDs and settings

## 📊 Analytics & Monitoring

### Performance Monitoring

- **Core Web Vitals**: Performance metrics tracking
- **Error Tracking**: Error boundary implementations
- **User Analytics**: User behavior tracking

### SEO Monitoring

- **Search Console**: Google Search Console integration
- **Sitemap Monitoring**: Automatic sitemap updates
- **Meta Tag Validation**: SEO element verification

## 🔄 State Management

### Local State

- **React Hooks**: useState, useEffect for component state
- **Form State**: Controlled form inputs and validation
- **UI State**: Modal states, loading states, error states

### Server State

- **Contentful Data**: Server-side data fetching
- **Form Submissions**: Server actions for form handling
- **Payment Processing**: PayPal order management

## 🎯 Key Features Implementation

### Booking System

- **Real-time Availability**: Date-based availability checking
- **Dynamic Pricing**: Guest count-based price calculations
- **Deposit System**: 50% deposit requirement
- **Confirmation Flow**: Automated booking confirmations

### Content Management

- **Headless CMS**: Contentful for content management
- **Rich Text Support**: Flexible content editing
- **Asset Optimization**: Automatic image and video optimization
- **Multi-language Ready**: Internationalization structure

### Payment Processing

- **Secure Payments**: PayPal PCI-compliant processing
- **Multiple Payment Types**: Deposits and full payments
- **Receipt Generation**: Automated payment confirmations
- **Error Handling**: Comprehensive error management

## 📈 Scalability Considerations

### Performance

- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Automatic image compression and sizing
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **CDN Integration**: Global content delivery

### Maintainability

- **Component Architecture**: Reusable, modular components
- **Type Safety**: TypeScript for development reliability
- **Code Documentation**: Comprehensive inline documentation
- **Testing Structure**: Testable component architecture

## 🔮 Future Enhancements

### Potential Improvements

- **PWA Features**: Progressive Web App capabilities
- **Real-time Chat**: Customer support integration
- **Multi-language**: Full internationalization
- **Advanced Analytics**: Enhanced user tracking
- **Mobile App**: Native mobile application

### Technical Debt

- **TypeScript Migration**: Convert remaining JavaScript files
- **Test Coverage**: Comprehensive unit and integration tests
- **Performance Monitoring**: Advanced performance tracking
- **Security Audits**: Regular security assessments

---

**Documentation Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: James Karnes
