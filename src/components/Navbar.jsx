import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
                FORTIFIER<span style={{ color: '#ff1a1a' }}>.</span>
            </Link>
            <div className={styles.links}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    end
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
