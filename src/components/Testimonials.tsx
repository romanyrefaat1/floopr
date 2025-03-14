
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "I just love how the Floopr feedback widget helps us proactively gather feedback.",
    author: "Matthias",
    role: "CountdownTimer",
    avatar: "/lovable-uploads/d7f871f8-474a-41b1-ac00-838455185d85.png"
  },
  {
    quote: "The feedback started rolling in almost immediately, which feels like I'm directly chatting with my users.",
    author: "Robin Delta",
    role: "ShortMagic",
    avatar: "/lovable-uploads/e7a3d9a5-7887-47e8-a393-e9759f4ddcd2.png"
  },
  {
    quote: "Simple yet powerful. Exactly the no-frills feedback tool I needed.",
    author: "Peter",
    role: "IndieCourse",
    avatar: "/lovable-uploads/134bb789-6f30-4816-aba0-0ac863415f3d.png"
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
    <section id="testimonials" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative inline-block">
            Loved by product teams
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto font-medium">
            See what our early users are saying about Floopr
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto p-8 border border-gray-100 rounded-2xl bg-white shadow-xl animate-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-floopr-purple/20">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-black font-medium mb-6">"{testimonial.quote}"</p>
                
                <div>
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-floopr-purple/5 rounded-full blur-3xl -z-10"></div>
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
