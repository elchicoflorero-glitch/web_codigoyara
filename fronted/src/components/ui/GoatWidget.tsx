import { useState, useEffect, useRef, useCallback } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

const IDLE_MESSAGES = [
  "¿Tenés una idea? 💡",
  "¿En qué puedo ayudarte? 👋",
  "¡Hagámoslo realidad! ✨",
  "¿Listo para empezar? 🚀",
  "¡Tu proyecto nos espera! 🎯",
];

// Bubble visible duration and total cycle in ms
const BUBBLE_SHOW  = 2200; // how long bubble stays visible
const BUBBLE_CYCLE = 7000; // total cycle between appearances

export default function GoatWidget() {
  const activeSection = useActiveSection();
  const [hovered,   setHovered]   = useState(false);
  const [msgIndex,  setMsgIndex]  = useState(0);
  const [bubbleOn,  setBubbleOn]  = useState(false); // idle bubble visible
  const [mouthOpen, setMouthOpen] = useState(false); // speaking state

  const isHappy = hovered || activeSection === "contacto";

  // ── Idle bubble + mouth sync ──────────────────────────────
  const speakTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearSpeakTimers = () => {
    speakTimers.current.forEach(clearTimeout);
    speakTimers.current = [];
  };

  // Simulate speaking: rapid mouth open/close for ~BUBBLE_SHOW ms
  const startSpeaking = useCallback(() => {
    clearSpeakTimers();
    setMouthOpen(false);

    // ~5 syllables over BUBBLE_SHOW ms
    const syllableMs = BUBBLE_SHOW / 5;
    for (let i = 0; i < 5; i++) {
      // open
      speakTimers.current.push(setTimeout(() => setMouthOpen(true),  i * syllableMs));
      // close after half syllable
      speakTimers.current.push(setTimeout(() => setMouthOpen(false), i * syllableMs + syllableMs * 0.45));
    }
    // ensure closed at end
    speakTimers.current.push(setTimeout(() => setMouthOpen(false), BUBBLE_SHOW));
  }, []);

  useEffect(() => {
    if (isHappy) {
      setBubbleOn(false);
      clearSpeakTimers();
      setMouthOpen(false);
      return;
    }

    // Start cycle
    let cycleTimer: ReturnType<typeof setTimeout>;
    let hideTimer:  ReturnType<typeof setTimeout>;

    const runCycle = () => {
      setBubbleOn(true);
      startSpeaking();

      hideTimer = setTimeout(() => {
        setBubbleOn(false);
        setMsgIndex(i => (i + 1) % IDLE_MESSAGES.length);
      }, BUBBLE_SHOW);

      cycleTimer = setTimeout(runCycle, BUBBLE_CYCLE);
    };

    // Slight initial delay so it doesn't fire immediately on mount
    const initTimer = setTimeout(runCycle, 1500);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(cycleTimer);
      clearTimeout(hideTimer);
      clearSpeakTimers();
      setBubbleOn(false);
      setMouthOpen(false);
    };
  }, [isHappy, startSpeaking]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <a
      className={`quote-goat ${isHappy ? "quote-goat--happy" : ""}`}
      href="#contacto"
      aria-label="Ir a cotizar"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Happy bubble */}
      <span className="goat-bubble" aria-hidden={!isHappy}>
        <span className="goat-bubble-text">¡Hablemos! 🚀</span>
        <span className="goat-bubble-tail" />
      </span>

      {/* Idle bubble — JS controlled */}
      <span
        className="goat-bubble goat-bubble-idle"
        style={{
          opacity:   (!isHappy && bubbleOn) ? 1 : 0,
          transform: (!isHappy && bubbleOn) ? "translateY(0) scale(1)" : "translateY(8px) scale(.9)",
        }}
        aria-hidden={isHappy || !bubbleOn}
      >
        <span className="goat-bubble-text">{IDLE_MESSAGES[msgIndex]}</span>
        <span className="goat-bubble-tail" />
      </span>

      <span className="quote-label">Cotiza aquí</span>

      <svg className="goat-icon" viewBox="0 0 110 138" aria-hidden="true">
        <g className="goat-tail">
          <path d="M88 83c13-5 17-14 13-20 8 2 11 12 5 20-4 6-10 9-18 10Z"
            fill="#f3e3ca" stroke="#604431" strokeLinejoin="round" strokeWidth="3" />
        </g>

        <g className="goat-body">
          <path d="M30 78c7-13 43-16 58 0 8 9 6 29-2 37-10 10-45 9-55-1-9-9-9-25-1-36Z"
            fill="#f3e3ca" stroke="#604431" strokeWidth="3" />
          <path d="M39 108v21M52 110v19M73 110v19M85 106v23" fill="none" stroke="#604431" strokeLinecap="round" strokeWidth="8" />
          <path d="M34 130h10M47 130h10M68 130h10M80 130h10" fill="none" stroke="#2f241e" strokeLinecap="round" strokeWidth="5" />
          <path d="M34 82c9 6 14 6 24 0" fill="none" stroke="#d1ad86" strokeLinecap="round" strokeWidth="4" />
        </g>

        <g className="goat-wave-leg">
          <path d="M30 83c-8 9-10 22-7 31" fill="none" stroke="#604431" strokeLinecap="round" strokeWidth="9" />
          <path d="m20 115 7 1" stroke="#2f241e" strokeLinecap="round" strokeWidth="5" />
        </g>

        <g className="goat-head">
          <path d="M34 26C23 14 27 5 34 3c-3 7 2 12 8 17M76 26C87 14 83 5 76 3c3 7-2 12-8 17"
            fill="#d7b476" stroke="#604431" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />

          <g className="goat-ear goat-ear-left">
            <path d="M31 31C16 22 7 27 7 34c6 8 16 8 27 4Z" fill="#d8b995" stroke="#604431" strokeLinejoin="round" strokeWidth="3" />
            <path d="M26 33c-5-2-9-2-12 0" fill="none" stroke="#b87970" strokeLinecap="round" strokeWidth="2.5" />
          </g>
          <g className="goat-ear goat-ear-right">
            <path d="M79 31c15-9 24-4 24 3-6 8-16 8-27 4Z" fill="#d8b995" stroke="#604431" strokeLinejoin="round" strokeWidth="3" />
            <path d="M84 33c5-2 9-2 12 0" fill="none" stroke="#b87970" strokeLinecap="round" strokeWidth="2.5" />
          </g>

          <path d="M27 40c3-19 15-27 28-27s25 8 28 27c3 17-3 40-28 40S24 57 27 40Z"
            fill="#f3e3ca" stroke="#604431" strokeWidth="3" />
          <path d="M45 76c2 12 8 17 10 18 2-1 8-6 10-18Z" fill="#e7ceb0" stroke="#604431" strokeLinejoin="round" strokeWidth="3" />
          <ellipse cx="55" cy="61" rx="17" ry="13" fill="#dfbe99" />

          <g className="goat-brows">
            <path d="m36 41 9 2M74 41l-9 2" stroke="#604431" strokeLinecap="round" strokeWidth="3" />
          </g>
          <ellipse cx="41" cy="49" rx="3" ry="4" fill="#2f241e" />
          <ellipse className="goat-eye-right" cx="69" cy="49" rx="3" ry="4" fill="#2f241e" />
          <path d="M50 59c2-3 8-3 10 0-1 4-9 4-10 0Z" fill="#604431" />

          {/* Mouth — JS controlled via mouthOpen + isHappy */}
          {/* Serious line: visible when not speaking and not happy */}
          <path
            className="goat-mouth-serious"
            d="M48 69h14"
            fill="none" stroke="#604431" strokeLinecap="round" strokeWidth="3"
            style={{
              opacity: (!isHappy && !mouthOpen) ? 1 : 0,
              transition: "opacity 80ms ease",
            }}
          />
          {/* Open mouth: visible when speaking (idle) */}
          <ellipse
            className="goat-mouth-call"
            cx="55" cy="69" rx="4" ry="5" fill="#604431"
            style={{
              opacity: (!isHappy && mouthOpen) ? 1 : 0,
              transform: (!isHappy && mouthOpen) ? "scaleY(1)" : "scaleY(0.3)",
              transition: "opacity 60ms ease, transform 60ms ease",
            }}
          />
          {/* Smile: visible when happy */}
          <path
            className="goat-mouth-smile"
            d="M46 66c3 9 15 9 18 0"
            fill="#fffaf3" stroke="#604431" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
            style={{
              opacity: isHappy ? 1 : 0,
              transform: isHappy ? "translateY(0) scale(1)" : "translateY(3px) scale(.75)",
              transition: "opacity 180ms ease, transform 280ms cubic-bezier(.2,.8,.2,1)",
            }}
          />

          <circle className="goat-blush" cx="37" cy="62" r="4" fill="#dc8e86" />
          <circle className="goat-blush" cx="73" cy="62" r="4" fill="#dc8e86" />
        </g>
      </svg>
    </a>
  );
}
