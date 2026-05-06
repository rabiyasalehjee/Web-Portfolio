import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaArrowUp,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaRobot,
} from "react-icons/fa";
import SharedParticles from "./components/SharedParticles";
import "./App.css";

const highlights = [
  "Production full-stack application development",
  "Interactive 3D and real-time web interfaces",
  "LLM-integrated desktop and web applications",
  "Cross-platform engineering for web, desktop, and mobile",
];

const capabilities = [
  "AI Interfaces",
  "3D Web",
  "Electron Apps",
  "Real-Time Systems",
  "Full-Stack Engineering",
  "Product Development",
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "Svelte", "Vite", "Tailwind CSS", "HTML5"],
  },
  {
    title: "Backend and APIs",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "WebSocket",
      "STOMP",
    ],
  },
  {
    title: "AI and ML",
    items: [
      "OpenAI",
      "Gemini",
      "Anthropic",
      "RAG",
      "MediaPipe",
      "Whisper",
      "Sherpa-ONNX",
    ],
  },
  {
    title: "3D and Graphics",
    items: [
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Particle Systems",
      "GSAP",
    ],
  },
  {
    title: "Desktop and Systems",
    items: ["Electron", "IPC", "NSIS", "DMG Packaging", "Multi-window Systems"],
  },
  {
    title: "Cloud and Tooling",
    items: ["AWS", "Azure", "Aliyun OSS", "Docker", "Vercel", "Git"],
  },
];

const experience = [
  {
    role: "Cross-Platform Web and Software Engineer",
    company: "Sencity Corp.",
    period: "May 2025 - Present",
    points: [
      "Architected and shipped enterprise dashboard systems that orchestrate 6+ simultaneous display outputs in real time for large-scale installations.",
      "Built immersive 3D web experiences with Three.js and React Three Fiber, including particle-heavy scenes, custom shaders, HDR environments, and live interaction layers.",
      "Developed LLM and speech-enabled desktop software using Electron, Whisper, Sherpa-ONNX, STOMP, and automated multi-window control flows.",
      "Delivered production React, Next.js, and Tailwind platforms spanning data portals, model showrooms, and AI-powered interfaces connected to modern LLM APIs.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Sencity Corp.",
    period: "Nov 2024 - Mar 2025",
    points: [
      "Contributed to front-end development and UniApp debugging across web and mobile products.",
      "Handled deployments, SSL provisioning, and backend log monitoring to support stable production releases.",
      "Built a standalone AI photo booth experience with a JavaScript front end and PHP-based API integrations.",
    ],
  },
];

const projects = [
  {
    title: "Real-Time Multi-Screen Event Platform",
    summary:
      "A synchronized enterprise display platform with distributed state, playlist scheduling, and device orchestration across Linux, Windows, and macOS.",
    tags: ["Electron", "Socket.IO", "STOMP", "TypeScript"],
  },
  {
    title: "Interactive 3D Installation Experiences",
    summary:
      "Browser-based 3D experiences combining custom particle systems, gesture recognition, and WebGL rendering for interactive installations.",
    tags: ["Three.js", "React Three Fiber", "WebGL", "MediaPipe"],
  },
  {
    title: "HALO Data Cleaning System",
    summary:
      "A human-and-LLM-in-the-loop data cleaning workflow that combines automated recommendations with user review for higher-quality datasets.",
    tags: ["Python", "LLMs", "Data Systems"],
  },
  {
    title: "Fluencio",
    summary:
      "A public speaking improvement product with app and web interfaces for pacing analysis, filler-word feedback, and structured practice.",
    tags: ["Java", "Mobile", "Speech Analysis"],
  },
];

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Harbin Institute of Technology",
    meta: "GPA: 90.6 / 100.0",
    period: "Sep 2022 - Jan 2025",
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "Jinnah University for Women",
    meta: "CGPA: 3.84 / 4.00",
    period: "Jan 2018 - Dec 2021",
  },
];

const awards = [
  "Chinese Government Scholarship for a fully funded Master's degree",
  "Merit-Based Full Semester Scholarship",
  "Best Undergraduate Project Award",
  "Women in Computing, Java Q&A Winner",
];

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const EMAILJS_SERVICE_ID = "service_zrncyp3";
const EMAILJS_TEMPLATE_ID = "template_26uv1jr";
const EMAILJS_PUBLIC_KEY = "rugCUUjgyzoZNjKPq";
const SUCCESS_MESSAGE = "Message sent successfully. Thank you for reaching out.";

function App() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormMessage("");

    const name = formState.name.trim();
    const email = formState.email.trim();
    const company = formState.company.trim();
    const message = formState.message.trim();

    if (!isFormReady) {
      setFormMessage("Please add your name, a valid email, and a message.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              name,
              email,
              company,
              message,
              from_name: name,
              reply_to: email,
            },
          }),
        },
      );

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`EmailJS request failed (${response.status}): ${body}`);
      }

      resetForm();
      setFormMessage(SUCCESS_MESSAGE);
    } catch (err) {
      setFormMessage(
        err?.message || "Unable to send right now. Please try again shortly.",
      );
    } finally {
      setIsSending(false);
    }
  };

  const clearHash = () => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  };

  useEffect(() => {
    const sectionIds = navItems.map(([, href]) => href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.08, 0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.7);

      if (window.scrollY < 12) {
        clearHash();
        setActiveSection("");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (formMessage !== SUCCESS_MESSAGE) return undefined;

    const timeoutId = window.setTimeout(() => {
      setFormMessage("");
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [formMessage]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(
      ".content-section, .content-card, .timeline-item, .project-card, .skill-card, .stack-card",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    clearHash();
    setActiveSection("");
    setIsMenuOpen(false);
    document.activeElement?.blur?.();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  const isFormReady =
    formState.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim()) &&
    formState.message.trim().length > 0;

  const handleNavClick = (event, href) => {
    event.preventDefault();

    const sectionId = href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) return;

    clearHash();
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="portfolio-shell">
      <div className="portfolio-particles" aria-hidden="true">
        <SharedParticles id="portfolio-particles" />
      </div>

      <header className="site-header">
        <a
          className="brand-mark"
          href="#top"
          aria-label="Rabiya Salehjee home"
          onClick={(event) => {
            event.preventDefault();
            scrollToTop();
          }}
        >
          RS
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={
                activeSection === href.replace("#", "")
                  ? "is-active"
                  : undefined
              }
              aria-current={
                activeSection === href.replace("#", "") ? "page" : undefined
              }
              onClick={(event) => handleNavClick(event, href)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="resume-link"
          href="/RabiyaSalehjeeCV.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <FaDownload aria-hidden="true" />
          Resume
        </a>

        <button
          type="button"
          className={`hamburger-button ${isMenuOpen ? "is-open" : ""}`}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu-inner">
          {navItems.map(([label, href], index) => (
            <a
              key={label}
              href={href}
              className={activeSection === href.replace("#", "") ? "is-active" : undefined}
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={(event) => handleNavClick(event, href)}
            >
              {label}
            </a>
          ))}
          <div className="mobile-menu-divider" />
          <a
            className="mobile-resume-link"
            href="/RabiyaSalehjeeCV.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaDownload aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Full-Stack Software Engineer</p>
            <h1>Rabiya Salehjee</h1>
            <p className="hero-titleline">
              Full-stack software engineer building AI-integrated applications, 3D web interfaces, and real-time systems.
            </p>
            <div className="capability-strip" aria-label="Core capabilities">
              <div className="capability-track">
                {[...capabilities, ...capabilities].map((item, index) => (
                  <span key={`${item}-${index}`}>{item}</span>
                ))}
              </div>
            </div>
            <p className="hero-text">
              I build production-ready software across web, desktop, and
              interactive environments, with experience in LLM integration,
              WebGL-based interfaces, real-time communication, and
              cross-platform deployment.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                Start a conversation
                <FaArrowRight aria-hidden="true" />
              </a>
              <a className="secondary-button" href="#projects">
                Explore selected work
              </a>
            </div>

            <ul className="contact-inline" aria-label="Contact details">
              <li>
                <FaEnvelope aria-hidden="true" />
                <a href="mailto:rabiya.salehjee@gmail.com">
                  rabiya.salehjee@gmail.com
                </a>
              </li>
              <li>
                <FaPhoneAlt aria-hidden="true" />
                <a href="tel:+8618345350856">+86 183 4535 0856</a>
              </li>
            </ul>
          </div>

          <aside className="hero-panel" aria-label="Professional overview">
            <div className="hero-panel-card">
              <span className="panel-label">Current focus</span>
              <h2>
                AI-integrated software, real-time systems, and production web interfaces
              </h2>
              <p>
                My work focuses on reliable application architecture,
                responsive interfaces, and practical integrations that move
                products from concept to production.
              </p>
            </div>

            <div className="hero-stats">
              <article>
                <strong>1+ year</strong>
                <span>industry experience</span>
              </article>
              <article>
                <strong>Interactive systems</strong>
                <span>AI, WebGL, and real-time interfaces</span>
              </article>
              <article>
                <strong>Cross-platform</strong>
                <span>web, desktop, mobile</span>
              </article>
            </div>
          </aside>
        </section>

        <section id="about" className="content-section two-column-section">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Engineering reliable software with clear product purpose</h2>
          </div>
          <div className="content-card prose-card">
            <p>
              I’m a software engineer with a Master’s in Computer Science and
              hands-on experience delivering production applications across the
              full stack. My recent work includes enterprise dashboards,
              interactive 3D web interfaces, and desktop applications with LLM
              and speech-recognition capabilities.
            </p>
            <p>
              I work well on projects that require ownership across architecture,
              implementation, and user-facing quality: defining data and event
              flows, building maintainable interfaces, and preparing systems for
              stable production use.
            </p>
          </div>
          <div className="content-card highlights-card">
            <div className="mini-heading">
              <FaRobot aria-hidden="true" />
              <span>Core strengths</span>
            </div>
            <ul className="highlight-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Recent roles and production work</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article
                key={`${item.role}-${item.period}`}
                className="timeline-item"
              >
                <div className="timeline-meta">
                  <p>{item.period}</p>
                </div>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Selected Work</p>
            <h2>Selected engineering work and applied product systems</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul
                  className="tag-list"
                  aria-label={`${project.title} technologies`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Technical capabilities across application layers</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section info-grid-section">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Education</p>
              <h2>Academic foundation</h2>
            </div>
            <div className="stack-list">
              {education.map((item) => (
                <article key={item.degree} className="stack-card">
                  <div className="stack-row">
                    <h3>{item.degree}</h3>
                    <span>{item.period}</span>
                  </div>
                  <p>{item.school}</p>
                  <small>{item.meta}</small>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="section-heading">
              <p className="eyebrow">Recognition</p>
              <h2>Awards and languages</h2>
            </div>
            <div className="stack-list">
              <article className="stack-card">
                <h3>Awards and scholarships</h3>
                <ul className="simple-list">
                  {awards.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="stack-card">
                <h3>Languages</h3>
                <ul className="simple-list">
                  <li>English: Fluent</li>
                  <li>Urdu / Hindi: Native</li>
                  <li>Chinese (Mandarin): Basic</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Available for software engineering opportunities</h2>
          </div>

          <div className="contact-layout">
            <div className="content-card contact-copy">
              <p>
                I’m open to software engineering roles and projects involving
                full-stack development, AI integration, interactive interfaces,
                and cross-platform application delivery.
              </p>
              <div className="contact-links">
                <a href="mailto:rabiya.salehjee@gmail.com">
                  <FaEnvelope aria-hidden="true" />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/rabiyasalehjee99/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rabiyasalehjee"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                disabled={isSending}
                required
              />

              <label htmlFor="email">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                disabled={isSending}
                required
              />

              <label htmlFor="company">Company or project</label>
              <input
                id="company"
                name="company"
                type="text"
                value={formState.company}
                onChange={handleChange}
                disabled={isSending}
              />

              <label htmlFor="message">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell me a little about what you’re building."
                disabled={isSending}
                required
              />

              <button
                type="submit"
                className="primary-button form-button"
                disabled={isSending || !isFormReady}
              >
                {isSending ? "Sending..." : "Send message"}
              </button>

              {formMessage ? (
                <p className="form-status" role="status">
                  {formMessage}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <div className="scroll-controls" aria-label="Page scroll control">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          disabled={!showScrollTop}
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default App;
