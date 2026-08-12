import { useEffect, useMemo, useState } from "react";
import {
  FaArrowRight,
  FaArrowUp,
  FaBolt,
  FaCubes,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLayerGroup,
  FaLinkedin,
  FaPhoneAlt,
  FaRobot,
} from "react-icons/fa";
import "./App.css";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const TERMINAL_LINES = [
  { prompt: "whoami", output: "Rabiya Salehjee, Software Engineer" },
  {
    prompt: "cat focus.txt",
    output: "AI-integrated products, real-time systems, 3D web interfaces.",
  },
  { prompt: "cat status.txt", output: "1+ year in production. Open to new roles." },
];

function useTypedTerminal(lines, { charDelay = 26, pauseDelay = 480 } = {}) {
  const segments = useMemo(() => {
    const list = [];
    lines.forEach((line, lineIndex) => {
      list.push({ lineIndex, field: "prompt", text: line.prompt });
      list.push({ lineIndex, field: "output", text: line.output });
    });
    return list;
  }, [lines]);

  const [revealed, setRevealed] = useState(() =>
    lines.map(() => ({ prompt: "", output: "" })),
  );
  const [cursor, setCursor] = useState({ lineIndex: 0, field: "prompt" });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      setRevealed(lines.map((line) => ({ prompt: line.prompt, output: line.output })));
      setIsDone(true);
      return undefined;
    }

    let cancelled = false;
    let timeoutId;
    let segmentIndex = 0;
    let charIndex = 0;

    const tick = () => {
      if (cancelled) return;

      if (segmentIndex >= segments.length) {
        setIsDone(true);
        return;
      }

      const segment = segments[segmentIndex];
      charIndex += 1;
      const value = segment.text.slice(0, charIndex);

      setRevealed((current) => {
        const next = current.map((row) => ({ ...row }));
        next[segment.lineIndex][segment.field] = value;
        return next;
      });
      setCursor({ lineIndex: segment.lineIndex, field: segment.field });

      if (charIndex < segment.text.length) {
        timeoutId = window.setTimeout(tick, charDelay);
      } else {
        segmentIndex += 1;
        charIndex = 0;
        timeoutId = window.setTimeout(tick, pauseDelay);
      }
    };

    timeoutId = window.setTimeout(tick, charDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [segments, charDelay, pauseDelay, lines]);

  return { revealed, cursor, isDone };
}

const capabilityTiles = [
  {
    icon: FaRobot,
    title: "AI-Integrated Interfaces",
    description:
      "LLM and speech-enabled experiences for desktop and web, from RAG pipelines to live voice interaction.",
  },
  {
    icon: FaBolt,
    title: "Real-Time Systems",
    description:
      "Multi-device orchestration and socket-based communication built to stay in sync under load.",
  },
  {
    icon: FaCubes,
    title: "3D & Interactive Web",
    description:
      "WebGL scenes, custom shaders, and particle-driven interfaces with Three.js and React Three Fiber.",
  },
  {
    icon: FaLayerGroup,
    title: "Cross-Platform Delivery",
    description:
      "Production software spanning web, Electron desktop, and mobile, shipped end to end.",
  },
];

const skillGroups = [
  { key: "frontend", items: ["React", "Next.js", "Svelte", "Vite", "Tailwind CSS", "HTML5"] },
  { key: "backend", items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "WebSocket", "STOMP"] },
  { key: "aiAndMl", items: ["OpenAI", "Gemini", "Anthropic", "RAG", "MediaPipe", "Whisper", "Sherpa-ONNX"] },
  { key: "graphics3d", items: ["Three.js", "React Three Fiber", "WebGL", "Particle Systems", "GSAP"] },
  { key: "desktop", items: ["Electron", "IPC", "NSIS", "DMG Packaging", "Multi-window Systems"] },
  { key: "cloud", items: ["AWS", "Azure", "Aliyun OSS", "Docker", "Vercel", "Git"] },
];

const experience = [
  {
    hash: "a1e93f2",
    role: "Cross-Platform Web & Software Engineer",
    company: "Sencity Corp.",
    period: "May 2025 to Present",
    points: [
      "Architected real-time dashboard systems orchestrating 6+ simultaneous display outputs for large-scale installations.",
      "Built immersive 3D experiences with Three.js and React Three Fiber, and shipped LLM and speech-enabled desktop software with Electron, Whisper, and Sherpa-ONNX.",
    ],
  },
  {
    hash: "7c02d4b",
    role: "Frontend Developer Intern",
    company: "Sencity Corp.",
    period: "Nov 2024 to Mar 2025",
    points: [
      "Contributed to web and mobile front-end development, UniApp debugging, and production deployments.",
      "Built a standalone AI photo booth experience end to end, from the JavaScript front end to a PHP-based API integration.",
    ],
  },
];

const projects = [
  {
    title: "Real-Time Multi-Screen Event Platform",
    lang: "TypeScript",
    summary:
      "A synchronized enterprise display platform with distributed state, playlist scheduling, and device orchestration across Linux, Windows, and macOS.",
    tags: ["Electron", "Socket.IO", "STOMP"],
  },
  {
    title: "Interactive 3D Installation Experiences",
    lang: "JavaScript",
    summary:
      "Browser-based 3D experiences combining custom particle systems, gesture recognition, and WebGL rendering for interactive installations.",
    tags: ["Three.js", "React Three Fiber", "MediaPipe"],
  },
  {
    title: "HALO Data Cleaning System",
    lang: "Python",
    summary:
      "A human-and-LLM-in-the-loop data cleaning workflow that combines automated recommendations with user review for higher-quality datasets.",
    tags: ["Python", "LLMs", "Data Systems"],
  },
  {
    title: "Fluencio",
    lang: "Java",
    summary:
      "A public speaking improvement product with app and web interfaces for pacing analysis, filler-word feedback, and structured practice.",
    tags: ["Java", "Mobile", "Speech Analysis"],
  },
];

const navItems = [
  ["About", "#about"],
  ["Work", "#projects"],
  ["Experience", "#experience"],
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
  const { revealed: terminalLines, cursor: terminalCursor, isDone: terminalDone } =
    useTypedTerminal(TERMINAL_LINES);

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
      ".content-section, .prose-block, .commit-row, .repo-card, .capability-row",
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

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="portfolio-shell">
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
          rabiya<span className="brand-at">@</span>dev
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
          resume.pdf
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
            resume.pdf
          </a>
        </div>
      </div>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">{"// software engineer"}</p>
            <h1>Rabiya Salehjee</h1>
            <p className="hero-titleline">
              I design and build considered software, from AI-integrated
              products to real-time systems and 3D web interfaces.
            </p>
            <p className="hero-text">
              My work spans web, desktop, and interactive environments,
              including LLM integration, WebGL-based interfaces, real-time
              communication, and shipping software that stays reliable in
              production.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                Start a conversation
                <FaArrowRight aria-hidden="true" />
              </a>
              <a className="text-link" href="#projects">
                See selected work
                <FaArrowRight aria-hidden="true" />
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

          <div className="terminal-window" aria-hidden="true">
            <div className="terminal-bar">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-title">zsh · rabiya@portfolio</span>
            </div>
            <div className="terminal-body">
              {terminalLines.map((line, lineIndex) => (
                <div className="terminal-line" key={lineIndex}>
                  <p className="terminal-prompt">
                    <span className="terminal-symbol">➜</span>
                    <span className="terminal-path">~</span>
                    <span className="terminal-command">
                      {line.prompt}
                      {!terminalDone &&
                      terminalCursor.lineIndex === lineIndex &&
                      terminalCursor.field === "prompt" ? (
                        <span className="cursor-blink" />
                      ) : null}
                    </span>
                  </p>
                  {line.output ? (
                    <p className="terminal-output">
                      {line.output}
                      {!terminalDone &&
                      terminalCursor.lineIndex === lineIndex &&
                      terminalCursor.field === "output" ? (
                        <span className="cursor-blink" />
                      ) : null}
                    </p>
                  ) : null}
                </div>
              ))}
              {terminalDone ? (
                <p className="terminal-prompt terminal-prompt--idle">
                  <span className="terminal-symbol">➜</span>
                  <span className="terminal-path">~</span>
                  <span className="cursor-blink" />
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">{"// about"}</p>
            <h2>I care about software that feels intentional, not just functional</h2>
          </div>
          <div className="about-layout">
            <div className="prose-block">
              <p>
                I’m a software engineer with a Master’s in Computer Science and
                hands-on experience delivering production applications across
                the full stack. Recent work spans enterprise dashboards,
                interactive 3D web interfaces, and desktop applications with
                LLM and speech-recognition capabilities.
              </p>
              <p>
                I like owning a problem end to end, shaping the architecture,
                writing the interface, and making sure the whole thing holds
                up once real people are using it.
              </p>
            </div>
            <div className="capability-list">
              {capabilityTiles.map((tile, index) => (
                <article key={tile.title} className="capability-row">
                  <span className="capability-index">{pad(index + 1)}</span>
                  <tile.icon aria-hidden="true" />
                  <div>
                    <h3>{tile.title}</h3>
                    <p>{tile.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">{"// selected-work"}</p>
            <h2>A few things I’ve built and shipped</h2>
          </div>
          <div className="repo-grid">
            {projects.map((project) => (
              <article key={project.title} className="repo-card">
                <p className="repo-path">~/projects/{slugify(project.title)}</p>
                <h3>{project.title}</h3>
                <p className="repo-summary">{project.summary}</p>
                <div className="repo-meta">
                  <span className="repo-lang">
                    <span className="repo-dot" aria-hidden="true" />
                    {project.lang}
                  </span>
                  <ul
                    className="tag-list"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">{"// experience"}</p>
            <h2>Where I’ve put this to work</h2>
          </div>
          <div className="commit-log">
            {experience.map((item) => {
              const isCurrent = item.period.endsWith("Present");

              return (
                <article
                  key={`${item.role}-${item.period}`}
                  className={`commit-row ${isCurrent ? "commit-row--current" : ""}`}
                >
                  <div className="commit-meta">
                    <span className="commit-hash">{item.hash}</span>
                    <span className="commit-date">{item.period}</span>
                    {isCurrent ? (
                      <span className="commit-current">current</span>
                    ) : null}
                  </div>
                  <h3>
                    {item.role}
                    <span className="commit-company"> @ {item.company}</span>
                  </h3>
                  <ul className="diff-list">
                    {item.points.map((point) => (
                      <li key={point}>
                        <span className="diff-plus" aria-hidden="true">
                          +
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">{"// skills"}</p>
            <h2>Tools I reach for</h2>
          </div>
          <div className="code-block">
            <div className="code-block-head">
              <span className="terminal-dot" />
              <span className="code-filename">stack.js</span>
            </div>
            <pre className="code-block-body">
              <code>
                <span className="code-line">
                  <span className="code-ln">1</span>
                  <span className="code-kw">const</span> stack = {"{"}
                </span>
                {skillGroups.map((group, index) => (
                  <span className="code-line" key={group.key}>
                    <span className="code-ln">{index + 2}</span>
                    <span className="code-indent"> </span>
                    <span className="code-key">{group.key}</span>:{" "}[
                    {group.items.map((item, itemIndex) => (
                      <span key={item}>
                        <span className="code-str">&quot;{item}&quot;</span>
                        {itemIndex < group.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    ],
                  </span>
                ))}
                <span className="code-line">
                  <span className="code-ln">{skillGroups.length + 2}</span>
                  {"}"};
                </span>
              </code>
            </pre>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="section-heading">
            <p className="eyebrow">{"// contact"}</p>
            <h2>Available for software engineering opportunities</h2>
          </div>

          <div className="contact-layout">
            <div className="contact-copy">
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
                <span className="field-prompt" aria-hidden="true">$</span>
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
                <span className="field-prompt" aria-hidden="true">$</span>
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

              <label htmlFor="company">
                <span className="field-prompt" aria-hidden="true">$</span>
                Company or project
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formState.company}
                onChange={handleChange}
                disabled={isSending}
              />

              <label htmlFor="message">
                <span className="field-prompt" aria-hidden="true">$</span>
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
                <span className="field-prompt" aria-hidden="true">$</span>
                {isSending ? "sending message..." : "send message"}
              </button>

              {formMessage ? (
                <p className="form-status" role="status">
                  <span className="field-prompt" aria-hidden="true">&gt;</span>
                  {formMessage}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{"// © "}{new Date().getFullYear()}{" Rabiya Salehjee, built with React"}</p>
        <div className="footer-links">
          <a href="mailto:rabiya.salehjee@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/rabiyasalehjee99/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/rabiyasalehjee" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>

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
