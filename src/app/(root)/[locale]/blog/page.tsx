import BlogCategory from "@/components/BlogComponents/BlogCategory"
import JsonLd from "@/components/StructuredData/JsonLd"
import CoursesHero from "@/components/courses/CoursesHero"
import BlockContent from "@/components/BlockContent/BlockContent"
import { Link } from "@/i18n/navigation"
import { setRequestLocale, getTranslations } from "next-intl/server"

import { getHreflangAlternates } from "@/utils/hreflang"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { getPageSeo, getStructuredData } from "@/sanity/queries/SEO/seo"
import { getBlogPageLayout } from "@/sanity/queries/Blog/BlogPageLayout"
import { getBlogCategory } from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPosts } from "@/sanity/queries/Blog/BlogPosts"
import { sanityCropUrl, hotspotPosition } from "@/sanity/lib/image"
import { type Locale } from "@/i18n/locales"
import { localesForPostList } from "@/utils/blogLocales"
import { notFound, redirect } from "next/navigation"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale
  }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  // German is per-post. With nothing translated there is no German index, so
  // redirect. Must run here as well as in the page body: generateMetadata
  // executes first and would otherwise crash indexing `seo.meta[locale]`.
  if (locale === "de" && !(await getBlogPosts()).some(p => p.hasDe)) {
    redirect("/blog")
  }
  const pageSeo = await getPageSeo("Blog")

  if (!pageSeo) {
    // Never ship a page with a blank <head>: fail the build (or the single
    // ISR regeneration) loudly instead of silently caching empty metadata.
    throw new Error(
      "[metadata] SEO data came back empty for /blog. " +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  // Advertise a German alternate only once at least one post is translated.
  const posts = await getBlogPosts()
  const alternates = getHreflangAlternates(
    "blog",
    locale,
    localesForPostList(posts),
  )

  return {
    title: pageSeo.seo.meta[locale].title,
    description: pageSeo.seo.meta[locale].description,
    keywords: pageSeo.seo.meta[locale].keywords.join(", "),
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title,
      description: pageSeo.seo.openGraph[locale].description,
      images: pageSeo.seo.openGraph.image.url,
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
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const [structuredData, layout, blogCategories, allPosts, tBlog] =
    await Promise.all([
      getStructuredData("Blog"),
      getBlogPageLayout(),
      getBlogCategory(),
      getBlogPosts(),
      getTranslations("Blog"),
    ])

  // German is per-post: with nothing translated yet there is no German blog to
  // show, so send the reader to the English index instead of an empty page.
  // This is also what makes the footer's "Blog" link work on German pages —
  // next-intl prefixes it to /de/blog, which used to 404.
  if (locale === "de" && !allPosts.some(p => p.hasDe)) {
    redirect("/blog")
  }

  // A German category hub only exists when it holds a translated post — the
  // rest redirect to English. Listing all five on the German index would send
  // readers through a redirect into another language, so the grid shows only
  // the categories that really are German. Same rule as the sitemap.
  const germanCategorySlugs = new Set(
    allPosts.filter(p => p.hasDe).map(p => p.blogCategory.slug.current),
  )
  const categories =
    locale === "de"
      ? blogCategories.filter(c => germanCategorySlugs.has(c.slug.current))
      : blogCategories

  const heroImg = layout.heroImage
  const heroSrc = sanityCropUrl(heroImg, 2000, 1200) || heroImg.asset.url

  const tBc = await getTranslations("Breadcrumb")

  return (
    <main id="main">
      <JsonLd raw={structuredData?.seo?.structuredData[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: tBc("home"), path: "" },
              { name: tBc("blog"), path: "/blog" },
            ],
            locale,
          ),
        }}
      />

      <CoursesHero
        heroImage={heroSrc}
        objectPosition={hotspotPosition(heroImg)}
        blurDataURL={heroImg.asset.metadata.lqip}
        alt={heroImg.alt || "Grand Bay of the Sea blog"}
        title={layout.title[locale]}
        trustLine={layout.heroEyebrow?.[locale]}
      />

      {/* Intro */}
      <section className="mx-auto max-w-[900px] px-6 pb-2 pt-[72px]">
        <BlockContent
          content={layout.paragraph}
          locale={locale}
          variant="prose"
          demoteH1
        />
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-10">
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <BlogCategory
              key={index}
              category={category}
              locale={locale}
              browseLabel={tBlog("browseArticles")}
            />
          ))}
        </div>
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
