import React from 'react';
import Overlay from './components/Overlay';
import { ReactLenis } from 'lenis/react';

function About() {
  return (
    <ReactLenis root>
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
        <Overlay />
      </div>
    </ReactLenis>
  );
}

export default About;