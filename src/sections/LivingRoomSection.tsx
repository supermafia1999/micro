import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LivingRoomSectionProps {
  className?: string;
}

export default function LivingRoomSection({ className = '' }: LivingRoomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const outlineTextRef = useRef<HTMLDivElement>(null);
  const sceneCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
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
        outlineTextRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 0.35, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        sceneCardRef.current,
        { x: '60vw', rotation: 8, scale: 0.92, opacity: 0 },
        { x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        outlineTextRef.current,
        { opacity: 0.35 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        sceneCardRef.current,
        { x: 0, opacity: 1 },
        { x: '16vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="living-room-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Oversized outline text "LIVING" */}
      <div
        ref={outlineTextRef}
        className="absolute left-[-4vw] top-[16vh] text-[clamp(160px,20vw,280px)] font-display outline-text uppercase leading-none"
      >
        LIVING
      </div>

      {/* Main scene card - right */}
      <div
        ref={sceneCardRef}
        className="absolute left-[50vw] top-[18vh] w-[44vw] h-[56vh] furniture-card animate-float-slow"
      >
        <img
          src="/images/living_room.jpg"
          alt="Living room scene"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom-left headline */}
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[62vh] font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#F6F6F6] leading-[0.95]"
      >
        LIVING ROOM
      </h2>

      {/* Bottom-left body */}
      <p
        ref={bodyRef}
        className="absolute left-[6vw] top-[74vh] w-[40vw] text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)] leading-[1.6]"
      >
        Sofas, chairs, and the small objects that make a room feel lived-in.
      </p>

      {/* CTA */}
      <button
        ref={ctaRef}
        className="absolute left-[6vw] top-[84vh] btn-outline"
      >
        Shop living room
      </button>
    </section>
  );
}
