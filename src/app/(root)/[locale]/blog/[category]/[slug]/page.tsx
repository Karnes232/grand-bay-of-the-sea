import Image from "next/image"
import { Link } from "@/i18n/navigation"
import Recommendations from "@/components/BlogComponents/Recommendations"
import { Metadata, ResolvingMetadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getHreflangAlternates } from "@/utils/hreflang"
import { localeUrl } from "@/utils/schema"
import { setRequestLocale, getTranslations } from "next-intl/server"
import {
  getBlogPosts,
  getBlogPostsCards,
  getIndividualBlogPost,
  getIndividualBlogPostSEO,
} from "@/sanity/queries/Blog/BlogPosts"
import { getIndividualBlogCategory } from "@/sanity/queries/Blog/BlogCategory"
import { getBlogPageLayout } from "@/sanity/queries/Blog/BlogPageLayout"
import SanityBlogBody from "@/components/BlogComponents/SanityBlogBody"
import BlogPostHero from "@/components/BlogComponents/BlogPostHero"
import ShareLinks from "@/components/BlogComponents/ShareLinks"
import {
  sanityCdnUrlWithParams,
  sanityCropUrl,
  hotspotPosition,
} from "@/sanity/lib/image"
import { breadcrumbJsonLd } from "@/utils/breadcrumb"
import { syncSchemaDates } from "@/utils/syncSchemaDates"
import JsonLd from "@/components/StructuredData/JsonLd"
import { type Locale } from "@/i18n/locales"
import { localesForPost, postHasLocale } from "@/utils/blogLocales"

// ISR 7 days — not force-static, so language switching works on Netlify.
export const revalidate = 604800

// Without generateStaticParams a dynamic segment renders fully dynamically
// (no-store) even when statically renderable — prerender every post.
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(p => ({
    category: p.blogCategory.slug.current,
    slug: p.slug.current,
  }))
}

export async function generateMetadata(
  {
    params,
  }: { params: Promise<{ category: string; slug: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, slug, locale } = await params
  setRequestLocale(locale)
  const pageSeo = await getIndividualBlogPostSEO(slug)
  // German is per-post. An untranslated post redirects to English rather than
  // serving the English article at a German URL. This has to run here as well
  // as in the page body: generateMetadata executes first and would otherwise
  // crash indexing `seo.meta[locale]` for a locale this post has no content in.
  if (pageSeo && !postHasLocale(pageSeo, locale)) {
    redirect(`/blog/${category}/${slug}`)
  }
  if (!pageSeo) {
    // No document at all — the post doesn't exist. A real 404, not a data
    // failure (the page itself also calls notFound()).
    notFound()
  }
  if (!pageSeo.seo) {
    // The post exists but its seo fields are empty. Never ship a page with a
    // blank <head>: fail the build (or the single ISR regeneration) loudly
    // instead of silently caching empty metadata.
    throw new Error(
      `[metadata] SEO data came back empty for blog post ${category}/${slug}. ` +
        "Check the Sanity document's seo fields and the fetch above.",
    )
  }

  const alternates = getHreflangAlternates(
    `blog/${category}/${slug}`,
    locale,
    localesForPost(pageSeo),
  )
  const publishedTime = pageSeo.publishDate
    ? new Date(pageSeo.publishDate).toISOString()
    : undefined
  const modifiedTime = pageSeo._updatedAt
    ? new Date(pageSeo._updatedAt).toISOString()
    : undefined

  const rawOg = pageSeo.seo.openGraph.image?.url || ""
  const ogImage = rawOg
    ? sanityCdnUrlWithParams(rawOg, {
        w: 1200,
        h: 630,
        fit: "crop",
        q: 80,
      })
    : ""

  return {
    title: pageSeo.seo.meta[locale].title || "",
    description: pageSeo.seo.meta[locale].description || "",
    keywords: pageSeo.seo.meta[locale].keywords.join(", ") || "",
    openGraph: {
      title: pageSeo.seo.openGraph[locale].title || "",
      description: pageSeo.seo.openGraph[locale].description || "",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: pageSeo.seo.openGraph.image?.alt ?? "",
              },
            ],
          }
        : {}),
      type: "article",
      url: alternates.canonical,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    robots: {
      index: !pageSeo.seo.noIndex,
      follow: !pageSeo.seo.noFollow,
    },
    twitter: {
      card: "summary_large_image",
      site: "@GrandBayOfTheS1",
      creator: "@GrandBayOfTheS1",
      title: pageSeo.seo.openGraph[locale].title || "",
      description: pageSeo.seo.openGraph[locale].description || "",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates,
    // other: {
    //   "Cache-Control":
    //     "public, max-age=259200, s-maxage=259200, stale-while-revalidate=518400",
    // },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string; locale: Locale }>
}) {
  const { category, slug, locale } = await params

  setRequestLocale(locale)
  const [individualBlogPost, related, blogCategory, layout, t, tNav] =
    await Promise.all([
      getIndividualBlogPost(slug),
      getBlogPostsCards(category),
      getIndividualBlogCategory(category),
      getBlogPageLayout(),
      getTranslations("Blog"),
      getTranslations("Navbar"),
    ])

  // Unknown slug → real 404 instead of crashing on missing fields below.
  if (!individualBlogPost) notFound()

  // Per-post German: send an untranslated post to its English equivalent.
  if (!postHasLocale(individualBlogPost, locale)) {
    redirect(`/blog/${category}/${slug}`)
  }

  const relatedPosts = related.filter((post: any) => post.slug.current !== slug)
  const categoryName = blogCategory?.blogCategory?.[locale] ?? category
  const title = individualBlogPost.title[locale]
  const images = individualBlogPost.backgroundImages ?? []
  const hero = images[0]
  const galleryImages = images.slice(1)
  const shareUrl = localeUrl(`/blog/${category}/${slug}`, locale)

  const tBc = await getTranslations("Breadcrumb")

  return (
    <main id="main">
      <JsonLd
        raw={syncSchemaDates(
          individualBlogPost?.seo?.structuredData[locale],
          individualBlogPost.publishDate,
          individualBlogPost._updatedAt,
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(
            [
              { name: tBc("home"), path: "" },
              { name: tBc("blog"), path: "/blog" },
              { name: categoryName, path: `/blog/${category}` },
              { name: title, path: `/blog/${category}/${slug}` },
            ],
            locale,
          ),
        }}
      />

      {hero?.asset?.url && (
        <BlogPostHero
          image={{
            url: sanityCdnUrlWithParams(hero.asset.url, { w: 1920, q: 80 }),
            lqip: hero.asset.metadata?.lqip,
            alt: hero.alt,
          }}
          breadcrumb={[
            { label: tNav("blog"), href: "/blog" },
            { label: categoryName, href: `/blog/${category}` },
            { label: title },
          ]}
          categoryLabel={categoryName}
          title={title}
          author={t("author")}
          publishDate={individualBlogPost.publishDate}
          updatedAt={individualBlogPost._updatedAt}
          locale={locale}
          labels={{
            by: t("by"),
            published: t("published"),
            updated: t("updated"),
          }}
        />
      )}

      {/* Article + share + inline CTA */}
      <section className="mx-auto max-w-[1080px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_68px] lg:items-start">
          <div>
            <SanityBlogBody
              content={individualBlogPost.blogBody}
              locale={locale}
              skipLeadingTitle={title}
            />

            {/* Inline CTA card */}
            <div className="mt-9 flex max-w-[70ch] flex-wrap items-center justify-between gap-6 rounded-[20px] bg-ink px-[30px] py-7 text-white">
              <div className="max-w-[42ch]">
                <h2 className="mb-1.5 font-display text-[1.3rem] font-bold tracking-[-0.02em]">
                  {layout.ctaHeading?.[locale]}
                </h2>
                <p className="text-[15px] leading-relaxed text-white/80">
                  {layout.ctaBody?.[locale]}
                </p>
              </div>
              <Link
                href="/contact"
                className="flex-none rounded-full bg-accent px-7 py-3.5 text-[15.5px] font-bold text-ink transition-transform hover:-translate-y-[2px]"
              >
                {layout.ctaLabel?.[locale]} →
              </Link>
            </div>
          </div>

          <ShareLinks url={shareUrl} label={t("share")} />
        </div>
      </section>

      {/* Gallery of remaining hero images */}
      {galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1080px] px-6 pb-6">
          <h2 className="mb-6 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] text-fg">
            {t("morePhotos")}
          </h2>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img: any, index: number) => {
              const src = sanityCropUrl(img, 800, 600) || img?.asset?.url
              const position = hotspotPosition(img)
              const lqip = img?.asset?.metadata?.lqip
              return (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-line bg-line"
                >
                  {src && (
                    <Image
                      src={src}
                      alt={img?.alt ?? title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                      quality={75}
                      placeholder={lqip ? "blur" : "empty"}
                      blurDataURL={lqip}
                      style={
                        position ? { objectPosition: position } : undefined
                      }
                      className="object-cover"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      <Recommendations
        relatedPosts={relatedPosts}
        title={t("youMayAlsoLike")}
        locale={locale}
        categoryName={categoryName}
        categorySlug={category}
        backLabel={t("backToCategory", { category: categoryName })}
      />
    </main>
  )
}
