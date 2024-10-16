import React, { useState, useEffect } from "react";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 100); // Delay to ensure smoothness
  }, []);

  const translateValue = Math.min(scrollY / 5, 100);
  const opacityValue = Math.max(1 - scrollY / 300, 0);

  return (
    <div className="w-full h-screen bg-banner-bg bg-cover bg-center flex items-center justify-center"
         style={{ margin: 0, padding: 0 }}> {/* Remove margin/padding */}
      <div
        className="text-center flex flex-col gap-6"
        style={{
          transform: `translateY(${isPageLoaded ? translateValue : 20}px)`,
          opacity: isPageLoaded ? opacityValue : 0,
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        <h1 className="text-7xl font-bold text-white leading-tight">
          Hi, I am Rabiya Salehjee <br />
        </h1>
        <p className="text-lg text-gray-200 font-light max-w-lg mx-auto">
          A tech enthusiast with a passion for turning creative ideas into reality. Whether it's building innovative projects or solving unique challenges, I'm always eager to push boundaries and explore new possibilities.
        </p>
      </div>
    </div>
  );
};

export default Banner;
