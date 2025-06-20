import dynamicImport from "next/dynamic"

import { searchEntries } from "@/lib/contentful"
//import dynamic from "next/dynamic"
import HeroComponent from "@/components/HeroComponent/HeroComponent"
import RichText from "@/components/RichTextComponents/RichText"
import SelectionComponent from "@/components/SelectionComponents/SelectionComponent"
import { Metadata, ResolvingMetadata } from "next"

const CloudinaryBackgroundVideo = dynamicImport(
  () => import("@/components/BackgroundVideoComponent/CloudinaryBackgroundVideo"),
)
const DivingOrganizations = dynamicImport(
  () => import("@/components/DivingOrganizations/DivingOrganizations"),
)
const BackgroundImage = dynamicImport(
  () => import("@/components/BackgroundImageComponent/BackgroundImage"),
)
const GoogleMaps = dynamicImport(
  () => import("@/components/GoogleMapsComponent/GoogleMaps"),
)

// OPTION 1: Explicitly force static rendering for this page
// This will make all data fetches within this page (and its children) static,
// meaning they will run at build time.
// If your content updates, you'll need to rebuild or use revalidation.
export const dynamic = "force-static"; //

// OPTION 2: Use revalidate for Incremental Static Regeneration (ISR)
// This will regenerate the page on the server after 60 seconds if a request comes in.
// export const revalidate = 60; // Regenerate every 60 seconds if a request comes in.

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Data for metadata will also be fetched at build time if `dynamic = "force-static"` is used
  // or if `revalidate` is set at the page level.
  const seoSearchResults = await searchEntries("seo", {
    "fields.page": "Index",
  },
  // Ensure we fetch all necessary fields for the image for metadata to be complete
  ['fields.title', 'fields.description', 'fields.keywords', 'fields.image']
  );

  const seoEntry = seoSearchResults.items[0];

  if (!seoEntry) {
    // Handle case where SEO entry is not found, maybe return default metadata
    return {
      title: "Grand Bay Divers Punta Cana",
      description: "Discover scuba diving in Punta Cana with Grand Bay Divers.",
    };
  }

  const imageUrl = `https:${(seoEntry as any).fields.image.fields.file.url}`;
  const imageWidth = (seoEntry as any).fields.image.fields.file.details.image.width;
  const imageHeight = (seoEntry as any).fields.image.fields.file.details.image.height;
  const imageAlt = (seoEntry as any).fields.image.fields.title;

  return {
    title: String(seoEntry.fields.title),
    description: String(seoEntry.fields.description),
    keywords: seoEntry.fields.keywords as string[],
    openGraph: {
      url: "https://www.grandbay-puntacana.com",
      type: "website",
      title: String(seoEntry.fields.title),
      description: String(seoEntry.fields.description),
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
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
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    alternates: {
      canonical: "https://www.grandbay-puntacana.com",
    },
  };
}

export default async function Home(props: any) {
  // Data for the page layout will also be fetched at build time if `dynamic = "force-static"` is used
  // or if `revalidate` is set at the page level.
  const pageLayoutResult = await searchEntries("pageLayout", {
    "fields.page": "Index",
  });

  const pageLayout = pageLayoutResult.items[0];

  if (!pageLayout) {
    // Handle case where page layout is not found
    return (
      <main>
        <p>Content not found for this page. Please check Contentful.</p>
      </main>
    );
  }

  // Helper function to safely get image URL and details
  const getImageUrl = (field: any) => {
    return field?.fields?.file?.url ? `https:${field.fields.file.url}` : '';
  };

  const getFullImageDetails = (field: any) => {
    if (!field?.fields?.file) return {};
    return {
      url: `https:${field.fields.file.url}`,
      width: field.fields.file.details.image.width,
      height: field.fields.file.details.image.height,
      alt: field.fields.title || '',
    };
  };

  const heroImageDetails = getFullImageDetails((pageLayout as any).fields.heroImage);
  const secondaryHeroImageDetails = getFullImageDetails((pageLayout as any).fields.secondaryHeroImage);
  const tertiaryHeroImageDetails = getFullImageDetails((pageLayout as any).fields.tertiaryHeroImage);


  return (
    <main>
      {heroImageDetails.url && (
        <HeroComponent heroImage={heroImageDetails.url} />
      )}
      <div className="mt-[50vh] md:mt-[40vh] lg:mt-[70vh]" />
      <RichText context={pageLayout.fields.paragraph1} />
      <SelectionComponent
        secondaryHeroImage={secondaryHeroImageDetails.url || ''}
        linkImage1={(pageLayout as any).fields.linkImage1?.fields?.file}
        linkImage2={(pageLayout as any).fields.linkImage2?.fields?.file}
        linkImage3={(pageLayout as any).fields.linkImage3?.fields?.file}
      />
      <RichText context={pageLayout.fields.paragraph2} />
      <CloudinaryBackgroundVideo
        className="xl:min-h-[80vh] [clip-path:polygon(0%_5vh,100%_0%,100%_35vh,0%_100%)] lg:[clip-path:polygon(0%_5vh,100%_0%,100%_55vh,0%_100%)] xl:[clip-path:polygon(0%_5vh,100%_0%,100%_75vh,0%_100%)]"
        videoId={"coral-cut_lyykuw"}
      />
      <DivingOrganizations />
      <RichText context={pageLayout.fields.paragraph3} />
      {tertiaryHeroImageDetails.url && (
        <BackgroundImage image={tertiaryHeroImageDetails.url} />
      )}
      <GoogleMaps />
    </main>
  );
}