import BlogBody from "@/components/BlogComponents/BlogBody"
import HeroImages from "@/components/BlogComponents/HeroImages"
import Recommendations from "@/components/BlogComponents/Recommendations"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { category, slug } = await params
  const seoSearchResults = await searchEntries(
    "blogPost",
    {
      "fields.slug": slug,
    },
    [
      "fields.seoTitle",
      "fields.seoDescription",
      "fields.seoKeywords",
      "fields.seoImage",
    ],
  )

  return {
    title: String(seoSearchResults.items[0].fields.seoTitle),
    description: String(seoSearchResults.items[0].fields.seoDescription),
    keywords: seoSearchResults.items[0].fields.seoKeywords as string[],
    openGraph: {
      url: `https://www.grandbay-puntacana.com/blog/${category}/${slug}`,
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
      canonical: `https://www.grandbay-puntacana.com/blog/${category}/${slug}`,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params

  const blogPost = await searchEntries("blogPost", {
    "fields.slug": slug,
  })


  const blogCategory = (blogPost.items[0].fields.blogCategory as any)?.fields
    ?.blogCategory

  const blogPostsByCategory = await searchEntries("blogPost", {
    "fields.blogCategory.sys.contentType.sys.id": "blogCategory",
    "fields.blogCategory.fields.blogCategory": blogCategory,
  })

  // Filter out the current blog post using the slug
  const relatedPosts = blogPostsByCategory.items.filter(
    post => post.fields.slug !== slug,
  )

  return (
    <>
    <main>
      <HeroImages
        backgroundImages={blogPost?.items[0]?.fields.backgroundImages as any[]}
      />
      <BlogBody context={blogPost?.items[0]?.fields.blogBody as any[]} />
      <Recommendations
        relatedPosts={relatedPosts}
        title={"You may also like"}
      />
    </main>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPost.items[0].fields.schema) }}
      />
    </>
  )
}
