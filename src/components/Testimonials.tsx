
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "Floopr has transformed how we collect feedback. It's intuitive, beautiful, and our users love it!",
    author: "Sarah Johnson",
    role: "Product Manager at Acme"
  },
  {
    quote: "Setting up our feedback portal took less than 10 minutes. Now we're getting insights we never had before.",
    author: "Michael Chen",
    role: "Founder of StartupX"
  },
  {
    quote: "The embeddable widgets are a game-changer. Our user engagement has increased by 40% since implementation.",
    author: "Emily Rodriguez",
    role: "UX Director at TechCorp"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="testimonials" className="bg-floopr-purple-bg py-20" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by product teams
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our early users are saying about Floopr
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 animate-on-scroll"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
  </svg>
);

export default Testimonials;
