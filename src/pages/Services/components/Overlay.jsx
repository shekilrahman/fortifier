import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overlay.module.css';
import logo from '../../../assets/FORTIFIER.svg';
import Footer from '../../../components/Footer';

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
                {title && (
                    <h2 className={styles.title}>
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};

const Overlay = () => {
    const containerRef = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Hero Text
            gsap.fromTo(`.${styles.heroTitle}`,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
            );

            gsap.fromTo(`.${styles.heroSubtitle}`,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
            );

            // Animate Each Service Section
            const sections = gsap.utils.toArray(`.${styles.serviceSection}`);
            sections.forEach((section) => {
                // Content Reveal
                const content = section.querySelector(`.${styles.serviceContent}`);

                if (content) {
                    gsap.fromTo(content,
                        { scale: 0.9, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 1.5, // Slower, smoother reveal
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 75%", // Trigger earlier
                                end: "bottom 20%",
                                toggleActions: "play none none reverse" // Don't fade out when scrolling down
                            }
                        }
                    );
                }
            });

            // Force refresh to calculate positions correctly
            ScrollTrigger.refresh();

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const services = [

        {
            id: "01",
            title: "Home CCTV Security",
            desc: "Protect what matters most with a reliable home CCTV security system designed for complete peace of mind.",
            features: ["HD & 4K Video", "Mobile Live View", "Night Vision", "Pro Installation"],
            // Visual: Simple Home Icon & Radar
            renderVisual: () => (
                <div className={styles.visualContainer}>
                    <div className={styles.homeContainer}>
                        {/* Circular Radar */}
                        <div className={styles.radarContainer}>
                            <div className={styles.radarSweep} />
                        </div>

                        {/* Flat Home Icon */}
                        <div className={styles.homeIcon}>
                            <div className={styles.iconRoof}></div>
                            <div className={styles.iconBody}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "02",
            title: "Business CCTV Systems",
            desc: "Your business is your livelihood. Prevent theft, monitor staff safety, and provide valuable evidence.",
            features: ["Theft Prevention", "Staff Safety", "HD Recording", "Fast Install"],
            // Visual: Monitor Wall with Glitch Scan
            renderVisual: () => (
                <div className={styles.visualContainer}>
                    <div className={styles.monitorWall}>
                        <div className={styles.monitorScreen}><div className={styles.monitorScan}></div></div>
                        <div className={styles.monitorScreen}><div className={styles.monitorScan}></div></div>
                        <div className={styles.monitorScreen}><div className={styles.monitorScan}></div></div>
                        <div className={styles.monitorScreen}><div className={styles.monitorScan}></div></div>
                    </div>
                </div>
            )
        },
        {
            id: "03",
            title: "Solar Powered Security",
            desc: "Secure your property even where power and internet are limited. AI detection reduces false alarms.",
            features: ["No Wiring Needed", "AI Detection", "4G Connected", "Solar Powered"],
            // Visual: Solar Panel Absorbing Sun
            renderVisual: () => (
                <div className={styles.visualContainer}>
                    <div className={styles.solarContainer}>
                        <div className={styles.sunRays}></div>
                        <div className={styles.solarPanel}>
                            <div className={styles.energyFlow}></div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "04",
            title: "Video Intercom Systems",
            desc: "See, hear, and speak to visitors in real time—whether you’re at home or away.",
            features: ["HD Video Call", "Remote Access", "Smart Auth", "Indoor/Outdoor"],
            // Visual: Face Scan / Visitor Verification
            renderVisual: () => (
                <div className={styles.visualContainer}>
                    <div className={styles.intercomContainer}>
                        <div className={styles.faceProfile}>
                            <div className={styles.faceFeatures}>
                                <div className={styles.faceGrid}></div>
                            </div>
                        </div>
                        <div className={styles.faceScanLaser}></div>
                        <div className={styles.reticle}></div>
                        {/* HUD Corners */}
                        <div className={`${styles.hudCorner} ${styles.tl}`}></div>
                        <div className={`${styles.hudCorner} ${styles.tr}`}></div>
                        <div className={`${styles.hudCorner} ${styles.bl}`}></div>
                        <div className={`${styles.hudCorner} ${styles.br}`}></div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div ref={containerRef} className={styles.overlay}>
            {/* HERO SECTION */}
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    Advanced<br />
                    <span style={{ color: '#ff1a1a' }}>Surveillance</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Next-generation security solutions for residential and commercial environments. Experience total control.
                </p>
            </section>

            {/* IMMERSIVE SERVICE SECTIONS */}
            <div className={styles.servicesContainer}>
                {services.map((service, index) => (
                    <section key={service.id} className={styles.serviceSection}>
                        {/* Scanning Effect Removed as per request */}

                        <div className={styles.serviceContent}>
                            {/* Visual Column */}
                            <div className={styles.visualCol} style={{ order: index % 2 === 0 ? 0 : 2 }}>
                                {service.renderVisual()}
                            </div>

                            {/* Info Column */}
                            <div className={styles.infoCol}>
                                <span className={styles.serviceIndex}>SEQ_0{index + 1} // {service.id}</span>
                                <h2 className={styles.serviceTitleBig}>{service.title}</h2>
                                <p className={styles.serviceDescBig}>{service.desc}</p>

                                <div className={styles.techFeatures}>
                                    {service.features.map((feature, i) => (
                                        <span key={i} className={styles.techBadge}>{feature}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* FINAL CTA */}
            <section className={styles.ctaSection}>
                <h2 className={styles.serviceTitleBig} style={{ fontSize: '3rem', marginBottom: '2rem' }}>
                    Secure Your Future
                </h2>
                <button className={styles.ctaButton}>Initialize Quote</button>
            </section>

            {/* FOOTER */}
            <Footer />

            {/* Floating Contact Actions */}
            <div className={styles.floatingActions}>
                <a href="mailto:admin@fortifier.com.au" className={`${styles.actionButton} ${styles.emailButton}`} aria-label="Send Email">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
                <a href="tel:0403437040" className={`${styles.actionButton} ${styles.phoneButton}`} aria-label="Call Us">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Overlay;
