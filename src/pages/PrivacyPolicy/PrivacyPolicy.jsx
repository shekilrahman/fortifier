import React from 'react';
import styles from './PrivacyPolicy.module.css';
import logo from '../../assets/FORTIFIER.svg';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ReactLenis } from 'lenis/react';

const PrivacyPolicy = () => {
    return (
        <ReactLenis root>
            <div className={styles.container}>
                <SEO
                    title="Privacy Policy"
                    description="Read our Privacy Policy to understand how we handle your personal information."
                    url="/privacy-policy"
                />
                <div className={styles.content}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="Fortifier Security Solutions" className={styles.logo} />
                    </div>

                    <h1 className={styles.title}>Privacy Policy</h1>

                    <p className={styles.text}>
                        Fortifier Security Solutions ("we", "our", "us") is committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
                    </p>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>1. What Information We Collect</h2>
                        <p className={styles.text}>We may collect the following types of personal information:</p>
                        <ul className={styles.list}>
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Residential or business address</li>
                            <li>CCTV footage or security-related data (where applicable)</li>
                            <li>Billing and payment information</li>
                            <li>Any other information you provide when contacting us or using our services</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>2. How We Collect Your Information</h2>
                        <p className={styles.text}>We collect personal information when you:</p>
                        <ul className={styles.list}>
                            <li>Contact us via phone, email, or our website</li>
                            <li>Request a quote or engage our services</li>
                            <li>Allow us access to your premises for installation or maintenance</li>
                            <li>Use our website or online forms</li>
                        </ul>
                        <p className={styles.text}>We may also collect information automatically through website analytics and cookies.</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>3. Why We Collect Your Information</h2>
                        <p className={styles.text}>We collect personal information to:</p>
                        <ul className={styles.list}>
                            <li>Provide and manage our services</li>
                            <li>Communicate with you</li>
                            <li>Prepare quotes and invoices</li>
                            <li>Improve our services and customer experience</li>
                            <li>Comply with legal and regulatory obligations</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>4. CCTV and Security Data</h2>
                        <p className={styles.text}>Where CCTV systems are installed or serviced by us:</p>
                        <ul className={styles.list}>
                            <li>We do not monitor or access footage unless explicitly authorised by the client</li>
                            <li>Any access is strictly for installation, testing, maintenance, or troubleshooting</li>
                            <li>We do not store or distribute CCTV footage unless contractually required</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>5. Disclosure of Personal Information</h2>
                        <p className={styles.text}>We do not sell or rent your personal information.</p>
                        <p className={styles.text}>We may disclose personal information to:</p>
                        <ul className={styles.list}>
                            <li>Contractors or service providers assisting us</li>
                            <li>Payment processors</li>
                            <li>Legal or regulatory authorities where required by law</li>
                        </ul>
                        <p className={styles.text}>All third parties are required to protect your information.</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>6. Data Security</h2>
                        <p className={styles.text}>We take reasonable steps to protect your personal information from:</p>
                        <ul className={styles.list}>
                            <li>Loss</li>
                            <li>Misuse</li>
                            <li>Unauthorised access</li>
                            <li>Modification or disclosure</li>
                        </ul>
                        <p className={styles.text}>This includes physical, electronic, and procedural safeguards.</p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>7. Access and Correction</h2>
                        <p className={styles.text}>
                            You may request access to or correction of your personal information by contacting us. We will respond within a reasonable timeframe.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>8. Cookies and Website Analytics</h2>
                        <p className={styles.text}>
                            Our website may use cookies and analytics tools to improve functionality and performance. You can disable cookies in your browser settings if you prefer.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>9. Changes to This Policy</h2>
                        <p className={styles.text}>
                            We may update this Privacy Policy from time to time. The latest version will always be available on our website.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.heading}>10. Contact Us</h2>
                        <p className={styles.text}>
                            If you have any questions about this Privacy Policy or how we handle your personal information, please contact us.
                        </p>
                    </div>

                    <div className={styles.footerNote}>
                        Fortifier Security Solutions
                    </div>
                </div>
            </div>
            <Footer />
        </ReactLenis>
    );
};

export default PrivacyPolicy;
