import React from 'react';
import Overlay from './components/Overlay';
import SEO from '../../components/SEO';
import { ReactLenis } from 'lenis/react';

const Services = () => {
    return (
        <ReactLenis root>
            <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
                <SEO
                    title="Our Services"
                    description="Explore our range of security services, from installation to maintenance and monitoring."
                    url="/services"
                />
                <Overlay />
            </div>
        </ReactLenis>
    );
};

export default Services;
