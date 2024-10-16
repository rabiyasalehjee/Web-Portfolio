import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
      setDotPosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

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
