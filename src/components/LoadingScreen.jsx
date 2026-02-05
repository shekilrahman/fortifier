import { useProgress } from "@react-three/drei";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./LoadingScreen.module.css";
import fortifierLogo from "../assets/FORTIFIER_FULL.svg";

export default function LoadingScreen({ onStarted = () => { }, onFinished = () => { } }) {
  const { progress } = useProgress();
  // Check session storage immediately
  const hasVisited = typeof window !== 'undefined' ? sessionStorage.getItem('fortifier_intro_shown') : false;

  const [complete, setComplete] = useState(!!hasVisited);
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * 6));
  const [effectIndex, setEffectIndex] = useState(() => Math.floor(Math.random() * 5));
  const textRef = useRef(null);

  // If already visited, trigger finished immediately
  useLayoutEffect(() => {
    if (hasVisited) {
      onFinished();
    }
  }, []);

  // Australia security facts - positioned so Fortifier is the solution
  const facts = [
    { text: "Homes without CCTV are ", highlight: "300% more likely", rest: " to be targeted by burglars." },
    { text: "In Australia, a break-in happens every ", highlight: "2 minutes", rest: ". Is your home protected?" },
    { text: "", highlight: "1 in 5", rest: " burglarized homes are targeted again. Don't be next." },
    { text: "Visible security cameras deter ", highlight: "67%", rest: " of potential intruders." },
    { text: "Properties with CCTV recover ", highlight: "stolen goods 60%", rest: " more often." },
    { text: "", highlight: "93%", rest: " of burglars avoid homes with visible security systems." }
  ];

  // Multiple text animation effects - letter/word based
  const effects = [
    // 1. Letters cascade down
    (container) => {
      const chars = container.querySelectorAll(`.${styles.char}`);
      gsap.fromTo(chars,
        { opacity: 0, y: -50, rotationX: 90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.5, stagger: 0.03, ease: "back.out(1.7)" }
      );
    },
    // 2. Letters flip in from bottom
    (container) => {
      const chars = container.querySelectorAll(`.${styles.char}`);
      gsap.fromTo(chars,
        { opacity: 0, y: 80, rotationX: -120 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.02, ease: "power4.out" }
      );
    },
    // 3. Words slide in from left
    (container) => {
      const words = container.querySelectorAll(`.${styles.word}`);
      gsap.fromTo(words,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );
    },
    // 4. Letters scale pop-in
    (container) => {
      const chars = container.querySelectorAll(`.${styles.char}`);
      gsap.fromTo(chars,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02, ease: "elastic.out(1, 0.5)" }
      );
    },
    // 5. Letters blur and slide from random directions
    (container) => {
      const chars = container.querySelectorAll(`.${styles.char}`);
      chars.forEach((char, i) => {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        gsap.fromTo(char,
          { opacity: 0, x: randomX, y: randomY, filter: "blur(10px)" },
          { opacity: 1, x: 0, y: 0, filter: "blur(0px)", duration: 0.6, delay: i * 0.02, ease: "power2.out" }
        );
      });
    }
  ];

  // Only run animations if not already complete
  useLayoutEffect(() => {
    if (!complete && textRef.current) {
      effects[effectIndex](textRef.current);
    }
  }, [factIndex, effectIndex, complete]);

  // Cycle to random fact and effect every 5 seconds (only if not complete)
  useEffect(() => {
    if (complete) return;

    const interval = setInterval(() => {
      setFactIndex((prev) => {
        let next;
        do { next = Math.floor(Math.random() * facts.length); } while (next === prev);
        return next;
      });
      setEffectIndex(Math.floor(Math.random() * effects.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length, effects.length, complete]);

  // Ensure loading screen stays for at least 4 seconds (only if not complete)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    if (complete) return;

    const timer = setTimeout(() => setMinTimeElapsed(true), 4000);
    return () => clearTimeout(timer);
  }, [complete]);

  useEffect(() => {
    if (complete) return;

    if (progress === 100 && minTimeElapsed) {
      // Mark as visited when loading completes
      sessionStorage.setItem('fortifier_intro_shown', 'true');

      const timeout = setTimeout(() => {
        setComplete(true);
        onFinished();
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      onStarted();
    }
  }, [progress, minTimeElapsed, onFinished, onStarted, complete]);

  // Split text into characters
  const splitChars = (text, isHighlight = false) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`${styles.char} ${isHighlight ? styles.highlight : ''}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  // Split text into words (for word-based animations)
  const splitWords = (text, isHighlight = false) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={styles.word}>
        {word.split('').map((char, j) => (
          <span key={j} className={`${styles.char} ${isHighlight ? styles.highlight : ''}`}>
            {char}
          </span>
        ))}
        {i < text.split(' ').length - 1 && <span className={styles.char}>&nbsp;</span>}
      </span>
    ));
  };

  if (complete) return null;

  const currentFact = facts[factIndex];

  return (
    <div className={`${styles.loadingScreen} ${complete ? styles.hidden : ''}`}>
      <div className={styles.container}>
        <img src={fortifierLogo} alt="Fortifier" className={styles.logo} />

        <div className={styles.factContainer}>
          <div key={factIndex} ref={textRef} className={styles.factText}>
            {splitWords(currentFact.text)}
            {splitWords(currentFact.highlight, true)}
            {splitWords(currentFact.rest)}
          </div>
        </div>
      </div>
    </div>
  );
}
