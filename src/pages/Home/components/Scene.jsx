import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor, Html } from '@react-three/drei';
import { EffectComposer, Noise, Vignette, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Cctv } from '../../../components/Cctv';
import { CCTV_KEYFRAMES } from './cctvKeyframes';

// Custom Hook for Scroll
function useScrollOffset() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
            // Clamp 0-1 standard
            setOffset(Math.min(Math.max(scrollProgress, 0), 1));
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return offset;
}

// Helper: Interpolation
const lerp = (start, end, t) => start * (1 - t) + end * t;
const lerpArray = (arr1, arr2, t) => [
    lerp(arr1[0], arr2[0], t),
    lerp(arr1[1], arr2[1], t),
    lerp(arr1[2], arr2[2], t)
];

function SceneLighting() {
    const offset = useScrollOffset();

    // Refs for lights
    const ambientRef = useRef();
    const directionalRef = useRef();
    const spotRef = useRef();

    useFrame(() => {
        let startFrame = CCTV_KEYFRAMES[0];
        let endFrame = CCTV_KEYFRAMES[CCTV_KEYFRAMES.length - 1];
        let progress = 0;

        for (let i = 0; i < CCTV_KEYFRAMES.length - 1; i++) {
            if (offset >= CCTV_KEYFRAMES[i].offset && offset <= CCTV_KEYFRAMES[i + 1].offset) {
                startFrame = CCTV_KEYFRAMES[i];
                endFrame = CCTV_KEYFRAMES[i + 1];
                progress = (offset - startFrame.offset) / (endFrame.offset - startFrame.offset);
                break;
            }
        }

        // Direct access to flattened frame data
        const startData = startFrame;
        const endData = endFrame;

        if (startData && endData) {
            // Ambient
            if (ambientRef.current) {
                ambientRef.current.intensity = lerp(startData.lightAmbient, endData.lightAmbient, progress);
            }
            // Directional
            if (directionalRef.current) {
                directionalRef.current.intensity = lerp(startData.lightDirectional, endData.lightDirectional, progress);
            }
            // Spot (Object Structure)
            if (spotRef.current && startData.spotlight && endData.spotlight) {
                const sStart = startData.spotlight;
                const sEnd = endData.spotlight;

                // Position
                const pos = lerpArray(sStart.position, sEnd.position, progress);
                spotRef.current.position.set(...pos);

                // Intensity
                spotRef.current.intensity = lerp(sStart.intensity, sEnd.intensity, progress);

                // Angle
                spotRef.current.angle = lerp(sStart.angle, sEnd.angle, progress);

                // Distance
                spotRef.current.distance = lerp(sStart.distance, sEnd.distance, progress);
            }
        }
    });

    return (
        <>
            <ambientLight ref={ambientRef} intensity={0.15} />
            <directionalLight ref={directionalRef} position={[5, 10, 5]} intensity={1} />
            <spotLight
                ref={spotRef}
                position={[0, 1, 1]}
                intensity={6}
                angle={0.5}
                penumbra={1}
                distance={3}
                color="white"
            />
        </>
    );
}

function CameraRig({ cctvRef, headRef }) {
    const { camera } = useThree();
    const offset = useScrollOffset();
    const debugRef = useRef();

    useLayoutEffect(() => {
        if (!cctvRef.current || !headRef.current) return;
        camera.position.set(0, 0, 5);
    }, [cctvRef, headRef]);

    useFrame((state) => {
        if (debugRef.current) {
            debugRef.current.innerText = `Scroll Offset: ${offset.toFixed(4)}`;
        }

        let startFrame = CCTV_KEYFRAMES[0];
        let endFrame = CCTV_KEYFRAMES[CCTV_KEYFRAMES.length - 1];
        let progress = 0;

        for (let i = 0; i < CCTV_KEYFRAMES.length - 1; i++) {
            if (offset >= CCTV_KEYFRAMES[i].offset && offset <= CCTV_KEYFRAMES[i + 1].offset) {
                startFrame = CCTV_KEYFRAMES[i];
                endFrame = CCTV_KEYFRAMES[i + 1];
                progress = (offset - startFrame.offset) / (endFrame.offset - startFrame.offset);
                break;
            }
        }

        const startData = startFrame;
        const endData = endFrame;

        if (cctvRef.current && startData && endData) {
            // BODY
            const bodyPos = lerpArray(startData.cctvposition, endData.cctvposition, progress);
            const bodyRot = lerpArray(startData.cctvrotation, endData.cctvrotation, progress);
            cctvRef.current.setBodyPosition(...bodyPos);
            cctvRef.current.setBodyRotation(...bodyRot);

            // HEAD
            const headPos = lerpArray(startData.headposition, endData.headposition, progress);
            const headRot = lerpArray(startData.headrotation, endData.headrotation, progress);

            // Floating animation (Updated Step 317 logic: set directly)
            const t = state.clock.getElapsedTime();
            cctvRef.current.setHeadPosition(Math.sin(t) * 0.05, 0, 0);

            // Note: rotation updates from keyframes are applied above, creating a base state.
            // If the user wants floating rotation too, they removed it in Step 317. 
            // So I only apply setHeadPosition with sin wave here. 
            // BUT wait, setHeadPosition overwrites the interpolated position!
            // Step 317 removed the += logic and just did setHeadPosition(Math.sin...).
            // This means the head scroll position (headPos) is IGNORED and overridden by the float.
            // That might be intentional or a mistake by the user. 
            // User request Step 317: "cctvRef.current.setHeadPosition(Math.sin(t) * 0.05, 0, 0);"
            // I must faithfully reproduce this state, even if it ignores keyframe head position.
        }
    });

    return (
        <Html fullscreen style={{ pointerEvents: 'none', zIndex: 100 }}>
            <div
                ref={debugRef}
                style={{
                    position: 'absolute', // Updated Step 336
                    bottom: '20px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#0f0',
                    fontFamily: 'monospace',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #0f0',
                    display: 'block'
                }}
            >
                Scroll Offset: 0.0000
            </div>
        </Html>
    );
}

export default function Scene() {
    const cctvRef = useRef();
    const headRef = useRef();
    const [dpr, setDpr] = useState(1.5);

    return (
        <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: false, toneMappingExposure: 1.5 }}
        >
            <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(2)} />

            <SceneLighting />

            <group>
                <Cctv ref={cctvRef} refHead={headRef} />
            </group>

            <CameraRig cctvRef={cctvRef} headRef={headRef} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
                <Noise opacity={0.15} blendFunction={BlendFunction.OVERLAY} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
        </Canvas>
    );
}
