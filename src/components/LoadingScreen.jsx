import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onStarted = () => { }, onFinished = () => { } }) {
  const { progress, active } = useProgress();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Add a small delay to ensure it doesn't flash too quickly
      const timeout = setTimeout(() => {
        setComplete(true);
        onFinished();
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      onStarted();
    }
  }, [progress, onFinished, onStarted]);

  if (complete) return null;

  return (
    <div className={`${styles.loadingScreen} ${complete ? styles.hidden : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          FORTIFIER<span style={{ color: '#ff1a1a' }}>.</span>
        </div>
        <div className={styles.barContainer}>
          <div
            className={styles.pogressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.status}>
          INITIALIZING SYSTEM... {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
