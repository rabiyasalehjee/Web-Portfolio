import React, { useState, useEffect } from "react";
import SharedParticles from "./SharedParticles"; // Import the shared particles

const skills = [
  { name: "React", level: 5 },
  { name: "Java", level: 7 },
  { name: "Tailwind", level: 5 },
  { name: "Python", level: 8 },
  { name: "Javascript", level: 7 },
  { name: "PHP", level: 6 },
];

const SkillBar = ({ skill, level }) => {
  return (
    <div className="flex items-center justify-between my-2 w-full h-12 sm:h-14"> {/* Adjusted for responsiveness */}
      <span className="text-sm sm:text-base md:text-xl font-semibold text-white w-3/5 text-left whitespace-nowrap"> 
        {skill}
      </span>

      <div className="flex gap-1 w-2/5 justify-end items-center"> {/* Dot section with original styling */}
        {Array(10) // 10 dots for more granularity
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                index < level
                  ? "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300"  // Circle styling
                  : "bg-gray-700"
              }`}
              style={{ borderRadius: "50%", width: "8px", height: "8px" }} // Ensuring perfect circle
            ></span>
          ))}
      </div>
    </div>
  );
};

const Section2 = () => {
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

  const screenHeight = window.innerHeight;
  const translateValue = Math.min((scrollY - screenHeight) / 5, 100);

  // Adjust opacity logic to maintain a minimum opacity of 1 when the scroll finishes
  const opacityValue = scrollY >= screenHeight ? 1 : Math.max(1 - (scrollY - screenHeight) / 400, 0.9);

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#111827",
        fontFamily: "Fira Code, monospace",
      }}
    >
      <SharedParticles id="particles-section2" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-auto lg:h-full px-4 lg:px-10 py-10">
        <div
          className="lg:w-1/2 p-4 md:p-6 text-white flex flex-col justify-center items-start"
          style={{
            transform: `translateY(${translateValue}px)`,
            transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            opacity: opacityValue, // Set the adjusted opacity here
            fontFamily: "Fira Code, monospace",
            letterSpacing: "0.03em",
            textAlign: "justify",
          }}
        >
          <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300">
            About Me
          </h2>
          <p className="text-sm sm:text-base md:text-xl leading-[1.2] max-w-lg hover:opacity-100 transition-opacity duration-300">
            I’m a passionate software developer with a deep love for full-stack development, data analysis, and large language models. My work is focused on delivering exceptional solutions that blend creativity with technical expertise. Whether it's front-end magic or back-end robustness, I thrive in bringing ideas to life with clean, scalable code.
          </p>
        </div>

        <div
          className="lg:w-1/2 p-4 md:p-6 flex flex-col justify-center items-start mt-6 lg:mt-0"
          style={{
            transform: `translateY(${translateValue}px)`,
            transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            opacity: opacityValue, // Adjusted opacity
            fontFamily: "Fira Code, monospace",
            letterSpacing: "0.03em",
          }}
        >
          <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300">
            Skills
          </h2>

          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-full lg:w-1/2 pr-0 lg:pr-4 mb-4 lg:mb-0">
              {skills.slice(0, 3).map(({ name, level }, index) => (
                <SkillBar key={index} skill={name} level={level} />
              ))}
            </div>
            <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
              {skills.slice(3).map(({ name, level }, index) => (
                <SkillBar key={index} skill={name} level={level} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Section2;
