import React, { useState, useEffect } from "react";
import SharedParticles from "./SharedParticles"; // Import the shared particles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import solid icon for email

const Design = ({ section2Ref, smoothScrollTo, setActiveSection, sections }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false); // Track page load state

  useEffect(() => {
    // Set page load state after a short delay to trigger the transition
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100); // Delay for smooth transition on load

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll-based transition values
  const translateValue = Math.min(scrollY / 5, 100);
  const opacityValue = Math.max(1 - scrollY / 400, 0);

  // Initial load transition values
  const initialTranslate = isPageLoaded ? '0px' : '50px';  // Start with 50px translate on load, then move to 0px
  const initialOpacity = isPageLoaded ? 1 : 0;  // Start with opacity 0, then fade to 1 on load

  // Add a smooth scroll function for the mouse indicator
  const scrollToSection2 = () => {
    const targetPosition = sections[1].current.offsetTop; // Get the position of Section 2
    smoothScrollTo(targetPosition, 1200); // Use the same smoothScrollTo function
    setActiveSection(2); // Update the active section
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center"
      style={{ background: "#111827", zIndex: 1 }}
    >
      {/* Use SharedParticles with unique ID */}
      <SharedParticles id="particles-design" />

      {/* Container to ensure text is centered */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        style={{
          transform: `translateY(${translateValue}px)`,  // Apply scroll-based translateY
          opacity: opacityValue,  // Apply scroll-based opacity
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out",  // Smooth transition for scrolling
        }}
      >
        {/* Name with responsive size and centered */}
        <h1
          className="font-bold text-white uppercase tracking-wide leading-tight"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 6rem)', // Makes text responsive and adjusts based on screen size
            transform: `translateY(${initialTranslate})`,  // Initial load translate effect
            opacity: initialOpacity,  // Initial load opacity effect
            transition: "transform 1.5s ease-out, opacity 1.5s ease-out",  // Smooth transition for page load
          }}
        >
          RABIYA SALEHJEE
        </h1>

        {/* Tagline with gradient and responsive size */}
        <p
          className="font-light uppercase tracking-widest mt-4 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to right, #ff7eb3, #ff65a3, #ff4589, #ff236e, #ff005c)', // Gradient with pink tones
            WebkitBackgroundClip: 'text',
            fontSize: 'clamp(1rem, 2.5vw, 2rem)', // Ensures tagline is responsive
            transform: `translateY(${initialTranslate})`,  // Initial load translate effect
            opacity: initialOpacity,  // Initial load opacity effect
            transition: "transform 1.5s ease-out, opacity 1.5s ease-out",  // Smooth transition for page load
          }}
        >
          Developer. Innovator. Problem-Solver.
        </p>

        {/* Social Media Icons */}
        <div
          className="flex space-x-4 mt-4"
          style={{
            transform: `translateY(${initialTranslate})`,  // Initial load translate effect for icons
            opacity: initialOpacity,  // Initial load opacity effect for icons
            transition: "transform 1.5s ease-out, opacity 1.5s ease-out",  // Same transition for icons
          }}
        >
          <a href="https://www.linkedin.com/in/rabiyasalehjee99/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-white hover:text-gray-400" />
          </a>
          <a href="https://github.com/rabiyasalehjee" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" className="text-white hover:text-gray-400" />
          </a>
          <a href="https://x.com/rabiya_salehjee" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} size="2x" className="text-white hover:text-gray-400" />
          </a>
          <a href="mailto:rabiya.salehjee@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} size="2x" className="text-white hover:text-gray-400" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator (Styled like a mouse) */}
      <div 
        className="absolute bottom-10 flex flex-col items-center"
        onClick={scrollToSection2}  // Add the scroll trigger here
      >
        <div className="mouse-indicator">
          <div className="mouse-wheel"></div>
        </div>
      </div>
    </div>
  );
};

export default Design;
