# File Structure

```
src/
├── app/
│   ├── layout.tsx                      # Root layout — renders children only (no HTML shell)
│   ├── globals.css
│   ├── robots.ts
│   ├── api/
│   │   ├── contact/route.ts            # Contact form API endpoint
│   │   └── contentful/route.ts         # Contentful webhook / proxy
│   ├── actions/
│   │   └── send-confirmation.js        # Email send helpers (Resend/Nodemailer)
│   ├── (root)/                         # Public site route group
│   │   ├── layout.tsx                  # Thin wrapper — passes children through
│   │   ├── actions.ts                  # Server actions: submitForm, submitBookingForm, submitTripForm, submitFishingForm
│   │   ├── sitemap.ts
│   │   └── [locale]/
│   │       ├── layout.tsx              # Full HTML shell: fonts, header, footer, GTM, NextIntlClientProvider
│   │       ├── page.tsx                # Home page
│   │       ├── courses/
│   │       │   ├── page.tsx            # Course listing
│   │       │   └── [slug]/page.tsx     # Individual course
│   │       ├── trips/
│   │       │   ├── page.tsx            # Trip listing
│   │       │   └── [slug]/page.tsx     # Individual trip
│   │       ├── blog/
│   │       │   ├── page.tsx            # Blog listing
│   │       │   └── [category]/
│   │       │       ├── page.tsx        # Blog category listing
│   │       │       └── [slug]/page.tsx # Individual blog post
│   │       ├── sites/page.tsx          # Dive sites
│   │       ├── species/page.tsx        # Marine species
│   │       ├── photo-gallery/page.tsx
│   │       ├── contact/page.tsx
│   │       ├── fishing-punta-cana/page.tsx
│   │       ├── shark-dive-punta-cana/page.tsx
│   │       ├── scuba-diving-punta-cana/page.tsx
│   │       ├── liveaboard-dominican-republic/
│   │       │   ├── page.tsx
│   │       │   ├── silverbank-expedition/page.tsx
│   │       │   └── whale-watching-adventure/page.tsx
│   │       ├── customPayment/page.tsx
│   │       ├── thankyou/page.tsx
│   │       └── terms-and-conditions/page.tsx
│   ├── (tui)/                          # TUI partner pages (noindex, no locale prefix)
│   │   └── tui/
│   │       ├── layout.tsx
│   │       ├── discover/page.tsx
│   │       ├── openwater/page.tsx
│   │       ├── advanced/page.tsx
│   │       ├── scubadiver/page.tsx
│   │       ├── catalina/page.tsx
│   │       ├── bayahibe/page.tsx
│   │       └── sites/page.tsx
│   └── studio/
│       ├── layout.tsx
│       └── [[...tool]]/page.tsx        # Sanity Studio

├── components/
│   ├── layout/
│   │   ├── HeaderComponents/           # Header, nav, dropdowns
│   │   ├── FooterComponents/           # Footer
│   │   ├── TuiLayout/                  # TuiHeader, TuiFooter
│   │   ├── DeferredClientWidgets.tsx   # Lazy-loaded floating buttons etc.
│   │   └── ServiceWorkerCleanup.tsx
│   ├── analytics/
│   │   └── LazyGoogleTagManager.tsx
│   ├── HeroComponent/                  # Hero sections with static images
│   ├── BackgroundVideoComponent/       # Cloudinary video backgrounds
│   ├── BackgroundImageComponent/       # Full-bleed image sections
│   ├── BackgroundCarouselComponents/   # Swiper photo carousels
│   ├── BlockContent/                   # Portable Text renderer (Sanity)
│   ├── BlogComponents/                 # Blog body, hero images, recommendations
│   ├── RichTextComponents/             # Contentful rich text rendering
│   ├── CourseCards Components/         # Cards for course listings
│   ├── CourseComponents/               # Individual course overview
│   ├── TourOverviews/                  # Trip/course overview panels with booking CTA
│   ├── PaymentComponents/              # Booking forms with date picker, guest count
│   ├── PayPalComponents/               # PayPal SDK buttons and order logic
│   ├── TuiComponents/                  # TUI-specific booking forms
│   ├── DiveSitesComponents/            # Dive site cards
│   ├── FaqsComponent/                  # Accordion FAQs
│   ├── PhotoGalleryComponents/         # react-photo-album + yet-another-react-lightbox
│   ├── ContactForm/                    # Contact page form
│   ├── FloatingButtonComponents/       # WhatsApp / sticky CTAs
│   ├── GoogleMapsComponent/
│   ├── DivingOrganizations/            # PADI / SSI logos section
│   ├── SelectionComponents/            # Home page service selection grid
│   ├── LanguageSwitcher/
│   ├── StructuredData/                 # generateStructuredData() for org schema
│   └── performance/                    # Performance wrappers / lazy loaders

├── sanity/
│   ├── env.ts                          # Reads NEXT_PUBLIC_SANITY_* env vars
│   ├── structure.ts                    # Sanity Studio desk structure
│   ├── lib/
│   │   ├── client.ts                   # Sanity client (useCdn: true)
│   │   ├── image.ts                    # urlFor() + sanityCdnUrlWithParams()
│   │   └── live.ts                     # Live preview client
│   ├── queries/                        # GROQ queries & TypeScript return types
│   │   ├── SEO/seo.ts                  # getPageSeo(), getStructuredData()
│   │   ├── HomePage/
│   │   ├── Courses/
│   │   ├── DiveTrips/
│   │   ├── Blog/
│   │   ├── Sites/
│   │   ├── Faqs/
│   │   ├── Fishing/
│   │   ├── Liveaboards/
│   │   ├── Photo-Gallery/
│   │   ├── Scuba-Diving-Punta-Cana/
│   │   ├── Shark-Dive/
│   │   ├── Page-Species/
│   │   ├── Contact/
│   │   ├── CustomPayment/
│   │   └── Cancellation-Policy/
│   └── schemaTypes/                    # Sanity schema definitions (mirrors queries/)
│       └── index.ts                    # Registers all schemas

├── lib/
│   ├── contentful.ts                   # Contentful client + helpers (legacy)
│   ├── supabaseClient.ts               # Supabase browser client
│   └── supabaseServer.ts               # Supabase service-role server client

├── i18n/
│   ├── routing.ts                      # defineRouting({ locales: ['en','es'], defaultLocale: 'en' })
│   ├── request.ts                      # getRequestConfig — loads messages per locale
│   ├── navigation.ts                   # Typed Link / useRouter from next-intl
│   └── settings.ts

├── utils/
│   ├── hreflang.ts                     # getHreflangAlternates(path, locale) → { canonical, languages }
│   ├── isMobile.ts
│   └── languageUtils.ts

├── hooks/                              # Custom React hooks
├── emails/                             # React Email templates
├── images/                             # Static image assets
├── icons/                              # SVG icon components
├── styles/                             # Additional CSS
└── types/                              # Shared TypeScript types

messages/
├── en.json                             # English UI strings
└── es.json                             # Spanish UI strings

sanity.config.ts                        # Sanity Studio config (basePath: /studio)
sanity.cli.ts                           # Sanity CLI config
next.config.mjs                         # Next.js config with next-intl plugin
tailwind.config.ts
netlify.toml                            # Build, redirects, headers, caching rules
```
