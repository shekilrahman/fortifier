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
            <Section align="left" title="Complete Protection" type="front">
                <p>
                    Get complete security with high definition cameras, intelligent alarm systems
                    and video doorbell intercoms. We seamlessly upgrade your protection to
                    advanced standards.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Control all your security - cameras, alarms, and video doorbells - using just one app.
                </p>
            </Section>

            {/* SERVICES - RIGHT */}
            <Section align="right" title="Our Services" type='front'>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                        "Home Security Systems",
                        "Business Security Upgrades",
                        "Intelligent Alarm Systems",
                        "Whole Home Wi-Fi Installation"
                    ].map((item, i) => (
                        <li key={i} style={{
                            marginBottom: '1rem',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            paddingBottom: '0.5rem'
                        }}>
                            {item}
                        </li>
                    ))}
                </ul>
            </Section>

            {/* BENEFITS - LEFT */}
            <Section align="left" title="Smart Integration" type='front'>
                <p>
                    Protect your assets with smart HD security cameras and state-of-the-art access control.
                    Our intelligent intrusion detection keeps you protected 24/7.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                        <h4 style={{ color: '#ff1a1a', margin: '0 0 0.5rem' }}>MOBILE CONTROL</h4>
                        <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Receive mobile alerts of intruders and control gates/garages remotely.</span>
                    </div>
                    <div>
                        <h4 style={{ color: '#ff1a1a', margin: '0 0 0.5rem' }}>WI-FI ZONES</h4>
                        <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Eliminate dead zones with our whole home connectivity solutions.</span>
                    </div>
                </div>
            </Section>

            {/* TRUST/EXPERTISE - RIGHT */}
            <Section align="right" title="Trusted Brand" type='front'>
                <p>
                    "With a reliable layer of protection added to your premises, you’ll be able to sleep
                    soundly knowing that the things you care about are safe."
                </p>
                <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#ff1a1a' }}>
                    — Precision Security Australia™
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', opacity: 0.6 }}>
                    <span>Hikvision Authorized</span>
                    <span>•</span>
                    <span>Expert Installation</span>
                </div>
            </Section>

            {/* CTA - CENTER */}
            <Section align="center" title="Free Onsite Assessment" className="cta-section" type='front'>
                <p style={{ marginBottom: '3rem' }}>
                    Need security but don't know where to start? Get a quick free quote today.
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
