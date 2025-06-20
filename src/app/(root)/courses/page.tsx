import CloudinaryBackgroundVideo from "@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"
import AdvancedCourseCards from "@/components/CourseCardsComponents/AdvancedCourseCards"
import CourseCards from "@/components/CourseCardsComponents/CourseCards"
import PadiBanner from "@/components/DivingOrganizations/PadiBanner"
import SSIBanner from "@/components/DivingOrganizations/SSIBanner"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import { searchEntries } from "@/lib/contentful"
import { Metadata, ResolvingMetadata } from "next"

// For image placeholders
import { getPlaiceholder } from "plaiceholder";
import { Buffer } from 'buffer'; // Node.js Buffer for getPlaiceholder
import HeroStaticComponent from "@/components/HeroComponent/HeroStaticComponent"

// OPTION 1: Explicitly force static rendering for this page
export const dynamic = "force-static";

// OPTION 2: Use revalidate for Incremental Static Regeneration (ISR)
// Uncomment this line instead of 'dynamic = "force-static"' if you want ISR
// export const revalidate = 60; // Regenerate every 60 seconds if a request comes in.

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Courses",
  })
  const seoEntry = seoSearchResults.items[0];

  if (!seoEntry) {
    // Provide a fallback if SEO entry is not found
    return {
      title: "Courses - Grand Bay Divers Punta Cana",
      description: "Explore our scuba diving courses in Punta Cana.",
    };
  }

  return {
    title: String(seoEntry.fields.title),
    description: String(seoEntry.fields.description),
    keywords: seoEntry.fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com/courses",
      type: "website",
      title: String(seoEntry.fields.title),
      description: String(seoEntry.fields.description),
      images: [
        {
          url: `https:${(seoEntry as any).fields.image.fields.file.url}`,
          width: (seoEntry as any).fields.image.fields.file.details.image.width,
          height: (seoEntry as any).fields.image.fields.file.details.image.height,
          alt: (seoEntry as any).fields.image.fields.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(seoEntry.fields.title),
      description: String(seoEntry.fields.description),
      creator: "@grandbay",
      site: "@grandbay",
      images: [
        {
          url: `https:${(seoEntry as any).fields.image.fields.file.url}`,
          width: (seoEntry as any).fields.image.fields.file.details.image.width,
          height: (seoEntry as any).fields.image.fields.file.details.image.height,
          alt: (seoEntry as any).fields.image.fields.title,
        },
      ],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com/courses/",
    },
  }
}

export default async function Page() {
  const pageLayoutResult = await searchEntries("pageLayout", {
    "fields.page": "Courses",
  })
  const pageLayout = pageLayoutResult.items[0];

  if (!pageLayout) {
    // Handle case where page layout is not found for Courses
    return (
      <main>
        <p>Content not found for this Courses page. Please check Contentful.</p>
      </main>
    );
  }

  // Helper function to safely get image URL and details, including blurDataURL
  const getHeroImageDetails = async (field: any) => {
    if (!field?.fields?.file) return {};
    const url = `https:${field.fields.file.url}`;
    let base64 = '';
    try {
        const buffer = await fetch(url).then(async res => Buffer.from(await res.arrayBuffer()));
        const { base64: plaiceholderBase64 } = await getPlaiceholder(buffer);
        base64 = plaiceholderBase64;
    } catch (e) {
        console.error("Error generating plaiceholder for image:", url, e);
    }

    return {
      url: url,
      // You might also pass width/height if HeroComponent needs them directly.
      // For now, HeroComponent hardcodes them, but it's better to pass them from here.
      base64: base64,
    };
  };

  // Fetch Hero Image details and base64 at build time for the Courses page
  const heroImageDetails = await getHeroImageDetails((pageLayout as any).fields.heroImage);


  return (
    <main>
      {heroImageDetails.url && (
        <HeroStaticComponent
          heroImage={heroImageDetails.url}
          blurDataURL={heroImageDetails.base64} // Pass the generated blurDataURL
        />
      )}
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.fields.paragraph1} />
      <CloudinaryBackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        videoId={"scubaHero_wzvqdg"}
      />
      <RichText context={pageLayout.fields.paragraph2} />
      <CourseCards
        image1={(pageLayout as any).fields.linkImage1.fields}
        image2={(pageLayout as any).fields.linkImage2.fields}
        image3={(pageLayout as any).fields.linkImage3.fields}
        image4={(pageLayout as any).fields.linkImage4.fields}
      />
      <RichText context={pageLayout.fields.paragraph3} />
      <AdvancedCourseCards
        image1={(pageLayout as any).fields.linkImage5.fields}
        image2={(pageLayout as any).fields.linkImage6.fields}
        image3={(pageLayout as any).fields.linkImage7.fields}
        image4={(pageLayout as any).fields.linkImage8.fields}
        image5={(pageLayout as any).fields.linkImage9.fields}
      />
      <SSIBanner />
      <PadiBanner />
    </main>
  )
}