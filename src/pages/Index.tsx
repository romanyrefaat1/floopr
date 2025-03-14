
import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Integrations from '@/components/Integrations';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
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

  return (
    <div ref={mainRef} className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="relative overflow-hidden">
          {/* Subtle radial gradient for Features section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-gradient-radial from-floopr-purple/5 to-transparent opacity-70 -z-10"></div>
          <Features />
        </div>
        <Integrations />
        <div className="relative overflow-hidden">
          {/* Subtle radial gradient for Benefits section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-gradient-radial from-floopr-purple/5 to-transparent opacity-70 -z-10"></div>
          <Benefits />
        </div>
        <div className="relative overflow-hidden">
          {/* Subtle radial gradient for Testimonials section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-gradient-radial from-floopr-purple/5 to-transparent opacity-70 -z-10"></div>
          <Testimonials />
        </div>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
