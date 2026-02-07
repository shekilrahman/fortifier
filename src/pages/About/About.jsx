import React from 'react';
import Overlay from './components/Overlay';
import SEO from '../../components/SEO';
import { ReactLenis } from 'lenis/react';

function About() {
  return (
    <ReactLenis root>
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
        <SEO
          title="About Us"
          description="Learn about Fortifier, our mission, and our commitment to providing top-tier security solutions."
          url="/about"
        />
        <Overlay />
      </div>
    </ReactLenis>
  );
}

export default About;