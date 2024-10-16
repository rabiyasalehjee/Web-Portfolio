import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Check if the screen width is larger than 768px
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowCursor(false); // Hide cursor on mobile screens
      } else {
        setShowCursor(true); // Show cursor on larger screens
      }
    };

    // Run the function once to set the initial cursor visibility
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
      setDotPosition({ x: clientX, y: clientY });
    };

    if (showCursor) {
      window.addEventListener('mousemove', onMouseMove);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [showCursor]);

  if (!showCursor) return null; // Return null to hide the cursor on mobile

  return (
    <>
      <div
        className="custom-cursor"
        style={{ top: `${position.y}px`, left: `${position.x}px` }}
      />
      <div
        className="custom-cursor-dot"
        style={{ top: `${dotPosition.y}px`, left: `${dotPosition.x}px` }}
      />
    </>
  );
};

export default CustomCursor;
