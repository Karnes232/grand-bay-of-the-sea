export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Grand Bay of the Sea",
    description:
      "Join our Scuba Divers on the reefs around Punta Cana and the surrounding area. To learn about our Dive Company, visit our website now.",
    url: "https://www.grandbay-puntacana.com/",
    logo: "https://www.grandbay-puntacana.com/static/logo-smaller-d5cb1a00f0a9e9d2de1108977be2b0af.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+18297239338",
      contactType: "customer service",
      availableLanguage: ["en", "es", "fr"],
    },
    sameAs: [
      "https://www.facebook.com/grandbaydivecenter/",
      "https://twitter.com/GrandBayOfTheS1",
      "https://www.instagram.com/grandbayoftheseard/",
      "https://www.youtube.com/channel/UCpYWOhIwbVVLGYOxL0UAtTw",
      "https://www.grandbay-puntacana.com/",
    ],
  }
}
