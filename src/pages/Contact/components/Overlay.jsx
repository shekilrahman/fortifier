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
                    CONTACT<span style={{ color: '#ff1a1a' }}>.</span>
                </h1>
                <p className={`${styles.heroSubtitle} ${styles.front}`}>
                    We are here for you
                </p>
            </section>

            {/* DETAILS - LEFT */}
            <Section align="left" title="Get In Touch">
                <p>
                    Whether you have questions about our systems or need a custom quote,
                    our team is ready to assist.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ fontSize: '1.2rem', color: '#ff1a1a' }}>support@fortifier.com</p>
                </div>
            </Section>

            {/* CTA - CENTER */}
            <Section align="center" title="Start Security" className="cta-section">
                <p style={{ marginBottom: '3rem' }}>
                    Ready to secure your premises?
                </p>
                <div className={styles.front}>
                    <button className={styles.button}>
                        Get a Quote
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
