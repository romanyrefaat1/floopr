
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWaitlistClick = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-floopr-purple to-floopr-purple-dark bg-clip-text text-transparent">
                floopr
              </span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              Benefits
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              How it works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              Testimonials
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-floopr-purple hover:bg-floopr-purple-dark text-white rounded-full"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </Button>
          </div>
          
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-gray-700 hover:text-floopr-purple transition-colors p-2 rounded-full hover:bg-floopr-purple-bg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-xl rounded-b-xl border-t border-gray-100">
            <a
              href="#features"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-floopr-purple-bg hover:text-floopr-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#benefits"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-floopr-purple-bg hover:text-floopr-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-floopr-purple-bg hover:text-floopr-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="#testimonials"
              className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-floopr-purple-bg hover:text-floopr-purple transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className="p-4">
              <Button 
                variant="default" 
                className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white rounded-full py-6 h-auto"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleWaitlistClick();
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
