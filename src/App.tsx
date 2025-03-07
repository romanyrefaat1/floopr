"use client"

import { useContext, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import FeaturedBrands from "./components/FeaturedBrands"
import Features from "./components/Features/Features"
import FocusSection from "./components/Focus/FocusSection"
import Demo from "./components/Demo"
import AboutFounder from "./components/AboutFounder"
import Footer from "./components/Footer"
import "./global.css"
import { ModalContext } from "./contexts/modalContext"
import Benefits from "./components/Benefits"
import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import DynamicMeta from "./components/DynamicMeta.tsx"

import content from "./config/content.json" // Import content

function App() {
  const { isModal, modal, closeModal } = useContext(ModalContext)
  const description = content?.brand?.description || "Default description"

  const [email, setEmail] = useState<string>("")

  return (
    <div className="min-h-screen bg-primary relative">
      <DynamicMeta description={description} />
      <Navbar />
      <Hero email={email} setEmail={setEmail} />
      <FeaturedBrands />
      <Features />
      <Testimonials />
      <Benefits />
      <FocusSection email={email} setEmail={setEmail} />
      <AboutFounder />
      <Demo />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App

