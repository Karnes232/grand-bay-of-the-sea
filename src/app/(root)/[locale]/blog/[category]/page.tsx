import BlogPostList from "@/components/BlogComponents/BlogPostList"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; locale: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, locale } = await params
  const seoSearchResults = await searchEntries(
    "blogCategory",
    {
      "fields.slug": category,
      locale: locale || "en",
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
  )
  if (!seoSearchResults?.items?.[0]) {
    notFound()
  }
  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.seoDescription),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url:
        locale === "es"
          ? `https://www.grandbay-puntacana.com/es/blog/${category}`
          : `https://www.grandbay-puntacana.com/blog/${category}`,
      type: "website",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.seoTitle),
      description: String(seoSearchResults.items[0].fields.seoDescription),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.seoImage.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.seoImage.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.seoImage.fields.title,
        },
      ],
    },
    alternates: {
      canonical:
        locale === "es"
          ? `https://www.grandbay-puntacana.com/es/blog/${category}`
          : `https://www.grandbay-puntacana.com/blog/${category}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; locale: string }>
}) {
  const { category, locale } = await params

  const blogCategory = await searchEntries("blogCategory", {
    "fields.slug": category,
    locale: locale || "en",
  })
  const blogCategoryId = blogCategory.items[0]?.fields.blogCategory

  const blogPostsByCategory = await searchEntries("blogPost", {
    "fields.blogCategory.sys.contentType.sys.id": "blogCategory",
    "fields.blogCategory.fields.blogCategory": blogCategoryId,
    locale: locale || "en",
  })
  return (
    <main>
      {blogCategory?.items[0]?.fields?.heroImage && (
        <HeroComponent
          heroImage={`https:${(blogCategory?.items[0] as any)?.fields?.heroImage?.fields?.file?.url}`}
          title={blogCategory?.items[0]?.fields?.blogCategory as string}
        />
      )}
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center mx-5 lg:mx-auto">
        <RichText context={blogCategory?.items[0]?.fields?.paragraph} />
        <BlogPostList blogPosts={blogPostsByCategory?.items} />
      </div>
    </main>
  )
}
