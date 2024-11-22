"use server"

export async function submitForm(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const hotel = formData.get('hotel')
  const message = formData.get('message')

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }
  //   console.log(formData)
  // const name = formData.get("name")
  // const email = formData.get("email")
  // const hotel = formData.get("hotel")
  // const message = formData.get("message")
  // const urlSearchParams = new URLSearchParams(formData);
  // const newFormData = new FormData(form);
  // const formDataObj = {};
  // newFormData.forEach((value, key) => (formDataObj[key] = value));
//   const encode = (data: any) => {
//     return Object.keys(data)
//       .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//       .join("&")
//   }

  // try {
  //   const response = await fetch("/__forms.html", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: urlSearchParams.toString(),

  //   })
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name: name?.toString() || '',
        email: email?.toString() || '',
        hotel: hotel?.toString() || '',
        message: message?.toString() || ''
      })
    });
    return { success: response.ok }
  } catch (error) {
    console.error("Form submission error:", error)
    return { success: false }
  }
}
