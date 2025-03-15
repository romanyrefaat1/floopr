import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Lock body scroll when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleWaitlistClick = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-5 bg-transparent`}
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
            {/* <a href="#how-it-works" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              How it works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-floopr-purple transition-colors">
              Testimonials
            </a> */}
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
              className="text-gray-700 hover:text-floopr-purple transition-colors p-2 rounded-full hover:bg-floopr-purple-bg relative z-50"
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
      
      {/* Mobile menu - fixed position with higher z-index than main content */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-floopr-purple transition-colors p-2 rounded-full hover:bg-floopr-purple-bg"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col flex-grow items-center justify-center px-6">
            <nav className="flex flex-col space-y-8 w-full">
              <div className="flex justify-center items-center">
                <a href="/" className="flex justify-center items-center">
                  <span className="text-2xl text-center font-bold bg-gradient-to-r from-floopr-purple to-floopr-purple-dark bg-clip-text text-transparent">
                    floopr
                  </span>
                </a>
              </div>
              <a
                href="#features"
                className="block text-center text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-center text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefits
              </a>
              {/* <a
                href="#how-it-works"
                className="block text-center text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#testimonials"
                className="block text-center text-xl font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </a> */}
            </nav>
            
            <div className="mt-12 w-full">
              <Button 
                variant="default" 
                className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white rounded-full py-4 h-auto"
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