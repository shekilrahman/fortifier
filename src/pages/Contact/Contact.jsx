import React, { Suspense } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
      <Overlay />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 5, pointerEvents: 'none' }}>
        <Suspense fallback={<div className="loading">INITIALIZING SYSTEM...</div>}>
          <Scene />
        </Suspense>
      </div>
    </div>
  );
}
