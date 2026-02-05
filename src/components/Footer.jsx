import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import policeLogo from '../assets/police.png';
import termsPdf from '../assets/Fortifier Terms & Conditions of Trade.pdf';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* License Badge */}
                <div className={styles.licenseBadge}>
                    <img src={policeLogo} alt="Queensland Police" className={styles.policeLogo} />
                    <div className={styles.licenseText}>
                        <span className={styles.licenseTitle}>Licensed Security Installer</span>
                        <span className={styles.licenseNumber}>Lic. 4861857</span>
                        <span className={styles.licenseIssuer}>License issued by</span>
                        <span className={styles.licenseAuthority}>QUEENSLAND POLICE</span>
                    </div>
                </div>

                <p>&copy; {new Date().getFullYear()} Fortifier. All rights reserved.</p>

                <div className={styles.footerLinks}>
                    <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link>
                    <a href={termsPdf} download="Fortifier Terms & Conditions.pdf" className={styles.footerLink}>Terms & Conditions of Trade</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
