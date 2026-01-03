import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, ScrollControls, useScroll, Float, Text, Sparkles } from "@react-three/drei";
import { Cctv } from "./Cctv";
import { useRef, useState } from "react";
import * as THREE from "three";

// Dynamic lighting component with smooth transitions
function DynamicSpotlight({ targetPosition, scrollOffset }) {
    const spotlightRef = useRef();

    useFrame(() => {
        if (spotlightRef.current && targetPosition) {
            // Smoothly interpolate light offset based on scroll
            const transitionFactor = Math.sin(scrollOffset * Math.PI);

            let lightOffsetX = THREE.MathUtils.lerp(0, 4, transitionFactor);
            let lightOffsetY = THREE.MathUtils.lerp(6, 4, transitionFactor);
            let lightOffsetZ = THREE.MathUtils.lerp(4, 8, transitionFactor);

            const lightPos = new THREE.Vector3(
                targetPosition.x + lightOffsetX,
                targetPosition.y + lightOffsetY,
                targetPosition.z + lightOffsetZ
            );

            spotlightRef.current.position.lerp(lightPos, 0.1);
            spotlightRef.current.target.position.copy(targetPosition);
            spotlightRef.current.target.updateMatrixWorld();
        }
    });

    return (
        <spotLight
            ref={spotlightRef}
            position={[0, 8, 3]}
            angle={0.5}
            penumbra={0.9}
            intensity={25}
            castShadow
            color="#ff0000"
            distance={50}
            shadow-bias={-0.0001}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    );
}

// Scene Controller: Continuously interpolates CCTV and Text for SMOOTH movement
function ScrollSceneRig({ children, onCCTVPositionUpdate }) {
    const scroll = useScroll();
    const cctvGroupRef = useRef();
    const contentGroupRef = useRef();

    const targetCCTVPos = useRef(new THREE.Vector3(0, 0, 0));
    const targetCCTVRot = useRef(new THREE.Euler(0, 0, 0));

    useFrame(() => {
        const offset = scroll.offset; // 0 to 1

        // 1. Smooth Text movement
        if (contentGroupRef.current) {
            contentGroupRef.current.position.y = offset * 42;
        }

        // 2. CONTINUOUS interpolation for CCTV (no sudden jumps!)
        if (offset < 0.3) {
            // Transition from Center to Left
            const t = offset / 0.3;
            targetCCTVPos.current.set(
                THREE.MathUtils.lerp(0, -6, t),
                THREE.MathUtils.lerp(0, 0.5, t),
                THREE.MathUtils.lerp(0, 1.5, t)
            );
            targetCCTVRot.current.set(
                0,
                THREE.MathUtils.lerp(0, Math.PI / 3.5, t),
                0
            );
        } else if (offset < 0.6) {
            // Transition from Left to Top-Left (CEILING MOUNTED - UPSIDE DOWN!)
            const t = (offset - 0.3) / 0.3;
            targetCCTVPos.current.set(
                THREE.MathUtils.lerp(-6, -5, t),
                THREE.MathUtils.lerp(0.5, 6, t),
                THREE.MathUtils.lerp(1.5, 1.5, t)
            );
            // CRITICAL: Flip to upside down (Math.PI on X) for ceiling mount
            targetCCTVRot.current.set(
                THREE.MathUtils.lerp(0, Math.PI - 0.4, t), // Math.PI = upside down!
                THREE.MathUtils.lerp(Math.PI / 3.5, Math.PI / 3.2, t), // Angle toward center
                0
            );
        } else if (offset < 0.85) {
            // Transition from Top-Left to Top-Center
            const t = (offset - 0.6) / 0.25;
            targetCCTVPos.current.set(
                THREE.MathUtils.lerp(-5, 0, t),
                THREE.MathUtils.lerp(6, 5.5, t),
                THREE.MathUtils.lerp(1.5, 0, t)
            );
            targetCCTVRot.current.set(
                THREE.MathUtils.lerp(Math.PI - 0.4, -Math.PI / 2.3, t),
                THREE.MathUtils.lerp(Math.PI / 3.2, 0, t),
                0
            );
        } else {
            // Final Pose
            targetCCTVPos.current.set(0, 5.5, 0);
            targetCCTVRot.current.set(-Math.PI / 2.3, 0, 0);
        }

        if (cctvGroupRef.current) {
            // Gentle lerp for ultra-smooth movement
            cctvGroupRef.current.position.lerp(targetCCTVPos.current, 0.08);

            // Use Quaternion slerp for perfect rotation transitions (no gimbal lock!)
            const targetQuaternion = new THREE.Quaternion().setFromEuler(targetCCTVRot.current);
            cctvGroupRef.current.quaternion.slerp(targetQuaternion, 0.08);

            if (onCCTVPositionUpdate) {
                onCCTVPositionUpdate(cctvGroupRef.current.position, offset);
            }
        }
    });

    return (
        <>
            <group ref={cctvGroupRef}>
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
                    <AutomatedCCTV />
                </Float>
            </group>

            <group ref={contentGroupRef}>
                {children}
            </group>
        </>
    );
}

// Automated CCTV movement (internal parts)
function AutomatedCCTV() {
    const cctvBaseRef = useRef();
    const cctvHeadRef = useRef();
    const scroll = useScroll();

    useFrame(({ clock }) => {
        const head = cctvHeadRef.current;
        const base = cctvBaseRef.current;
        if (!head || !base) return;

        const time = clock.getElapsedTime();
        const scrollOffset = scroll.offset;

        // Dynamic internal animations
        if (scrollOffset < 0.3) {
            base.rotation.y = Math.sin(time * 0.3) * 0.4;
            head.rotation.z = -1.6 + Math.cos(time * 0.25) * 0.2;
        } else if (scrollOffset < 0.6) {
            base.rotation.y = Math.sin(time * 0.5) * 0.2;
            head.rotation.z = -1.6 + Math.cos(time * 0.4) * 0.1;
        } else {
            base.rotation.y = Math.sin(time * 0.4) * 0.3;
            head.rotation.z = -1.65;
        }
    });

    return <Cctv ref={cctvBaseRef} refHead={cctvHeadRef} scale={2.5} castShadow receiveShadow />;
}

// 3D Text Components
function Title3D({ position, children, size = 1, color = "#00ff88" }) {
    return (
        <Text
            position={position}
            fontSize={size}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Orbitron-Bold.ttf"
            outlineWidth={0.015}
            outlineColor="#000000"
        >
            {children}
        </Text>
    );
}

function ContentSection({ position, title, items }) {
    return (
        <group position={position}>
            <Text
                position={[0, 1.5, 0]}
                fontSize={0.6}
                color="#ff0000"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Orbitron-Bold.ttf"
                outlineWidth={0.01}
                outlineColor="#000000"
            >
                {title}
            </Text>
            {items.map((item, i) => (
                <Text
                    key={i}
                    position={[0, 0.5 - i * 0.5, 0]}
                    fontSize={0.3}
                    color="#999999"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={6}
                >
                    {item}
                </Text>
            ))}
        </group>
    );
}

export default function FullScene3D() {
    const [cctvPosition, setCctvPosition] = useState(new THREE.Vector3(0, 0, 0));
    const [scrollOffset, setScrollOffset] = useState(0);

    const handleCCTVUpdate = (position, offset) => {
        setCctvPosition(position);
        setScrollOffset(offset);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
            <Canvas shadows dpr={[1, 2]} style={{ background: 'radial-gradient(circle at center, #110000 0%, #000000 100%)' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={45} />

                <ScrollControls pages={4} damping={0.3}>
                    {/* Static Environment Lights */}
                    <ambientLight intensity={0.05} color="#0a0a0a" />
                    <pointLight position={[-10, 5, 5]} intensity={0.5} color="#ff0000" distance={30} />
                    <pointLight position={[10, -5, -5]} intensity={0.3} color="#550000" distance={30} />

                    {/* Dynamic Spotlight with scroll-aware positioning */}
                    <DynamicSpotlight targetPosition={cctvPosition} scrollOffset={scrollOffset} />

                    {/* Scene Rig moves Text and CCTV */}
                    <ScrollSceneRig onCCTVPositionUpdate={handleCCTVUpdate}>

                        <Sparkles count={40} scale={20} size={1.5} speed={0.2} opacity={0.2} color="#ff0000" />

                        {/* Content Sections */}
                        <group position={[0, 0, -2]}>
                            <Title3D position={[0, 3.5, 0]} size={1.5} color="#ff0000">FORTIFIER</Title3D>
                            <Title3D position={[0, 2.5, 0]} size={0.5} color="#cccccc">Total Security. Total Peace.</Title3D>
                        </group>

                        <ContentSection
                            position={[0, -14, -2]}
                            title="SURVEILLANCE TECH"
                            items={["• 360° Coverage", "• Night Vision", "• Motion Detection", "• Real-time Alerts"]}
                        />

                        <ContentSection
                            position={[4, -28, -2]}
                            title="OUR SERVICES"
                            items={["• Residential CCTV", "• Commercial Security", "• AI Analytics", "• Cloud Storage"]}
                        />

                        <ContentSection
                            position={[0, -42, -2]}
                            title="TRUSTED BY EXPERTS"
                            items={['"The 3D tracking is incredible!"', "- Sarah Jenkins, CTO"]}
                        />
                    </ScrollSceneRig>

                </ScrollControls>
            </Canvas>
        </div>
    );
}
