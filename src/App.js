import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";  
import Design from "./components/Design";  
import Section2 from "./components/Section2";  
import Section3 from "./components/Section3";  
import { FaArrowDown } from "react-icons/fa";  
import './index.css';  
import CustomCursor from './components/CustomCursor'; // Import the custom cursor 

// Add the Navigation Bar component
const Navbar = ({ activeSection, handleClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-14 bg-navbar rounded-full mt-2 mx-auto w-2/3 max-w-screen-lg text-white font-fira">
      <ul className="flex justify-around w-full">
        {["Home", "Skills", "Projects", "Resume"].map((section, index) => {
          // Handle resume click separately
          if (section === "Resume") {
            return (
              <li key={index} className="relative cursor-pointer text-lg font-light">
                <a
                  href="/RabiyaSalehjeeCV.pdf" // Path to your resume in the public folder
                  download="Rabiya_Salehjee_Resume.pdf" // Optional: specify download filename
                  className="text-white"
                >
                  {section}
                </a>
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className={`relative cursor-pointer text-lg font-light ${
                  activeSection === index + 1 ? "font-bold" : "font-light"
                }`}
                onClick={() => handleClick(index + 1)}
              >
                {section}
                {activeSection === index + 1 && (
                  <span className="absolute left-0 right-0 h-1 bg-pink-500 bottom-0 mx-auto w-6"></span>
                )}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

// Easing function for smooth scroll
const easeInOutQuad = (t, b, c, d) => { 
  t /= d / 2; 
  if (t < 1) return (c / 2) * t * t + b; 
  t--; 
  return (-c / 2) * (t * (t - 2) - 1) + b; 
};

// Custom scroll function
const smoothScrollTo = (targetPosition, duration = 1000) => { 
  const startPosition = window.scrollY; 
  const distance = targetPosition - startPosition; 
  let startTime = null;

  const animation = (currentTime) => { 
    if (startTime === null) startTime = currentTime; 
    const timeElapsed = currentTime - startTime; 
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration); 
    window.scrollTo(0, run); 

    if (timeElapsed < duration) requestAnimationFrame(animation); 
  };

  requestAnimationFrame(animation); 
};

function App() { 
  const [activeSection, setActiveSection] = useState(1); 
  const [isScrolling, setIsScrolling] = useState(false); 

  const section1Ref = useRef(null); 
  const section2Ref = useRef(null); 
  const section3Ref = useRef(null);

  const sections = useMemo(() => [section1Ref, section2Ref, section3Ref], []);

  const handleWheelScroll = useCallback((event) => { 
    event.preventDefault(); 

    if (isScrolling) return; 

    const currentSectionIndex = activeSection - 1; 
    setIsScrolling(true); 

    const scrollToSection = (index) => { 
      const targetPosition = sections[index].current.offsetTop; 
      smoothScrollTo(targetPosition, 1200); 
      setActiveSection(index + 1); 
    };

    if (event.deltaY > 0) { 
      if (currentSectionIndex < sections.length - 1) { 
        scrollToSection(currentSectionIndex + 1); 
      } 
    } else { 
      if (currentSectionIndex > 0) { 
        scrollToSection(currentSectionIndex - 1); 
      } 
    }

    setTimeout(() => { 
      setIsScrolling(false); 
    }, 1300); 
  }, [activeSection, isScrolling, sections]);

  const handleClick = (sectionNumber) => {
    const sectionRef = sections[sectionNumber - 1].current;
    const offsetTop = sectionRef.offsetTop;
    smoothScrollTo(offsetTop, 1000);
    setActiveSection(sectionNumber);
  };

  useEffect(() => { 
    if ('scrollRestoration' in window.history) { 
      window.history.scrollRestoration = 'manual'; 
    } 
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => { 
    window.addEventListener("wheel", handleWheelScroll, { passive: false }); 
    return () => { 
      window.removeEventListener("wheel", handleWheelScroll); 
    }; 
  }, [handleWheelScroll]);

  return ( 
    <div className="relative"> 
      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} handleClick={handleClick} />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Indicator Dots */} 
<div className="dots-container fixed right-8 top-1/2 transform -translate-y-1/2 z-50" style={{ zIndex: 50 }}>
  <div className="flex flex-col items-center gap-4">
    <div className={`w-3 h-3 rounded-full ${activeSection === 1 ? "bg-white" : "bg-gray-500"}`}></div>
    <div className={`w-3 h-3 rounded-full ${activeSection === 2 ? "bg-white" : "bg-gray-500"}`}></div>
    <div className={`w-3 h-3 rounded-full ${activeSection === 3 ? "bg-white" : "bg-gray-500"}`}></div>
  </div>
</div>


      {/* Section 1 */} 
      <div ref={section1Ref} className="w-full h-screen relative overflow-hidden"> 
      <Design 
  section2Ref={section2Ref}
  smoothScrollTo={smoothScrollTo}
  setActiveSection={setActiveSection}
  sections={sections}
/>
 {/* Particles are included inside Design.js */} 
        {activeSection === 1 && ( 
          <div onClick={() => smoothScrollTo(sections[1].current.offsetTop, 1200)} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer"> 
            <span className="text-lg cursor-pointer">Explore</span> 
            <FaArrowDown className="mt-2 cursor-pointer animate-bounce" size={24} /> 
          </div> 
        )} 
      </div>

      {/* Section 2 */} 
      <div ref={section2Ref} className="w-full h-screen relative overflow-hidden"> 
        <Section2 /> {/* Particles included inside Section2.js */} 
      </div>

      {/* Section 3 */} 
      <div ref={section3Ref} className="w-full h-screen relative overflow-hidden"> 
        <Section3 /> {/* Particles included inside Section3.js */} 
      </div> 
    </div> 
  ); 
}

export default App;