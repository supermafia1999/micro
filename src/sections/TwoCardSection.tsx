import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TwoCardSectionProps {
  className?: string;
}

export default function TwoCardSection({ className = '' }: TwoCardSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftCaptionRef = useRef<HTMLParagraphElement>(null);
  const rightCaptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        headlineRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-50vw', rotation: -10, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: '50vw', rotation: 10, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        leftCaptionRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        rightCaptionRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.17
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        leftCaptionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.fromTo(
        rightCaptionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.82
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="two-card-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Top-center headline */}
      <h2
        ref={headlineRef}
        className="absolute left-1/2 -translate-x-1/2 top-[10vh] font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#F6F6F6] leading-[0.95] text-center"
      >
        PICK YOUR PIECE
      </h2>

      {/* Left card */}
      <div
        ref={leftCardRef}
        className="absolute left-[10vw] top-[26vh] w-[36vw] h-[44vh] furniture-card animate-float"
      >
        <img
          src="/images/scandi_chair_2.jpg"
          alt="Soft lines warm wood"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right card */}
      <div
        ref={rightCardRef}
        className="absolute left-[54vw] top-[26vh] w-[36vw] h-[44vh] furniture-card animate-float-slow"
      >
        <img
          src="/images/dining_room.jpg"
          alt="Bold curves matte finish"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left caption */}
      <p
        ref={leftCaptionRef}
        className="absolute left-[10vw] top-[74vh] w-[36vw] text-center text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)]"
      >
        Soft lines, warm wood.
      </p>

      {/* Right caption */}
      <p
        ref={rightCaptionRef}
        className="absolute left-[54vw] top-[74vh] w-[36vw] text-center text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)]"
      >
        Bold curves, matte finish.
      </p>

      {/* Center CTA */}
      <button
        ref={ctaRef}
        className="absolute left-1/2 -translate-x-1/2 top-[82vh] btn-outline"
      >
        Compare finishes
      </button>
    </section>
  );
}
