import { useEffect, useState } from 'react';

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
      
      // Check if we're in the contact section (light background)
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        setIsLightBg(rect.top < 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div
        className={`w-full px-6 py-4 flex justify-between items-center backdrop-blur-md ${
          isLightBg ? 'bg-[#F4F1EC]/80' : 'bg-[#0B0B0D]/80'
        }`}
      >
        {/* Logo */}
        <div
          className={`font-mono text-[11px] tracking-[0.15em] uppercase cursor-pointer ${
            isLightBg ? 'text-[#0B0B0D]' : 'text-[#F6F6F6]'
          }`}
          onClick={() => scrollToSection('hero-section')}
        >
          micro soft pasted due furniture
        </div>

        {/* Nav Links */}
        <div className="flex gap-8">
          {['Collection', 'Lookbook', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollToSection(
                  item === 'Collection'
                    ? 'collection-section'
                    : item === 'Lookbook'
                    ? 'living-room-section'
                    : 'contact-section'
                )
              }
              className={`font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                isLightBg
                  ? 'text-[#0B0B0D] hover:text-[#555]'
                  : 'text-[#F6F6F6] hover:text-[#B9B9B9]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
