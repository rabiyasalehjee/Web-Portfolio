import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";  
import Design from "./components/Design";  
import Section2 from "./components/Section2";  
import Section3 from "./components/Section3";  
import { FaArrowDown, FaBars, FaTimes } from "react-icons/fa";  
import './index.css';  
import CustomCursor from './components/CustomCursor'; // Import the custom cursor

const Navbar = ({ activeSection, handleClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center items-center h-14 bg-navbar rounded-full mt-2 mx-auto w-2/3 max-w-screen-lg text-white font-fira">
      <ul className="flex justify-around w-full">
        {["Home", "Skills", "Projects", "Resume"].map((section, index) => {
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
        })}
      </ul>
    </nav>
  );
};

const easeInOutQuad = (t, b, c, d) => { 
  t /= d / 2; 
  if (t < 1) return (c / 2) * t * t + b; 
  t--; 
  return (-c / 2) * (t * (t - 2) - 1) + b; 
};

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
      const [touchStart, setTouchStart] = useState(0);
      const [touchEnd, setTouchEnd] = useState(0);
      const debounceTimeoutRef = useRef(null);
      const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
      const [scrollPosition, setScrollPosition] = useState(0); // Save scroll position
    
      const section1Ref = useRef(null); 
      const section2Ref = useRef(null); 
      const section3Ref = useRef(null);
    
      const sections = useMemo(() => [section1Ref, section2Ref, section3Ref], []);
    
    const handleWheelScroll = useCallback((event) => { 
      if (isMenuOpen) {
        console.log('Scroll event blocked because the menu is open.'); // Debug
        return; // Prevent scrolling when the menu is open
      }
      event.preventDefault(); 
      if (isScrolling) return; 
      
      console.log(`Wheel scroll event. deltaY: ${event.deltaY}, activeSection: ${activeSection}`); // Debug

      const currentSectionIndex = activeSection - 1; 
      setIsScrolling(true);

      const scrollToSection = (index) => { 
        console.log(`Scrolling to section index ${index}`); // Debug
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
      console.log('Finished scrolling'); // Debug
    }, 1300); 
}, [activeSection, isScrolling, sections, isMenuOpen]);
const handleTouchStart = useCallback((event) => {
  if (isMenuOpen) {
    console.log('TouchStart event blocked because the menu is open.');
    return; // Prevent touch interaction if menu is open
  }
  setTouchStart(event.targetTouches[0].clientY);
}, [isMenuOpen]);

const handleTouchMove = useCallback((event) => {
  if (isMenuOpen) {
    console.log('TouchMove event blocked because the menu is open.');
    return; // Prevent touch interaction if menu is open
  }
  setTouchEnd(event.targetTouches[0].clientY);
}, [isMenuOpen]);

const handleTouchEnd = useCallback(() => {
  if (isMenuOpen) {
    console.log('TouchEnd event blocked because the menu is open.');
    return; // Prevent touch interaction if menu is open
  }

  const touchDistance = Math.abs(touchStart - touchEnd);
  const currentSectionIndex = activeSection - 1;

  console.log(`Touch end detected with distance ${touchDistance}`);

  // Only allow scrolling one section at a time
  if (touchDistance > 50) {  // Increase the threshold to reduce accidental scrolling
    if (touchStart - touchEnd > 50) { // Swipe up
      if (currentSectionIndex < sections.length - 1) {
        const targetPosition = sections[currentSectionIndex + 1].current.offsetTop;
        smoothScrollTo(targetPosition, 1200);
        setActiveSection(currentSectionIndex + 2);
        console.log(`Scrolling up to section ${currentSectionIndex + 2}`);
      }
    } else if (touchStart - touchEnd < -50) { // Swipe down
      if (currentSectionIndex > 0) {
        const targetPosition = sections[currentSectionIndex - 1].current.offsetTop;
        smoothScrollTo(targetPosition, 1200);
        setActiveSection(currentSectionIndex);
        console.log(`Scrolling down to section ${currentSectionIndex}`);
      }
    }
  }
}, [touchStart, touchEnd, activeSection, sections, isMenuOpen]);

// Ensure all touch states are reset after menu closes
const resetTouchStates = () => {
  setTouchStart(0);
  setTouchEnd(0);
  console.log('Touch states reset');
};
          
          const handleClick = (sectionNumber) => {
            clearTimeout(debounceTimeoutRef.current);
      
            debounceTimeoutRef.current = setTimeout(() => {
              const sectionRef = sections[sectionNumber - 1].current;
              const offsetTop = sectionRef.offsetTop;
              console.log(`Handle click - Scrolling to section ${sectionNumber}`); // Debug
              smoothScrollTo(offsetTop, 1000); // Scroll to the section
              setActiveSection(sectionNumber); // Set the active section
            }, 100); 
      
            if (isMenuOpen) {
              console.log('Closing menu after click'); // Debug
              toggleMenu();
            }
          };
          const enableScroll = () => {
            document.body.style.position = ''; // Re-enable scrolling
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition); 
            console.log('Scroll enabled, restored position:', scrollPosition); // Debug
            document.body.style.overflow = ''; // Allow scrolling
          };
      
          const disableScroll = () => {
            const currentScrollY = window.scrollY; // Get the current scroll position
            setScrollPosition(currentScrollY); // Save the current scroll position
            document.body.style.position = 'fixed'; // Lock page in place
            document.body.style.top = `-${currentScrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden'; // Disable scrolling
            console.log('Scroll disabled, saved position:', currentScrollY); // Debug
          };
          
          // Modify toggleMenu to reset touch states
const toggleMenu = (event) => {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  if (!isMenuOpen) {
    console.log('Opening menu');
    disableScroll(); // Disable scrolling when the menu opens
  } else {
    console.log('Closing menu');
    enableScroll(); // Enable scrolling when the menu closes
    resetTouchStates(); // Reset touch states to avoid accidental scroll jumps
  }

  setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  console.log('Menu state toggled, isMenuOpen:', !isMenuOpen);
};
            
            useEffect(() => { 
              console.log('Page load - Initial scroll restoration setup'); // Debug
              if ('scrollRestoration' in window.history) { 
                window.history.scrollRestoration = 'manual'; 
              } 
              window.scrollTo(0, 0); 
            }, []);
        
            useEffect(() => { 
              window.addEventListener("wheel", handleWheelScroll, { passive: false }); 
              window.addEventListener("touchstart", handleTouchStart, { passive: false });
              window.addEventListener("touchmove", handleTouchMove, { passive: false });
              window.addEventListener("touchend", handleTouchEnd, { passive: false });
        
              console.log('Scroll and touch listeners added'); // Debug
              
              return () => { 
                window.removeEventListener("wheel", handleWheelScroll); 
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchend", handleTouchEnd);
                console.log('Scroll and touch listeners removed'); // Debug
              }; 
            }, [handleWheelScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);
            return (   
              <div className="relative">   
                {/* Navigation Bar */}   
                <Navbar activeSection={activeSection} handleClick={handleClick} />   
                {/* Custom Cursor */}   
                <CustomCursor /> 
        
                {/* Burger Icon for Mobile */}   
                <div className="md:hidden fixed top-0 right-0 p-4 z-50" style={{ zIndex: 1000 }}>   
                  <button onClick={toggleMenu} className="flex items-center text-white">   
                    {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}   
                    <span className="text-sm ml-2">Menu</span>   
                  </button>   
                </div>
        
                {/* Mobile Menu with Curtain Effect */}
                <div className={`fixed top-0 left-0 w-full h-full text-white z-50 flex flex-col items-center justify-center transform transition-all duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`} 
                     style={{ backgroundColor: "#1f2940", clipPath: "polygon(0 0, 90% 0, 75% 100%, 0% 100%)" }}>
                  <ul className="space-y-8 text-lg font-fira">
                    <li 
                      style={{ transform: `translateY(0px)` }} 
                      onClick={() => {
                        console.log('Home clicked');
                        handleClick(1); // Scroll to section 1 (Design)
                        toggleMenu();    // Close mobile menu after selecting a section
                      }}
                      className="hover:text-gray-300"
                    >
                      Home
                    </li>
                    <li 
                      style={{ transform: `translateY(20px)` }} 
                      onClick={() => {
                        console.log('Skills clicked');
                        handleClick(2); // Scroll to section 2 (Section2)
                        toggleMenu();    // Close mobile menu after selecting a section
                      }}
                      className="hover:text-gray-300"
                    >
                      Skills
                    </li>
                    <li 
                      style={{ transform: `translateY(40px)` }} 
                      onClick={() => {
                        console.log('Projects clicked');
                        handleClick(3); // Scroll to section 3 (Section3)
                        toggleMenu();    // Close mobile menu after selecting a section
                      }}
                      className="hover:text-gray-300"
                    >
                      Projects
                    </li>
                    <li 
                      style={{ transform: `translateY(60px)` }} 
                      onClick={() => {
                        console.log('Resume clicked');
                        // Initiate resume download
                        const resumeLink = document.createElement('a');
                        resumeLink.href = '/path/to/your/resume.pdf'; // Replace with actual resume path
                        resumeLink.download = 'resume.pdf';
                        resumeLink.click();
                        toggleMenu();    // Close mobile menu after download
                      }}
                      className="hover:text-gray-300"
                    >
                      Resume
                    </li>
                  </ul>
                </div>
        
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
                  {activeSection === 1 && ( 
                    <div onClick={() => smoothScrollTo(sections[1].current.offsetTop, 1200)} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white cursor-pointer"> 
                      <span className="text-lg cursor-pointer">Explore</span> 
                      <FaArrowDown className="mt-2 cursor-pointer animate-bounce" size={24} /> 
                    </div> 
                  )} 
                </div>
        
                {/* Section 2 */} 
                <div ref={section2Ref} className="w-full h-screen relative overflow-hidden"> 
                  <Section2 /> 
                </div>
        
                {/* Section 3 */} 
                <div ref={section3Ref} className="w-full h-screen relative overflow-hidden"> 
                  <Section3 /> 
                </div> 
              </div> 
            ); 
        }
        
        export default App;
        
