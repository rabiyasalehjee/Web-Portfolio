// SharedParticles.js
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const SharedParticles = ({ id }) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(`Initializing particles for ${id}...`);
    await loadFull(engine);
    console.log(`Particles initialized for ${id}!`);
  }, [id]);

  return (
    <Particles
      className="absolute top-0 left-0 w-full h-full"
      id={id} // Use unique ID for each section
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
              distance: 400,
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 120,
            enable: true,
            opacity: 0.6,
            width: 1,
          },
          move: {
            enable: true,
            speed: 3,
            outModes: { default: "bounce" },
          },
          number: {
            density: { enable: true, area: 1200 },
            value: 80,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default SharedParticles;
