import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import FeaturedBrands from "@/components/FeaturedBrands"
import Features from "@/components/Features"
import FocusSection from "@/components/FocusSection"
import AboutFounder from "@/components/AboutFounder"
import Footer from "@/components/Footer"
import FAQ from "@/components/FAQ"

export default function Home() {
  return (
    <main className="min-h-screen bg-primary relative">
      <Navbar />
      <Hero />
      <FeaturedBrands />
      <Features />
      {/* <Testimonials /> */}
      {/* <Benefits /> */}
      <FocusSection />
      <AboutFounder />
      {/* <Demo /> */}
      <FAQ />
      <Footer />
    </main>
  )
}

