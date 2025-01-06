export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Grand Bay of the Sea",
    image:
      "https://images.ctfassets.net/iqfmqk4smewk/4CYN3rPs0ryO4Gi4JDPm8e/156feb808cdad566332c11071dac1e09/pexels-leonardo-lamas-7001709.webp?h=250",
    "@id": "",
    url: "https://www.grandbay-puntacana.com/",
    telephone: "+18297239338",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "Punta Cana",
      postalCode: "",
      addressCountry: "DO",
    },
    sameAs: [
      "https://www.facebook.com/grandbaydivecenter/",
      "https://www.instagram.com/grandbayoftheseard/",
      "https://twitter.com/GrandBayOfTheS1",
      "https://www.youtube.com/channel/UCpYWOhIwbVVLGYOxL0UAtTw",
    ],
  }
}
