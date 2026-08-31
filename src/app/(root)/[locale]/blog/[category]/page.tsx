import BlogPostList from "@/components/BlogComponents/BlogPostList"
import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import BlockContent from "@/components/BlockContent/BlockContent"
import { Link } from "@/i18n/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { notFound, redirect } from "next/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import {
  getBlogCategory,
  getIndividualBlogCategory,
  getIndividualBlogCategorySEO,
} from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPostsCards } from "@/sanity/queries/Blog/BlogPosts"
import { getBlogPageLayout } from "@/sanity/queries/Blog/BlogPageLayout"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { type Locale } from "@/i18n/locales"
import { localesForPostList } from "@/utils/blogLocales"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

// Without generateStaticParams a dynamic segment renders fully dynamically
// (no-store) even when statically renderable — prerender all categories.
export async function generateStaticParams() {
  const categories = await getBlogCategory()
  return categories.map(c => ({ category: c.slug.current }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; locale: Locale }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, locale } = await params
  setRequestLocale(locale)
  // German is per-post. With no translated post in this category there is no
  // German hub, so redirect. Must run here as well as in the page body:
  // generateMetadata executes first and would otherwise crash indexing
  // `seo.meta[locale]`.
  if (
    locale === "de" &&
    !(await getBlogPostsCards(category)).some(c => c.hasDe)
  ) {
    redirect(`/blog/${category}`)
  }
  const pageSeo = await getIndividualBlogCategorySEO(category)

  if (!pageSeo) {
    // Unknown category is a user/crawler error, not a data failure — serve a
    // real 404 instead of crashing with a 500 (the page also calls notFound()).
    notFound()
  }

  // Advertise a German alternate only when this category has a translated post.
  const alternates = getHreflangAlternates(
    `blog/${category}`,
    locale,
    localesForPostList(await getBlogPostsCards(category)),
  )

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image?.url ?? undefined,
      type: "website",
      url: alternates.canonical,
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    alternates,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; locale: Locale }>
}) {
  const { category, locale } = await params

  setRequestLocale(locale)
  const [blogCategory, allCards, layout, tNav] = await Promise.all([
    getIndividualBlogCategory(category),
    getBlogPostsCards(category),
    getBlogPageLayout(),
    getTranslations("Navbar"),
  ])

  // Unknown category → real 404 instead of crashing on missing fields below.
  if (!blogCategory) notFound()

  // German is per-post. A German category hub lists only the posts that are
  // actually translated; with none, there is no German page to show, so send
  // the reader to the English hub rather than an empty listing.
  const blogPostsCards =
    locale === "de" ? allCards.filter(c => c.hasDe) : allCards
  if (locale === "de" && blogPostsCards.length === 0) {
    redirect(`/blog/${category}`)
  }

  const heroImg = blogCategory.heroImage
  const heroSrc =
    (heroImg && sanityCropUrl(heroImg, 2000, 1200)) || heroImg?.asset?.url
  const name = blogCategory.blogCategory[locale]

  const tBc = await getTranslations("Breadcrumb")

  return (
    <main id="main">
      <JsonLd raw={blogCategory?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: tBc("home"), path: "" },
              { name: tBc("blog"), path: "/blog" },
              { name, path: `/blog/${category}` },
            ],
            locale,
          ),
        }}
      />

      {heroSrc && (
        <CoursesHero
          heroImage={heroSrc}
          objectPosition={hotspotPosition(heroImg)}
          blurDataURL={heroImg.asset.metadata.lqip}
          alt={heroImg.alt || name}
          title={name}
          breadcrumb={[{ label: tNav("blog"), href: "/blog" }, { label: name }]}
        />
      )}

      {/* Category description */}
      <section className="mx-auto max-w-[900px] px-6 pb-2 pt-[56px]">
        <BlockContent
          content={blogCategory.description as any}
          locale={locale}
          variant="prose"
        />
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-[1080px] px-6 py-10">
        <BlogPostList blogPosts={blogPostsCards} locale={locale} />
      </section>

      {/* CTA band */}
      <section className="mt-14 bg-ink text-white">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-[46ch]">
            <h2 className="mb-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {layout.ctaHeading?.[locale]}
            </h2>
            <p className="text-[16.5px] leading-relaxed text-white/80">
              {layout.ctaBody?.[locale]}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-none rounded-full bg-accent px-8 py-4 text-[16.5px] font-bold text-ink shadow-[0_12px_34px_rgba(255,106,61,0.35)] transition-transform hover:-translate-y-[3px] hover:shadow-[0_18px_44px_rgba(255,106,61,0.5)]"
          >
            {layout.ctaLabel?.[locale]} →
          </Link>
        </div>
      </section>
    </main>
  )
}
