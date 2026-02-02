import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/FORTIFIER_FULL.svg';
import shortLogo from '../assets/FORTIFIER_LOGO.svg';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.logo} onClick={closeNav}>
                <img src={logo} alt="Fortifier Logo" className={styles.logoFull} />
                <img src={shortLogo} alt="Fortifier Logo" className={styles.logoShort} />
            </Link>

            <button
                className={`${styles.navToggle} ${isNavOpen ? styles.open : ''}`}
                onClick={toggleNav}
                aria-label="Toggle navigation"
            >
                <span className={styles.hamburger}></span>
            </button>

            <div className={`${styles.links} ${isNavOpen ? styles.navOpen : ''}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    end
                    onClick={closeNav}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/services"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    onClick={closeNav}
                >
                    Services
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    onClick={closeNav}
                >
                    About
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    onClick={closeNav}
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
