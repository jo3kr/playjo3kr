import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CardAnimation = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef();

  // Add the card elements to the cardsRef array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const startAnimation = () => {
    // Animate the cards using GSAP
    gsap.from(cardsRef.current, {
      duration: 1,
      y: -300,
      x: (i) => 0,
      rotation: 540,
      opacity: 0,
      stagger: 0.3,
      ease: 'back.out(1.6)',
      transformOrigin: 'center',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      ref={containerRef}
    >
      <div className="card-container flex space-x-2">
        {['J', 'O', 'E', 'L', `🃏`, 'J', 'O', 'H', 'N'].map((letter, i) => (
          <div
            key={i}
            className="card w-16 h-24 flex items-center justify-center text-2xl font-bold bg-white shadow-lg border border-black rounded-md"
            ref={addToRefs}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardAnimation;
