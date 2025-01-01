import React, { useState, useEffect } from "react";
import SharedParticles from "./SharedParticles"; // Import the shared particles
import arrow from './arrow.png'; // Import the arrow image

const ProjectCard = ({ number, title, description, cooperationText, link }) => (
  <div className="bg-gray-800 text-white w-full md:w-1/3 p-4 m-4 rounded-lg shadow-lg relative transition-transform transform hover:scale-105 border border-gray-700 hover:border-blue-400 hover:bg-gray-900 hover:shadow-2xl h-auto flex flex-col justify-between">
    <div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4 leading-tight tracking-wide">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
        {description}
      </p>
    </div>
    <div className="absolute bottom-2 sm:bottom-4 left-4 right-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="w-5 sm:w-6 h-5 sm:h-6">
            <img src={arrow} alt="Arrow" className="w-full h-full" />
          </div>
        </a>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs sm:text-sm hover:underline">
          {cooperationText}
        </a>
      </div>
      <span className="text-blue-400 text-base sm:text-lg font-semibold">{number}</span>
    </div>
    <div className="absolute bottom-10 sm:bottom-12 left-4 right-4 border-b border-gray-600"></div>
  </div>
);

const Section3 = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic scroll values based on screen height
  const screenHeight = window.innerHeight;
  const translateValue = Math.min((scrollY - screenHeight * 2) / 5, 100);
  const opacityValue = Math.max(1 - (scrollY - screenHeight * 2) / 400, 0);

  // Check if the user is at the last section
  const isLastSection = scrollY >= screenHeight * 2;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden" style={{ margin: 0, padding: 0, backgroundColor: "#111827", fontFamily: "Fira Code, monospace" }}>
      {/* Use SharedParticles with unique ID */}
      <SharedParticles id="particles-section3" />

      {/* Content for My Projects */}
      <div className="relative z-10 flex flex-col items-center justify-center lg:justify-between h-auto lg:h-full px-4 sm:px-6 lg:px-10 py-6 sm:py-10 mt-12" style={{ 
        transform: isLastSection ? 'none' : `translateY(${translateValue}px)`, 
        transition: isLastSection ? 'none' : "transform 0.5s ease-out, opacity 0.5s ease-out", 
        opacity: isLastSection ? 1 : opacityValue 
      }}>
        <h2 className="text-lg sm:text-2xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300">
          My Projects
        </h2>

        {/* Project Cards */}
        <div className="flex flex-wrap justify-center items-stretch w-full">
          <ProjectCard
            number="01"
            title="HALO: A Human-and-LLM-in-the-Loop Data Cleaning System"
            description="A Python-based system integrating LLMs for automated data cleaning with human feedback"
            cooperationText="View More"
            link="https://github.com/rabiyasalehjee"
          />
          <ProjectCard
            number="02"
            title="Fluencio: Public Speaking Enhancement App"
            description="A mobile app using Java for speech analysis, offering feedback on pace and filler words to improve public speaking"
            cooperationText="View More"
            link="https://github.com/rabiyasalehjee"
          />
          <ProjectCard
            number="03"
            title="Fluencio - Website"
            description="A website providing tools for public speaking improvement with real-time feedback and user-friendly interface"
            cooperationText="View More"
            link="https://fluencio-website.vercel.app/"
          />
        </div>
      </div>
    </div>
  );
};
export default Section3;