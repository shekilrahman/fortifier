import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.css";

export default function Marquee({ text, speed = 10 }) {
    const containerRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const width = textRef.current.offsetWidth;
            gsap.to(textRef.current, {
                x: -width / 2,
                duration: speed,
                ease: "none",
                repeat: -1
            });
        });
        return () => ctx.revert();
    }, [speed, text]);

    return (
        <div className={styles.marqueeContainer} ref={containerRef}>
            <div className={styles.marqueeText} ref={textRef}>
                {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text} &nbsp; • &nbsp; {text}
            </div>
        </div>
    );
}
