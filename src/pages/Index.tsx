
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Integrations from '@/components/Integrations';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

interface IndexProps {
  lastUpdated?: string;
}

const Index = ({ lastUpdated }: IndexProps) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize intersection observer to handle animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Observe all elements with animate-on-scroll class
    const animatedElements = mainRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Floopr",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "The all-in-one platform to collect, organize, and act on user feedback",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/ComingSoon"
    },
    "dateModified": lastUpdated || new Date().toISOString()
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div ref={mainRef} className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <div className="gradient-section">
            <Features />
          </div>
          <Integrations />
          <div className="gradient-section">
            <Benefits />
          </div>
          <div className="gradient-section">
            <Testimonials />
          </div>
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
