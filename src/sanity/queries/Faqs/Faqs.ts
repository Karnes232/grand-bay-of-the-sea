import { client } from "@/sanity/lib/client"

export interface Faqs {
  page: string
  faqs: {
    _key: string
    question: {
      en: string
      es: string
    }
    answer: {
      en: any[]
      es: any[]
    }
  }[]
  structuredData: {
    en: string
    es: string
  }
}

export const faqsQuery = `*[_type == "faqs" && page == $page][0] {
  page,
  faqs[] {
    _key,
    question {
      en,
      es
    },
    answer {
      en,
      es
    }
  },
  structuredData {
    en,
    es
  }
}`

export const getFaqs = async (page: string): Promise<Faqs> => {
  const faqs = await client.fetch(faqsQuery, { page })
  return faqs
}
