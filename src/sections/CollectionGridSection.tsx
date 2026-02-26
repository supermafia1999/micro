import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CollectionGridSectionProps {
  className?: string;
}

export default function CollectionGridSection({ className = '' }: CollectionGridSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const verticalTextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const collectionImages = [
    '/images/armchair_wood.jpg',
    '/images/scandi_chair_2.jpg',
    '/images/minimalist_room.jpg',
    '/images/dining_chair_modern.jpg',
    '/images/sofa_luxury.jpg',
    '/images/furniture_still_life.jpg',
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
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

      // Cards staggered entrance from different directions
      const cardEntrances = [
        { x: '-30vw', y: '20vh', rotation: -10 },
        { x: '0', y: '40vh', rotation: 6 },
        { x: '30vw', y: '20vh', rotation: 10 },
        { x: '-30vw', y: '-20vh', rotation: -8 },
        { x: '0', y: '-40vh', rotation: 6 },
        { x: '30vw', y: '-20vh', rotation: 12 },
      ];

      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: cardEntrances[i].x, y: cardEntrances[i].y, rotation: cardEntrances[i].rotation, opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'none' },
            i * 0.03
          );
        }
      });

      scrollTl.fromTo(
        verticalTextRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: 0, y: 0, opacity: 1 },
            { x: cardEntrances[i].x, y: cardEntrances[i].y, opacity: 0, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        }
      });

      scrollTl.fromTo(
        verticalTextRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.88
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection-section"
      className={`pinned-section bg-[#0B0B0D] ${className}`}
    >
      {/* Top-left heading */}
      <div ref={headlineRef} className="absolute left-[6vw] top-[10vh] w-[40vw]">
        <h2 className="font-display text-[clamp(44px,5.2vw,84px)] uppercase text-[#F6F6F6] leading-[0.95]">
          THE COLLECTION
        </h2>
        <p className="mt-3 text-[rgba(246,246,246,0.72)] text-[clamp(14px,1.1vw,16px)]">
          Chairs, sofas, and objects—curated by shape, material, and mood.
        </p>
      </div>

      {/* Grid cards */}
      <div className="absolute left-[6vw] top-[26vh] w-[70vw] h-[60vh]">
        {/* Row 1 */}
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="absolute left-0 top-0 w-[22vw] h-[28vh] furniture-card animate-float"
        >
          <img src={collectionImages[0]} alt="Collection piece 1" className="w-full h-full object-cover" />
        </div>
        <div
          ref={(el) => { cardsRef.current[1] = el; }}
          className="absolute left-[24vw] top-0 w-[22vw] h-[28vh] furniture-card animate-float-slow"
        >
          <img src={collectionImages[1]} alt="Collection piece 2" className="w-full h-full object-cover" />
        </div>
        <div
          ref={(el) => { cardsRef.current[2] = el; }}
          className="absolute left-[48vw] top-0 w-[22vw] h-[28vh] furniture-card animate-float-delayed"
        >
          <img src={collectionImages[2]} alt="Collection piece 3" className="w-full h-full object-cover" />
        </div>

        {/* Row 2 */}
        <div
          ref={(el) => { cardsRef.current[3] = el; }}
          className="absolute left-0 top-[30vh] w-[22vw] h-[28vh] furniture-card animate-float-slow"
        >
          <img src={collectionImages[3]} alt="Collection piece 4" className="w-full h-full object-cover" />
        </div>
        <div
          ref={(el) => { cardsRef.current[4] = el; }}
          className="absolute left-[24vw] top-[30vh] w-[22vw] h-[28vh] furniture-card animate-float"
        >
          <img src={collectionImages[4]} alt="Collection piece 5" className="w-full h-full object-cover" />
        </div>
        <div
          ref={(el) => { cardsRef.current[5] = el; }}
          className="absolute left-[48vw] top-[30vh] w-[22vw] h-[28vh] furniture-card animate-float-delayed"
        >
          <img src={collectionImages[5]} alt="Collection piece 6" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Right-side vertical text */}
      <div
        ref={verticalTextRef}
        className="absolute right-[4vw] top-[18vh] origin-top-right rotate-90 font-mono text-[11px] text-[rgba(246,246,246,0.6)]"
      >
        COLLECTION 01
      </div>

      {/* Bottom-right CTA */}
      <button
        ref={ctaRef}
        className="absolute right-[6vw] bottom-[10vh] btn-outline"
      >
        Open the lookbook
      </button>
    </section>
  );
}
