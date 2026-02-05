import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GetAQuote.module.css';

const GetAQuote = ({ style }) => {
    const navigate = useNavigate();

    return (
        <section className={styles.ctaSection} style={style}>
            <h2 className={styles.ctaTitle}>
                Get a Free Quote
            </h2>
            <p className={styles.ctaTagline}>No Pressure, No Obligation<br />Free On-Site Security Assessment</p>
            <button className={styles.ctaButton} onClick={() => navigate('/contact')}>Get Your Free Quote</button>
        </section>
    );
};

export default GetAQuote;
