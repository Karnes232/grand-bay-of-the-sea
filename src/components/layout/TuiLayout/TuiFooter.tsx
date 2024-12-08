import React from "react"
import Copyright from "../FooterComponents/Copyright"
import SocialMedia from "../FooterComponents/SocialMedia"
import "@/styles/footer/footer.css"
const TuiFooter = () => {
  return (
    <footer className="border-b bg-gray-800 shadow-sm w-screen">
      <div className="mx-5 flex max-w-6xl flex-col justify-between xl:mx-auto">
        <SocialMedia />

        <div className="flex flex-col justify-between md:flex-row">
          <Copyright />
        </div>
      </div>
    </footer>
  )
}

export default TuiFooter
