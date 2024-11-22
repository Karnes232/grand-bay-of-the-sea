// "use server"

// export async function submitForm(formData: FormData) {
//   const name = formData.get("name")
//   const email = formData.get("email")
//   const hotel = formData.get("hotel")
//   const message = formData.get("message")

//   const encode = (data: any) => {
//     return Object.keys(data)
//       .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//       .join("&")
//   }

//   try {
//     const response = await fetch("/__forms.html", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: encode({
//         "form-name": "contact",
//         name,
//         email,
//         hotel,
//         message,
//       }),
//     })

//     return { success: response.ok }
//   } catch (error) {
//     console.error("Form submission error:", error)
//     return { success: false }
//   }
// }
