import { getAllEntries, searchEntries } from "@/lib/contentful"

export async function generateStaticParams() {
  const searchResults = await getAllEntries("course")

  return searchResults.map(course => ({
    slug: course.fields.slug,
  }))
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
