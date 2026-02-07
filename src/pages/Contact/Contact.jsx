import React from 'react';
import Overlay from './components/Overlay';
import SEO from '../../components/SEO';
import { ReactLenis } from 'lenis/react';

export default function Contact() {
  return (
    <ReactLenis root>
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
        <SEO
          title="Contact Us"
          description="Get in touch with Fortifier for a free quote or to discuss your security needs."
          url="/contact"
        />
        <Overlay />
      </div>
    </ReactLenis>
  );
}
