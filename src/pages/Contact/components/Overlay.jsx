import React, { useLayoutEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overlay.module.css';
import policeLogo from '../../../assets/police.png';
import termsPdf from '../../../assets/Fortifier Terms & Conditions of Trade.pdf';

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = 'service_rc21vcm';
const EMAILJS_TEMPLATE_ID = 'template_epcn595';
const EMAILJS_PUBLIC_KEY = 'TXBUYF0pCppJJMML7';

const Overlay = () => {
    const containerRef = useRef();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Page Content
            gsap.fromTo(`.${styles.infoColumn}`,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );

            gsap.fromTo(`.${styles.formColumn}`,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power3.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log('SUCCESS!', result.text);
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus(null), 5000);
            }, (error) => {
                console.log('FAILED...', error.text);
                setStatus('error');
                setTimeout(() => setStatus(null), 5000);
            });
    };

    return (
        <div ref={containerRef} className={styles.overlay}>

            <div className={styles.splitSection}>

                {/* LEFT: INFO, SOCIALS, & FOOTER CONTENT */}
                <div className={styles.infoColumn}>
                    <h1 className={styles.pageTitle}>
                        Get In <span className={styles.highlight}>Touch</span>
                    </h1>

                    <p className={styles.infoDesc}>
                        Ready to secure your property? Reach out for a free quote, technical support, or just some honest advice.
                    </p>

                    <div className={styles.contactDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Call Us</span>
                            <a href="tel:0403437040" className={styles.detailValue}>0403 437 040</a>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Email Us</span>
                            <a href="mailto:admin@fortifier.com.au" className={styles.detailValue}>admin@fortifier.com.au</a>
                        </div>
                    </div>

                    <h3 className={styles.detailLabel} style={{ marginBottom: '1rem' }}>Connect With Us</h3>
                    <div className={styles.socialRow}>
                        <a href="https://wa.me/61403437040" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </a>
                        <a href="https://www.instagram.com/fortifier_security?igsh=YmNsamk3a3draHNz" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="https://www.facebook.com/share/1FAugVfVpa/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                    </div>

                    {/* INTEGRATED FOOTER CONTENT */}
                    <div className={styles.integratedFooter}>
                        <div className={styles.licenseBadge}>
                            <img src={policeLogo} alt="Queensland Police" className={styles.policeLogo} />
                            <div className={styles.licenseText}>
                                <span className={styles.licenseTitle}>Licensed Security Installer</span>
                                <span className={styles.licenseNumber}>Lic. 4861857</span>
                                <span className={styles.licenseIssuer}>License issued by</span>
                                <span className={styles.licenseAuthority}>QUEENSLAND POLICE</span>
                            </div>
                        </div>
                        <div className={styles.footerLinks}>
                            <a href={termsPdf} download="Fortifier Terms & Conditions.pdf">Terms & Conditions</a>
                            <span>&copy; {new Date().getFullYear()} Fortifier</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className={styles.formColumn}>
                    <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Name</label>
                            <input type="text" name="name" className={styles.formInput} required value={formData.name} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email</label>
                            <input type="email" name="email" className={styles.formInput} required value={formData.email} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Phone</label>
                            <input type="tel" name="phone" className={styles.formInput} value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Message</label>
                            <textarea name="message" className={styles.formTextarea} required value={formData.message} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>

                        {status === 'success' && (
                            <div className={styles.feedbackMsg}>
                                Sent! We'll stay in touch.
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={styles.feedbackMsg} style={{ color: '#ff1a1a', borderColor: '#ff1a1a', background: 'rgba(255, 26, 26, 0.1)' }}>
                                Failed to send. Please try again.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
