import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overlay.module.css';

gsap.registerPlugin(ScrollTrigger);

const Section = ({ align, title, children, className = "", type = "behind" }) => {
    // Map align prop to css class
    const alignClass = styles[align] || styles.left;
    const typeClass = styles[type] || styles.behind;

    return (
        <section
            className={`section-content ${styles.section} ${alignClass} ${className}`}
        >
            <div className={`section-inner ${styles.sectionInner} ${typeClass}`}>
                <h2 className={styles.title}>
                    {title}
                </h2>
                <div className={styles.description}>
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
                    FORTIFIER<span style={{ color: '#ff1a1a' }}>.</span>
                </h1>
            </section>

            {/* OVERVIEW - LEFT */}
            <Section align="left" title="What Sets Fortifier Apart" type="front">
                <p>
                    Security should work when you need it - without confusion or callbacks. That’s why every Fortifier system is planned properly, installed cleanly, and handed over in a way that actually makes sense. You’ll know how your system works, and you’ll know who to call if you ever need support.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Every installation is backed by our lifetime workmanship guarantee, giving you long-term confidence that the job has been done right.
                </p>
            </Section>

            {/* SERVICES - RIGHT */}
            <Section align="right" title="Our Services" type='front'>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                        "CCTV Camera Systems : Clear, reliable monitoring day and night",
                        "Alarm Systems : Intelligent intrusion detection you can depend on",
                        "Video Doorbells & Intercoms : See and speak to visitors from anywhere",
                        "Access Control : Confident control over who enters your property",
                        "System Upgrades & Maintenance : Improve or expand existing systems"
                    ].map((item, i) => (
                        <li key={i} style={{
                            marginBottom: '1rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.51)',
                            paddingBottom: '0.5rem'
                        }}>
                            {item}
                        </li>
                    ))}
                </ul>
            </Section>

            {/* BENEFITS - LEFT */}
            <Section align="left" title="Lifetime Workmanship Guarantee" type='front'>
                <p>
                    Every Fortifier installation is backed by a lifetime workmanship guarantee. If an issue arises due to how your system was installed, we’ll fix it — no hassle, no runaround.
                </p>

            </Section>

            {/* TRUST/EXPERTISE - RIGHT */}
            <Section align="right" title="Trusted Brand" type='front'>
                <p>
                    "With a reliable layer of protection added to your premises, you’ll be able to sleep
                    soundly knowing that the things you care about are safe."
                </p>
                <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#ff1a1a' }}>
                    — Fortifier
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', opacity: 0.6 }}>
                    <span>Hikvision Authorized</span>
                    <span>•</span>
                    <span>Expert Installation</span>
                </div>
            </Section>

            {/* CTA - CENTER */}
            <Section align="center" title="Get a Free Quote" className="cta-section" type='front'>
                <p style={{ marginBottom: '3rem' }}>
                    If you’re considering a new security system or upgrading an existing one, we’re here to help. We’ll take the time to understand your property and recommend a solution that actually suits your needs.
                    No pressure. No confusing tech talk. Just clear advice and professional installation.
                </p>
                <div className={styles.front}>
                    <button className={styles.button}>
                        Get a Quote
                    </button>
                </div>
            </Section>

            {/* Floating Contact Actions */}
            <div className={styles.floatingActions}>
                {/* Email Button */}
                <a href="mailto:admin@fortifier.com.au" className={`${styles.actionButton} ${styles.emailButton}`} aria-label="Send Email">
                    <span className={styles.actionLabel}>admin@fortifier.com.au</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>

                {/* Phone Button */}
                <a href="tel:0403437040" className={`${styles.actionButton} ${styles.phoneButton}`} aria-label="Call Us">
                    <span className={styles.actionLabel}>040 3437 040</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Overlay;
