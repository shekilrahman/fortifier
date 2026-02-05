import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overlay.module.css';
import termsPdf from '../../../assets/Fortifier Terms & Conditions of Trade.pdf';

gsap.registerPlugin(ScrollTrigger);


const Overlay = () => {
    const containerRef = useRef();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'Home CCTV Security',
        message: '',
        website: '' // Honeypot field
    });
    const [status, setStatus] = useState(null);
    const formStartTime = useRef(Date.now());

    useLayoutEffect(() => {
        // Reset timer on mount
        formStartTime.current = Date.now();
        // ... existing animations
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

    const validateForm = () => {
        // 1. Honeypot Trap
        if (formData.website) return false;

        // 2. Time Trap (Human takes > 2s)
        if (Date.now() - formStartTime.current < 2000) return false;

        // 3. Rate Limiting (5 mins)
        const lastSent = localStorage.getItem('last_enquiry_sent');
        if (lastSent && Date.now() - parseInt(lastSent) < 5 * 60 * 1000) {
            alert("You're doing that too fast. Please wait a few minutes.");
            return false;
        }

        // 4. Strict Email Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // 5. Phone Validation (Australian Mobile/Landline loose check)
        // Matches: 04XX XXX XXX, +61 4XX XXX XXX, (0X) XXXX XXXX
        const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
        // Only validate if phone is provided (it's optional in layout, but good to check if entered)
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s()]/g, ''))) {
            alert("Please enter a valid Australian phone number.");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Run Security Checks
        if (!validateForm()) {
            // Silently fail for bots (honeypot/time), noisy fail for validation errors
            if (formData.website || Date.now() - formStartTime.current < 2000) {
                // Fake success for bots
                setStatus('success');
                setTimeout(() => setStatus(null), 3000);
            }
            return;
        }

        setStatus('sending');

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.service,
            message: formData.message
        };

        // Google Apps Script Web App URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6J9bviGtdHqlG9c-UB9y_NUzYRrzYSoAWS3DBE6wOSK8eB_M64JQHHydYErkrdqyU/exec';

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', service: 'Home CCTV Security', message: '', website: '' });
                // Set Cooldown
                localStorage.setItem('last_enquiry_sent', Date.now().toString());
                setTimeout(() => setStatus(null), 5000);
            })
            .catch((error) => {
                console.error('Error:', error);
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
                            <div className={styles.iconBox}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div className={styles.textBox}>
                                <span className={styles.detailLabel}>Call Us</span>
                                <a href="tel:0403437040" className={styles.detailValue}>0403 437 040</a>
                            </div>
                        </div>
                        <div className={styles.detailItem}>
                            <div className={styles.iconBox}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <div className={styles.textBox}>
                                <span className={styles.detailLabel}>Email Us</span>
                                <a href="mailto:admin@fortifier.com.au" className={styles.detailValue}>admin@fortifier.com.au</a>
                            </div>
                        </div>
                        <div className={styles.detailItem}>
                            <div className={styles.iconBox}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div className={styles.textBox}>
                                <span className={styles.detailLabel}>Location</span>
                                <span className={styles.detailValue}>South Ripley<br />Brisbane Australia 4306</span>
                            </div>
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
                        <div className={styles.footerLinks}>
                            <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link>
                            <a href={termsPdf} download="Fortifier Terms & Conditions.pdf">Terms & Conditions of Trade</a>
                            <br></br>
                            <span>&copy; {new Date().getFullYear()} Fortifier</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: FORM */}
                <div className={styles.formColumn}>
                    <form ref={formRef} className={styles.contactForm} onSubmit={handleSubmit}>
                        {/* Honeypot Field - Hidden */}
                        <div style={{ display: 'none' }}>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} autoComplete="off" tabIndex="-1" />
                        </div>

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
                            <label className={styles.formLabel}>Service</label>
                            <select name="service" className={styles.formSelect} value={formData.service} onChange={handleChange}>
                                <option value="Home CCTV Security">Home CCTV Security</option>
                                <option value="Business CCTV Systems">Business CCTV Systems</option>
                                <option value="Solar Powered Security">Solar Powered Security</option>
                                <option value="Video Intercom Systems">Video Intercom Systems</option>
                                <option value="Other Enquiries">Other Enquiries</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Message</label>
                            <textarea name="message" className={styles.formTextarea} required value={formData.message} onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'GET QUOTE'}
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
