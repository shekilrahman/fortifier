// Enhanced LoadingScreen.js with resource tracking
import styles from "./LoadingScreen.module.css";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const circleRef = useRef(null);
  const dotsRef = useRef([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(0);
  const [totalResources, setTotalResources] = useState(0);

  // Create dot positions (36 dots for 10-degree intervals)
  const numberOfDots = 36;
  const dots = Array.from({ length: numberOfDots }, (_, i) => ({
    id: i,
    angle: (i * 360) / numberOfDots,
  }));

  useEffect(() => {
    let resourceCounter = 0;
    let loadedCounter = 0;

    // Count all resources that need to be loaded
    const countResources = () => {
      const images = document.querySelectorAll("img");
      const scripts = document.querySelectorAll("script[src]");
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

      return images.length + scripts.length + stylesheets.length;
    };

    // Track resource loading
    const trackResourceLoading = () => {
      const updateProgress = () => {
        const total = countResources();
        setTotalResources(total);

        if (total === 0) {
          setLoadingProgress(100);
          setIsPageLoaded(true);
          return;
        }

        const percentage = Math.min((loadedCounter / total) * 100, 100);
        setLoadingProgress(percentage);

        if (loadedCounter >= total && document.readyState === "complete") {
          setIsPageLoaded(true);
        }
      };

      // Track images
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

      // Track scripts
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

      // Track stylesheets
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
        } catch (e) {
          loadedCounter++;
        }
      });

      updateProgress();
    };

    // Initial document ready state tracking
    const updateDocumentState = () => {
      if (document.readyState === "loading") {
        setLoadingProgress(Math.max(loadingProgress, 10));
      } else if (document.readyState === "interactive") {
        setLoadingProgress(Math.max(loadingProgress, 50));
        trackResourceLoading();
      } else if (document.readyState === "complete") {
        trackResourceLoading();
      }
    };

    updateDocumentState();

    // Listen for readyState changes
    document.addEventListener("readystatechange", updateDocumentState);

    // Window load event
    const handleWindowLoad = () => {
      setLoadingProgress(100);
      setIsPageLoaded(true);
    };

    window.addEventListener("load", handleWindowLoad);

    // Fallback: If page is already loaded
    if (document.readyState === "complete") {
      trackResourceLoading();
    }

    // Initial blinking animation during loading
    const blinkTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    blinkTimeline.to(circleRef.current, {
      opacity: 0.3,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Cleanup function
    return () => {
      document.removeEventListener("readystatechange", updateDocumentState);
      window.removeEventListener("load", handleWindowLoad);
      blinkTimeline.kill();
    };
  }, []);

  useEffect(() => {
    // Only start the circular glowing animation after page is actually loaded
    if (isPageLoaded && loadingProgress >= 100 && dotsRef.current.length > 0) {
      // Stop blinking
      gsap.killTweensOf(circleRef.current);
      gsap.set(circleRef.current, { opacity: 1 });

      // Set all dots to initial state (dim)
      gsap.set(dotsRef.current, {
        opacity: 0.2,
        scale: 0.8,
        backgroundColor: "#4a90e2",
      });

      // Create sequential glow animation
      const glowTimeline = gsap.timeline({
        onComplete: () => {
          gsap.to(circleRef.current, {
            opacity: 0,
            scale: 10,
            backgroundColor: "#ff0000ff",
          });
          // Wait a bit after animation completes, then call onLoadingComplete
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
        },
      });

      const totalDots = dotsRef.current.length;
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
          (totalDots - 1 - index) * 0.05
        );
      });
    }
  }, [isPageLoaded, loadingProgress, onLoadingComplete]);

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContainer}>
        <div ref={circleRef} className={styles.dottedCircle}>
          {/* Render individual dots */}
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
          <div className={styles.progressText}>
            {!isPageLoaded ? `${Math.round(loadingProgress)}%` : "FORTIFIER"}
          </div>
        </div>
        {/* Optional: Show loading details */}
        {!isPageLoaded && totalResources > 0 && (
          <div className={styles.loadingDetails}>
            Loading resources: {resourcesLoaded}/{totalResources}
          </div>
        )}
      </div>
    </div>
  );
}
