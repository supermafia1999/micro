import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitEditorialSectionProps {
  className?: string;
}

export default function SplitEditorialSection({ className = '' }: SplitEditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

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
        imageCardRef.current,
        { x: '-60vw', rotation: -6, scale: 0.92, opacity: 0 },
        { x: 0, rotation: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.08
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        labelRef.current,
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
      id="split-editorial-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Small label - top right */}
      <span
        ref={labelRef}
        className="absolute right-[6vw] top-[10vh] font-mono text-[11px] text-[rgba(246,246,246,0.6)]"
      >
        DETAIL 02
      </span>

      {/* Left image card */}
      <div
        ref={imageCardRef}
        className="absolute left-[6vw] top-[16vh] w-[44vw] h-[68vh] furniture-card animate-float-slow"
      >
        <img
          src="/images/living_room.jpg"
          alt="Designed for daily use"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right text block */}
      <div className="absolute left-[54vw] top-[22vh] w-[40vw]">
        <h2
          ref={headlineRef}
          className="font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#F6F6F6] leading-[0.95]"
        >
          DESIGNED<br />FOR DAILY<br />USE
        </h2>

        <p
          ref={bodyRef}
          className="mt-8 text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)] leading-[1.6]"
        >
          Rounded edges, honest materials, and a frame that doesn't shout. This is furniture that gets better the longer you live with it.
        </p>

        <button ref={ctaRef} className="mt-8 btn-outline">
          See materials
        </button>
      </div>
    </section>
  );
}
