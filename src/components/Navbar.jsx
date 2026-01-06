import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

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
                FORTIFIER<span style={{ color: '#ff1a1a' }}>.</span>
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
