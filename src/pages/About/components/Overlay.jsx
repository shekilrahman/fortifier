import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overlay.module.css';

gsap.registerPlugin(ScrollTrigger);

const Section = ({ align, title, children, className = "" }) => {
    // Map align prop to css class
    const alignClass = styles[align] || styles.left;

    return (
        <section
            className={`section-content ${styles.section} ${alignClass} ${className}`}
        >
            <div className={`section-inner ${styles.sectionInner}`}>
                <h2 className={`${styles.title} ${styles.behind}`}>
                    {title}
                </h2>
                <div className={`${styles.description} ${styles.behind}`}>
                    {children}
                </div>
            </div>
        </section>
    );
};

const Overlay = () => {
    const containerRef = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray('.section-content');

            sections.forEach((section) => {
                const inner = section.querySelector('.section-inner');
                // Skip animation for sections without inner content (like Hero)
                if (!inner) return;

                gsap.fromTo(inner,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            end: "bottom 20%",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className={styles.overlay}
        >
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <h1 className={`${styles.heroTitle} ${styles.behind}`}>
                    ABOUT<span style={{ color: '#ff1a1a' }}>.</span>
                </h1>
                <p className={`${styles.heroSubtitle} ${styles.front}`}>
                    Who We Are
                </p>
            </section>

            {/* MESSAGE - LEFT */}
            <Section align="left" title="Our Story">
                <p>
                    Fortifier was born from a simple belief: security shouldn't be complicated.
                    We engineer advanced surveillance solutions that blend seamlessly into your environment
                    while providing military-grade protection.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Trusted by Fortune 500 companies and private estates globally.
                </p>
            </Section>

            {/* CTA - CENTER */}
            <Section align="center" title="Join the Future" className="cta-section">
                <p style={{ marginBottom: '3rem' }}>
                    Interested in our technology? Let's talk.
                </p>
                <div className={styles.front}>
                    <button className={styles.button}>
                        Contact Us
                    </button>
                </div>
            </Section>

            <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                SCROLL TO EXPLORE
            </div>
        </div>
    );
};

export default Overlay;
