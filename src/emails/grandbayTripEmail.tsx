import React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

export const grandbayTripEmail = ({
  customerName = "Diving Enthusiast",
  hotel = "Barcelo",
  excursionName = "Two Tank Dive",
  excursionDate = "June 1, 2025",
  guestCount = 2,
  price = 250.0,
  deposit = 50.0,
  snorkelers = 0,
  certification = "Open Water",
  contactEmail = "grandbayofthesea@gmail.com",
  contactPhone = "+1 (829) 723-9338",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your diving excursion booking confirmation</Preview>
      <Body className="bg-gray-100 font-sans">
        <Tailwind>
          <Container className="bg-white max-w-2xl mx-auto my-8 rounded-lg shadow-lg">
            <Section className="bg-white rounded-t-lg p-8 border-b border-gray-700">
              <Img
                src={`https://www.grandbay-puntacana.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fiqfmqk4smewk%2F4AKIgOA6drFSpgIoRpPPu3%2F6b8b92af64259355d55d245dbe71b0cc%2Flogo.png&w=640&q=75`}
                width="150"
                height="120"
                alt="Dive Center Logo"
                className="mx-auto"
              />
              <Heading className="text-gray-700 text-center text-2xl font-bold mt-4">
                Booking Confirmation
              </Heading>
            </Section>
            <Hr className="my-0 border-gray-300" />
            <Section className="px-8 pt-6 pb-2">
              <Text className="text-gray-700">Hello {customerName},</Text>
              <Text className="text-gray-700">
                Thank you for booking with us! We&apos;re excited to confirm
                your upcoming fishing excursion. Here are the details of your
                reservation:
              </Text>
            </Section>

            <Section className="bg-gray-50 mx-8 p-6 rounded-lg">
              <Text className="font-bold text-lg text-blue-800">
                {excursionName}
              </Text>

              <Text className="text-gray-700">
                <strong>Date:</strong> {excursionDate}
              </Text>

              <Text className="text-gray-700">
                <strong>Number of Divers:</strong> {guestCount}
              </Text>

              <Text className="text-gray-700">
                <strong>Number of Snorkelers:</strong> {snorkelers}
              </Text>

              <Text className="font-bold text-gray-700">
                Total amount: ${price}
              </Text>

              <Text className="font-bold text-gray-700">
                Deposit: ${deposit}
              </Text>

              <Text className="font-bold text-gray-700">
                Remaining Balance: ${price - deposit}
              </Text>

              <Text className="text-gray-700">
                The remaining balance is to be paid in cash on the day of the
                excursion.
              </Text>
            </Section>

            <Section className="px-8 py-6">
              <Text className="text-gray-700 font-bold">What to bring:</Text>
              <Text className="text-gray-700">
                • Swimsuit
                <br />
                • Towel
                <br />
                • Sunscreen
                <br />• Certification card (for certified divers)
              </Text>

              <Hr className="my-6 border-gray-300" />

              <Text className="text-gray-700">
                <strong>Need to modify or cancel your booking?</strong>
              </Text>
              <Text className="text-gray-700">
                Please contact us at least 48 hours before your scheduled
                excursion to make any changes.
              </Text>
            </Section>

            <Hr className="border-gray-300" />

            <Section className="px-8 py-6 bg-gray-50 rounded-b-lg">
              <Text className="text-sm text-gray-600 text-center">
                If you have any questions, please contact us at:
                <br />
                Email:{" "}
                <Link href={`mailto:${contactEmail}`} target="_blank">
                  {contactEmail}
                </Link>
                <br />
                Phone:{" "}
                <Link
                  href={`https://wa.me/${contactPhone.replace(/\D/g, "")}`}
                  target="_blank"
                >
                  {contactPhone}
                </Link>
              </Text>

              <Text className="text-xs text-gray-500 text-center mt-4">
                &copy; {new Date().getFullYear()} Grand Bay of the Sea. All
                rights reserved.
              </Text>

              <Text className="text-xs text-gray-500 text-center">
                Punta Cana, Dominican Republic
              </Text>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  )
}

export default grandbayTripEmail
