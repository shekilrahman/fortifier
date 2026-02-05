import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import styles from './Overlay.module.css';
import Footer from '../../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Overlay = () => {
    const containerRef = useRef();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Hero
            gsap.fromTo(`.${styles.heroTitle}`,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            // Animate Cards Stagger
            gsap.fromTo(`.${styles.valueCard}`,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: `.${styles.editorialSection}`,
                        start: "top 80%",
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const values = [
        {
            id: "01",
            title: "Trust & Expertise",
            desc: "Fortifier Security Solutions was built on a simple principle: deliver reliable, professional security systems that people can trust long-term. We don't cut corners; we build relationships.",
            size: styles.cardLarge
        },
        {
            id: "02",
            title: "Our Approach",
            desc: "Every system we install is carefully planned, neatly installed, and configured to suit your property. We take the time to understand your needs.",
            size: styles.cardMedium
        },
        {
            id: "03",
            title: "Lifetime Guarantee",
            desc: "What truly sets Fortifier apart is our lifetime workmanship guarantee. If it’s our work, we own it — no runaround, no excuses.",
            size: styles.cardMedium
        },
        {
            id: "04",
            title: "Local Support",
            desc: "We proudly work with trusted, industry-leading brands and provide honest advice, clear communication, and ongoing local support.",
            size: styles.cardLarge
        }
    ];

    return (
        <div ref={containerRef} className={styles.overlay}>
            {/* HERO */}
            <section className={styles.hero}>
                <p className={styles.heroSubtitle}>Professional Security Systems</p>
                <h1 className={styles.heroTitle}>
                    About<br />Fortifier
                </h1>
                <p className={styles.missionStatement} style={{ marginTop: '2rem', maxWidth: '1000px' }}>
                    Security isn’t just about cameras — it’s about doing the job <span className={styles.highlight}>right</span>, the first time.
                    <br /><br />
                    We specialise in high-quality CCTV and security installations for homes and businesses, designed to work flawlessly day and night.
                </p>
            </section>

            {/* EDITORIAL GRID */}
            <section className={styles.editorialSection}>
                <div className={styles.gridContainer}>
                    {values.map((item) => (
                        <div key={item.id} className={`${styles.valueCard} ${item.size}`}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardNumber}>{item.id}</span>
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Ready to Secure Your Property?</h2>
                <button className={styles.ctaButton} onClick={() => navigate('/contact')}>Get a Free Quote</button>
            </section>

            {/* FOOTER */}
            <Footer />

            {/* FLOATING ACTIONS */}
            <div className={styles.floatingActions}>
                <a href="mailto:admin@fortifier.com.au" className={styles.actionButton} aria-label="Email">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
                <a href="tel:0403437040" className={`${styles.actionButton} ${styles.phoneButton}`} aria-label="Call">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path></svg>
                </a>
            </div>
        </div>
    );
};

export default Overlay;
