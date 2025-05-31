import BlogCategory from "@/components/BlogComponents/BlogCategory"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { getAllEntries, searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Blog",
  })
  return {
    title: String(seoSearchResults.items[0].fields.title),
    description: String(seoSearchResults.items[0].fields.description),
    keywords: seoSearchResults.items[0].fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/blog",
      type: "website",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoSearchResults.items[0].fields.title),
      description: String(seoSearchResults.items[0].fields.description),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoSearchResults.items[0] as any).fields.image.fields.file.url}`,
          width: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.width,
          height: (seoSearchResults.items[0] as any).fields.image.fields.file
            .details.image.height,
          alt: (seoSearchResults.items[0] as any).fields.image.fields.title,
        },
      ],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com/blog/",
    },
  }
}

export default async function Page() {
  const pageLayout = await searchEntries("pageLayout", {
    "fields.page": "Blog",
  })
  const blogPosts = await getAllEntries("blogCategory")
  return (
    <main>
      <HeroComponent
        heroImage={`https:${(pageLayout.items[0] as any).fields.heroImage.fields.file.url}`}
      />
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <div className="max-w-6xl my-5 xl:my-14 flex flex-col justify-center items-center lg:flex-row mx-5 lg:mx-auto">
        <RichText context={pageLayout.items[0].fields.paragraph1} />
      </div>
      <div className="flex flex-col xl:mt-5 md:flex-row md:flex-wrap md:justify-evenly  max-w-5xl xl:max-w-6xl mx-auto md:gap-5">
        {blogPosts.map(post => (
          <BlogCategory key={post.sys.id} post={post} />
        ))}
      </div>
    </main>
  )
}
