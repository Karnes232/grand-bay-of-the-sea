import BlogPostList from "@/components/BlogComponents/BlogPostList"
import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import BlockContent from "@/components/BlockContent/BlockContent"
import { Link } from "@/i18n/navigation"
import { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"
import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import {
  getIndividualBlogCategory,
  getIndividualBlogCategorySEO,
} from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPostsCards } from "@/sanity/queries/Blog/BlogPosts"
import { getBlogPageLayout } from "@/sanity/queries/Blog/BlogPageLayout"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; locale: "en" | "es" }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, locale } = await params
  const pageSeo = await getIndividualBlogCategorySEO(category)

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      `[metadata] SEO data came back empty for blog category ${category}. ` +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates(`blog/${category}`, locale)

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
  params: Promise<{ category: string; locale: "en" | "es" }>
}) {
  const { category, locale } = await params

  const [blogCategory, blogPostsCards, layout, tNav] = await Promise.all([
    getIndividualBlogCategory(category),
    getBlogPostsCards(category),
    getBlogPageLayout(),
    getTranslations("Navbar"),
  ])

  const heroImg = blogCategory.heroImage
  const heroSrc =
    (heroImg && sanityCropUrl(heroImg, 2000, 1200)) || heroImg?.asset?.url
  const name = blogCategory.blogCategory[locale]

  return (
    <main id="main">
      <JsonLd raw={blogCategory?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: "Home", path: "" },
              { name: "Blog", path: "/blog" },
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
          breadcrumb={[
            { label: tNav("blog"), href: "/blog" },
            { label: name },
          ]}
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
