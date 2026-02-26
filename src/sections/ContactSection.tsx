import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Clock, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section animations (triggered on scroll)
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contactCardRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactCardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        newsletterRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className={`relative bg-[#F4F1EC] min-h-screen py-[10vh] px-[6vw] ${className}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - Heading */}
          <div ref={headingRef}>
            <h2 className="font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#0B0B0D] leading-[0.95]">
              REQUEST<br />A QUOTE
            </h2>
            <p className="mt-6 text-[rgba(11,11,13,0.72)] text-[clamp(14px,1.1vw,16px)] leading-[1.6] max-w-[400px]">
              Tell us what you're building. We'll recommend pieces, finishes, and layouts.
            </p>
            <button className="mt-8 px-6 py-3 bg-[#0B0B0D] text-[#F6F6F6] font-medium text-sm tracking-wide hover:bg-[#333] transition-colors">
              Start a project
            </button>
          </div>

          {/* Right column - Contact card */}
          <div
            ref={contactCardRef}
            className="bg-[#0B0B0D] border border-[rgba(246,246,246,0.18)] p-8 lg:p-10"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#B9B9B9] mt-0.5" />
                <div>
                  <span className="font-mono text-[11px] text-[rgba(246,246,246,0.6)] block mb-1">EMAIL</span>
                  <a href="mailto:hello@microsoftpastedue.com" className="text-[#F6F6F6] hover:text-[#B9B9B9] transition-colors">
                    hello@microsoftpastedue.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#B9B9B9] mt-0.5" />
                <div>
                  <span className="font-mono text-[11px] text-[rgba(246,246,246,0.6)] block mb-1">STUDIO</span>
                  <span className="text-[#F6F6F6]">Los Angeles / Remote design</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#B9B9B9] mt-0.5" />
                <div>
                  <span className="font-mono text-[11px] text-[rgba(246,246,246,0.6)] block mb-1">RESPONSE TIME</span>
                  <span className="text-[#F6F6F6]">1–2 business days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter section */}
        <div
          ref={newsletterRef}
          className="mt-20 pt-12 border-t border-[rgba(11,11,13,0.12)]"
        >
          <div className="max-w-[600px]">
            <h3 className="font-display text-[clamp(24px,2.4vw,36px)] uppercase text-[#0B0B0D] leading-[1.1]">
              GET NEW DROPS + ROOM IDEAS
            </h3>
            
            {subscribed ? (
              <p className="mt-4 text-[#0B0B0D]">Thanks for subscribing! Check your inbox soon.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-6 flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-transparent border border-[rgba(11,11,13,0.25)] text-[#0B0B0D] placeholder:text-[rgba(11,11,13,0.5)] focus:outline-none focus:border-[#0B0B0D]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0B0B0D] text-[#F6F6F6] font-medium text-sm tracking-wide hover:bg-[#333] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="mt-20 pt-8 border-t border-[rgba(11,11,13,0.12)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="font-mono text-[11px] text-[rgba(11,11,13,0.6)]">
            © 2026 MICRO SOFT PASTED DUE FURNITURE
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="font-mono text-[11px] text-[rgba(11,11,13,0.6)] hover:text-[#0B0B0D] transition-colors">
              PRIVACY
            </a>
            <a href="#" className="font-mono text-[11px] text-[rgba(11,11,13,0.6)] hover:text-[#0B0B0D] transition-colors">
              TERMS
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-[rgba(11,11,13,0.6)] hover:text-[#0B0B0D] transition-colors"
            >
              <Instagram className="w-4 h-4" />
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
