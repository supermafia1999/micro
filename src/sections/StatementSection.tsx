import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatementSectionProps {
  className?: string;
}

export default function StatementSection({ className = '' }: StatementSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

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

      const lines = [line1Ref, line2Ref, line3Ref, line4Ref];

      // ENTRANCE (0% - 30%)
      lines.forEach((lineRef, i) => {
        if (lineRef.current) {
          scrollTl.fromTo(
            lineRef.current,
            { x: '-18vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            i * 0.04
          );
        }
      });

      scrollTl.fromTo(
        cardARef.current,
        { x: '50vw', rotation: 12, scale: 0.9, opacity: 0 },
        { x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        cardBRef.current,
        { x: '50vw', y: '20vh', rotation: -10, scale: 0.9, opacity: 0 },
        { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70% - 100%)
      lines.forEach((lineRef, i) => {
        if (lineRef.current) {
          scrollTl.fromTo(
            lineRef.current,
            { x: 0, opacity: 1 },
            { x: '-10vw', opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        }
      });

      scrollTl.fromTo(
        cardARef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        cardBRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: '18vw', y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        captionRef.current,
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
      id="statement-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Big statement - left */}
      <div className="absolute left-[6vw] top-[18vh] w-[52vw]">
        <div
          ref={line1Ref}
          className="font-display text-[clamp(40px,4.8vw,76px)] uppercase text-[#F6F6F6] leading-[0.98]"
        >
          WE PASTE
        </div>
        <div
          ref={line2Ref}
          className="font-display text-[clamp(40px,4.8vw,76px)] uppercase text-[#F6F6F6] leading-[0.98]"
        >
          FURNITURE
        </div>
        <div
          ref={line3Ref}
          className="font-display text-[clamp(40px,4.8vw,76px)] uppercase text-[#F6F6F6] leading-[0.98]"
        >
          INTO YOUR
        </div>
        <div
          ref={line4Ref}
          className="font-display text-[clamp(40px,4.8vw,76px)] uppercase text-[#F6F6F6] leading-[0.98]"
        >
          SPACE
        </div>
      </div>

      {/* Floating cards - right */}
      <div
        ref={cardARef}
        className="absolute left-[62vw] top-[14vh] w-[30vw] h-[30vw] furniture-card animate-float"
      >
        <img
          src="/images/minimalist_living.jpg"
          alt="Design objects"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={cardBRef}
        className="absolute left-[66vw] top-[54vh] w-[26vw] h-[26vw] furniture-card animate-float-slow"
      >
        <img
          src="/images/dining_set.jpg"
          alt="Furniture detail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Small caption - bottom-left */}
      <div
        ref={captionRef}
        className="absolute left-[6vw] bottom-[10vh] w-[34vw]"
      >
        <p className="text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)] leading-[1.6]">
          Start with a shape. Add texture. Build a room that feels accidental—in a good way.
        </p>
        <button className="mt-4 text-[#F6F6F6] font-mono text-[11px] underline underline-offset-4 hover:text-[#B9B9B9] transition-colors">
          Read our approach
        </button>
      </div>
    </section>
  );
}
