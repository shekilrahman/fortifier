import styles from "./LoadingScreen.module.css";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const circleRef = useRef(null);
  const dotsRef = useRef([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [totalResources, setTotalResources] = useState(0);

  const numberOfDots = 36;
  const dots = Array.from({ length: numberOfDots }, (_, i) => ({
    id: i,
    angle: (i * 360) / numberOfDots,
  }));

  useEffect(() => {
    let loadedCounter = 0;

    const countResources = () => {
      const images = document.querySelectorAll("img");
      const scripts = document.querySelectorAll("script[src]");
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      return images.length + scripts.length + stylesheets.length;
    };

    const updateProgress = () => {
      const total = countResources();
      setTotalResources(total);

      const percentage = Math.min((loadedCounter / total) * 100, 100);
      setLoadingProgress(percentage);

      if (loadedCounter >= total && document.readyState === "complete") {
        setIsPageLoaded(true);
      }
    };

    const trackResourceLoading = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (img.complete) {
          loadedCounter++;
        } else {
          img.addEventListener("load", () => {
            loadedCounter++;
            updateProgress();
          });
          img.addEventListener("error", () => {
            loadedCounter++;
            updateProgress();
          });
        }
      });

      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          loadedCounter++;
        } else {
          script.addEventListener("load", () => {
            loadedCounter++;
            updateProgress();
          });
          script.addEventListener("error", () => {
            loadedCounter++;
            updateProgress();
          });
        }
      });

      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((link) => {
        try {
          if (link.sheet && link.sheet.cssRules) {
            loadedCounter++;
          } else {
            link.addEventListener("load", () => {
              loadedCounter++;
              updateProgress();
            });
            link.addEventListener("error", () => {
              loadedCounter++;
              updateProgress();
            });
          }
        } catch {
          loadedCounter++;
        }
      });

      updateProgress();
    };

    const updateDocumentState = () => {
      if (document.readyState === "interactive") {
        trackResourceLoading();
      } else if (document.readyState === "complete") {
        trackResourceLoading();
      }
    };

    document.addEventListener("readystatechange", updateDocumentState);
    window.addEventListener("load", () => {
      setLoadingProgress(100);
      setIsPageLoaded(true);
    });

    if (document.readyState === "complete") {
      trackResourceLoading();
    }

    const blinkTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    blinkTimeline.to(circleRef.current, {
      opacity: 0.3,
      duration: 0.8,
      ease: "power2.inOut",
    });

    return () => {
      document.removeEventListener("readystatechange", updateDocumentState);
      blinkTimeline.kill();
    };
  }, []);

  useEffect(() => {
    if (isPageLoaded && loadingProgress >= 100 && dotsRef.current.length > 0) {
      gsap.killTweensOf(circleRef.current);
      gsap.set(circleRef.current, { opacity: 1 });

      gsap.set(dotsRef.current, {
        opacity: 0.2,
        scale: 0.8,
        backgroundColor: "#4a90e2",
      });

      const glowTimeline = gsap.timeline({
        onComplete: () => {
          gsap.to(circleRef.current, {
            opacity: 0,
            scale: 10,
            backgroundColor: "#ff0000ff",
          });
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        },
      });

      dotsRef.current.forEach((dot, index) => {
        glowTimeline.to(
          dot,
          {
            opacity: 1,
            scale: 1.5,
            backgroundColor: "#ff0000ff",
            boxShadow:
              "0 0 20px rgba(100, 181, 246, 0.8), 0 0 40px rgba(100, 181, 246, 0.6)",
            duration: 0.15,
            ease: "power2.out",
          },
          (dotsRef.current.length - 1 - index) * 0.05
        );
      });
    }
  }, [isPageLoaded, loadingProgress, onLoadingComplete]);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContainer}>
        <div ref={circleRef} className={styles.dottedCircle}>
          {dots.map((dot, index) => (
            <div
              key={dot.id}
              ref={(el) => (dotsRef.current[index] = el)}
              className={styles.dot}
              style={{
                transform: `rotate(${dot.angle}deg) translateY(-95px) rotate(-${dot.angle}deg)`,
              }}
            />
          ))}
          <div className={styles.progressText}>LOADING</div>
        </div>
      </div>
    </div>
  );
}
