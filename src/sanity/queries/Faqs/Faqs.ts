import { client } from "@/sanity/lib/client"
import { type Localized } from "@/i18n/locales"

export interface Faqs {
  page: string
  faqs: {
    _key: string
    question: Localized<string>
    answer: Localized<any[]>
  }[]
  structuredData: Localized<string>
}

export const faqsQuery = `*[_type == "faqs" && page == $page][0] {
  page,
  faqs[] {
    _key,
    question {
      en,
      es,
      de
    },
    answer {
      en,
      es,
      de
    }
  },
  structuredData {
    en,
    es,
    de
  }
}`

export const getFaqs = async (page: string): Promise<Faqs> => {
  const faqs = await client.fetch(faqsQuery, { page })
  return faqs
}
