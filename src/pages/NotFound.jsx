import React from 'react';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#050505',
            color: '#fff',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#ff1a1a' }}>404</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>No Page Found</p>
            <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Return Home</a>
        </div>
    );
};

export default NotFound;
