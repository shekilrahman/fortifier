import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, ContactShadows, Float } from "@react-three/drei";
import { Cctv } from "./Cctv";
import ThreeText from "./ThreeText";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function CameraAndLightController({ cameraRef, spotlightRef, targetRef }) {
    useFrame((state) => {
        // Smoothly follow mouse with slight delay for cinematic feel
        if (spotlightRef.current && targetRef.current) {
            // Spotlight follows target exactly
            spotlightRef.current.target.position.lerp(targetRef.current.position, 0.1);
            spotlightRef.current.target.updateMatrixWorld();
        }
    });
    return null;
}

function CctvRotator() {
    const cctvBaseRef = useRef();
    const cctvHeadRef = useRef();
    const { mouse, viewport } = useThree();

    const [isMobile, setIsMobile] = useState(false);
    const [targetRotation, setTargetRotation] = useState({ y: 0, z: -1.6 }); // Default looking down/forward
    const [lastChangeTime, setLastChangeTime] = useState(0);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useFrame(({ clock }) => {
        const head = cctvHeadRef.current;
        const base = cctvBaseRef.current;
        if (!head || !base) return;

        const time = clock.getElapsedTime();

        if (isMobile) {
            // Random patrolling movement
            if (time - lastChangeTime > 2) {
                setTargetRotation({
                    y: Math.random() * 1.6 - 0.8,
                    z: -1.5 + Math.random() * 0.5,
                });
                setLastChangeTime(time);
            }
            base.rotation.y += (targetRotation.y - base.rotation.y) * 0.05;
            head.rotation.z += (targetRotation.z - head.rotation.z) * 0.05;
        } else {
            // Look at mouse
            const x = mouse.x * viewport.width * 0.2;
            const y = -Math.PI / 2 + (mouse.y * viewport.height * 0.2);

            // Smooth interpolation
            base.rotation.y = THREE.MathUtils.lerp(base.rotation.y, x, 0.1);
            head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, y, 0.1);
        }

        // Limits
        base.rotation.y = Math.max(-1.0, Math.min(1.0, base.rotation.y));
        head.rotation.z = Math.max(-2.2, Math.min(-1.0, head.rotation.z));
    });

    return <Cctv ref={cctvBaseRef} refHead={cctvHeadRef} scale={1.5} />;
}

export default function CCTVHero() {
    const spotlightRef = useRef();
    const targetRef = useRef();
    const cameraRef = useRef();
    const [mousePos, setMousePos] = useState([0, 0, 0]);

    return (
        <Canvas shadows dpr={[1, 2]} style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, background: '#111' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />

            {/* Cinematic Lighting */}
            <ambientLight intensity={0.5} color="#444" />
            <spotLight
                ref={spotlightRef}
                position={[5, 10, 5]}
                angle={0.3}
                penumbra={1}
                intensity={20}
                castShadow
                shadow-bias={-0.0001}
                color="#00ff88"
            />
            <pointLight position={[-10, -5, -10]} intensity={2} color="blue" />

            {/* Hero Content */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <CctvRotator />
            </Float>

            {/* 3D Text */}
            <ThreeText position={[0, 2, -2]} fontSize={1.5} color="#ffffff">
                FORTIFIER
            </ThreeText>
            <ThreeText position={[0, 1, -2]} fontSize={0.5} color="#aaaaaa">
                Total Security. Total Peace of Mind.
            </ThreeText>

            {/* Shadow */}
            <ContactShadows resolution={1024} scale={50} blur={2.5} opacity={0.5} far={10} color="#000000" />

            {/* Helper to track mouse for spotlight */}
            <mesh visible={false}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial />
            </mesh>
        </Canvas>
    );
}
