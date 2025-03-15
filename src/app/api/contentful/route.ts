import { getAllEntries, getAllEntriesExcludingSlugs } from '@/lib/contentful'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const options = []
    const courses = await getAllEntries('course') // Replace 'paymentContent' with your actual content type ID
    courses.forEach((course) => {
        const deposit = Number(course.fields.padiPrice) / 2
        const obj = {
            title: `${course.fields.course} - Course`,
            price: course.fields.padiPrice,
            deposit: deposit
        }
        options.push(obj)
    })
    const overviewInfo = await getAllEntries("localDiveOverview")
    overviewInfo.forEach((dive) => {
        const obj = {
            title: `${dive.fields.title} - Dive Package`,
            price: dive.fields.twoTankDive,
            deposit: dive.fields.depositPrice
        }
        options.push(obj)
    })

    const tours = await getAllEntriesExcludingSlugs('tours', ['whale-watching-adventure', 'silverbank-expedition']);
    tours.forEach((tour) => {
        const obj = {
            title: `${tour.fields.page} - Dive Trip`,
            price: tour.fields.price,
            deposit: tour.fields.depositPrice
        }
        options.push(obj)
    })
    return NextResponse.json(options)
  } catch (error) {
    console.error('Error in contentful API route:', error)
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 })
  }
}