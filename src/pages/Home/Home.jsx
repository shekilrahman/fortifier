import React, { Suspense } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import { ReactLenis } from 'lenis/react';

import LoadingScreen from '../../components/LoadingScreen';

const Home = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#050505' }}>
      <LoadingScreen onFinished={() => setIsLoaded(true)} />
      <div style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}>
        <Overlay />
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 5, pointerEvents: 'none' }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
