import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const cardCRef = useRef<HTMLDivElement>(null);
  const cardDRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ delay: 0.2 });

      // Headline animation
      loadTl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      // Subheadline
      loadTl.fromTo(
        subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // CTA
      loadTl.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // Cards fly in from different directions
      loadTl.fromTo(
        cardARef.current,
        { x: '40vw', y: '-20vh', rotation: 18, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      );

      loadTl.fromTo(
        cardBRef.current,
        { x: '50vw', y: '10vh', rotation: -12, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=1'
      );

      loadTl.fromTo(
        cardCRef.current,
        { x: '-20vw', y: '40vh', rotation: 22, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.9'
      );

      loadTl.fromTo(
        cardDRef.current,
        { x: '30vw', y: '30vh', rotation: -25, scale: 0.85, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.85'
      );

      // Badge
      loadTl.fromTo(
        badgeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, badgeRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set([cardARef.current, cardBRef.current, cardCRef.current, cardDRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              rotation: 0,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        cardARef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '22vw', y: '-10vh', rotation: 10, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardBRef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '28vw', y: '18vh', rotation: -8, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cardCRef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '-18vw', y: '22vh', rotation: 14, opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        cardDRef.current,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        { x: '18vw', y: '18vh', rotation: -18, opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('collection-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className={`pinned-section bg-[#0B0B0D] vignette ${className}`}
    >
      {/* Collection label - top right */}
      <div className="absolute top-[10vh] right-[6vw] font-mono text-[11px] text-[rgba(246,246,246,0.6)]">
        COLLECTION 01
      </div>

      {/* Text block - left side */}
      <div className="absolute left-[6vw] top-[18vh] w-[46vw]">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(56px,7.2vw,112px)] uppercase text-[#F6F6F6] leading-[0.92]"
        >
          FURNITURE
        </h1>
        <p
          ref={subheadRef}
          className="mt-4 text-[clamp(18px,1.8vw,28px)] text-[rgba(246,246,246,0.72)] font-light"
        >
          Pasted into life.
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToCollection}
          className="mt-8 btn-primary"
        >
          Explore the collection
        </button>
      </div>

      {/* Floating collage cards - right cluster */}
      <div
        ref={cardARef}
        className="absolute left-[58vw] top-[10vh] w-[34vw] h-[34vw] furniture-card animate-float"
      >
        <img
          src="/images/hero_vase.jpg"
          alt="Sculptural vase"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={cardBRef}
        className="absolute left-[62vw] top-[44vh] w-[28vw] h-[28vw] furniture-card animate-float-slow"
      >
        <img
          src="/images/chair_01.jpg"
          alt="Designer chair"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={cardCRef}
        className="absolute left-[52vw] top-[62vh] w-[22vw] h-[22vw] furniture-card animate-float-delayed"
      >
        <img
          src="/images/scandi_chair.jpg"
          alt="Scandinavian chair"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={cardDRef}
        className="absolute left-[78vw] top-[72vh] w-[16vw] h-[16vw] furniture-card animate-float"
      >
        <img
          src="/images/texture_detail.jpg"
          alt="Texture detail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* NEW badge - bottom left */}
      <div
        ref={badgeRef}
        className="absolute left-[8vw] top-[72vh] px-4 py-2 bg-[#B9B9B9] text-[#0B0B0D] font-mono text-[11px]"
      >
        NEW
      </div>
    </section>
  );
}
