import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalSectionProps {
  className?: string;
}

export default function NewArrivalSection({ className = '' }: NewArrivalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const stockRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        outlineTextRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 0.35, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', rotation: 8, scale: 0.92, opacity: 0 },
        { x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        stockRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        outlineTextRef.current,
        { x: 0, opacity: 0.35 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotation: 0, opacity: 1 },
        { x: '18vw', rotation: 6, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -18, opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: 12, opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: 12, opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        stockRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="new-arrival-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Oversized "NEW" outline text */}
      <div
        ref={outlineTextRef}
        className="absolute left-[-6vw] top-[18vh] text-[clamp(180px,22vw,320px)] font-display outline-text uppercase leading-none"
      >
        NEW
      </div>

      {/* Feature card - center right */}
      <div
        ref={cardRef}
        className="absolute left-[52vw] top-[22vh] w-[40vw] h-[56vh] furniture-card animate-float-slow"
      >
        <img
          src="/images/velvet_sofa.jpg"
          alt="New arrival sofa"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Headline - left */}
      <h2
        ref={headlineRef}
        className="absolute left-[8vw] top-[34vh] w-[38vw] font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#F6F6F6] leading-[0.95]"
      >
        NEW<br />ARRIVAL
      </h2>

      {/* Body copy - left */}
      <p
        ref={bodyRef}
        className="absolute left-[8vw] top-[52vh] w-[34vw] text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)] leading-[1.6]"
      >
        A compact silhouette, built for real rooms. Soft upholstery meets a quiet frame—designed to slip into any corner without disappearing.
      </p>

      {/* CTA - left */}
      <button ref={ctaRef} className="absolute left-[8vw] top-[66vh] btn-outline">
        View details
      </button>

      {/* Stock label */}
      <span
        ref={stockRef}
        className="absolute left-[8vw] top-[74vh] font-mono text-[11px] text-[rgba(246,246,246,0.6)]"
      >
        IN STOCK
      </span>
    </section>
  );
}
