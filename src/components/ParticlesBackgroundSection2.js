// ParticlesBackgroundSection2.js
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackgroundSection2 = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Initializing particles for Section 2...");
    await loadFull(engine);
    console.log("Particles initialized for Section 2!");
  }, []);

  return (
    <Particles
      className="absolute top-0 left-0 w-full h-full"
      id="tsparticles-section2-unique"  // Ensuring unique ID for Section 2
      init={particlesInit}
      style={{ zIndex: 1 }} // Ensure particles have a low z-index
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          color: { value: "#ffffff" },
          background: { color: { value: "#000000" } }, // Temporary background to check visibility
          move: { enable: true, speed: 2 },
          number: { value: 50 },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: 3 },
        },
      }}
    />
  );
};

export default ParticlesBackgroundSection2;
