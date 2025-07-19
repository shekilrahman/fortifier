import styles from "./Home.module.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Cctv } from "./Cctv";
import { useRef, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import logo from "../../assets/logo_w.png";
import { Link } from "react-router-dom";
import withLoading from "../componets/withLoading";

// Controls spotlight and camera to follow target
function CameraAndLightController({ cameraRef, spotlightRef, targetRef }) {
  useFrame(() => {
    if (spotlightRef.current && targetRef.current) {
      spotlightRef.current.target.position.copy(targetRef.current.position);
    }
    if (cameraRef.current && targetRef.current) {
      cameraRef.current.lookAt(targetRef.current.position);
    }
  });
  return null;
}

// Handles CCTV movement (mobile: random, desktop: mouse tracking)
function CctvRotator() {
  const cctvBaseRef = useRef();
  const cctvHeadRef = useRef();
  const { mouse, viewport } = useThree();

  const [isMobile, setIsMobile] = useState(false);
  const [targetRotation, setTargetRotation] = useState({ y: 0, z: -1.6 });
  const [lastChangeTime, setLastChangeTime] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
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
      if (time - lastChangeTime > 1) {
        setTargetRotation({
          y: Math.random() * 1.6 - 0.8,
          z: -2 + Math.random() * 0.8,
        });
        setLastChangeTime(time);
      }

      base.rotation.y += (targetRotation.y - base.rotation.y) * 0.1;
      head.rotation.z += (targetRotation.z - head.rotation.z) * 0.1;
    } else {
      const x = mouse.x * viewport.width * 0.1;
      const y = -Math.PI / 2 + mouse.y * viewport.width * 0.08;

      base.rotation.y = x;
      head.rotation.z = y;
    }

    base.rotation.y = Math.max(-0.8, Math.min(0.8, base.rotation.y));
    head.rotation.z = Math.max(-2, Math.min(-1.2, head.rotation.z));
  });

  return <Cctv ref={cctvBaseRef} refHead={cctvHeadRef} />;
}

function Home() {
  const spotlightRef = useRef();
  const targetRef = useRef();
  const cameraRef = useRef();
  const [targetPos, setTargetPos] = useState([-1, 0, 0]);
  const [cameraPos, setCameraPos] = useState([0, 0, 6.5]);

  // Handle responsive position
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 900) {
        setTargetPos([0, 0, 0]);
        setCameraPos([0, 0, 10]);
      } else {
        setTargetPos([-1, 0, 0]);
        setCameraPos([0, 0, 6.5]);
      }
    };

    handleResize(); // set initial position
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box className={styles.home}>
      <Box className={styles.pageContainer}>
        {/* Navbar */}
        <AppBar>
          <Toolbar className={styles.appBar}>
            <Typography variant="h6" className={styles.title}>
              FORTIFIER
            </Typography>
            <Link className={`${styles.inter} ${styles.navBtn}`} to="/about">
              About
            </Link>
            <Link className={`${styles.inter} ${styles.navBtn}`} to="/contact">
              Contact
            </Link>
          </Toolbar>
        </AppBar>

        {/* Canvas */}
        <Box className={styles.canvasContainer}>
          <Canvas shadows>
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={cameraPos}
              fov={40}
            />
            <spotLight
              ref={spotlightRef}
              position={[0, 0, 2.5]}
              angle={Math.PI / 6}
              penumbra={1}
              intensity={5}
              decay={2}
              castShadow
              color="red"
            />
            <object3D ref={targetRef} position={targetPos} />
            <CameraAndLightController
              cameraRef={cameraRef}
              spotlightRef={spotlightRef}
              targetRef={targetRef}
            />
            <CctvRotator />
          </Canvas>
        </Box>

        {/* Logo Section */}
        <Box className={styles.logoContainer}>
          <img src={logo} alt="FORTIFIER Logo" className={styles.logoImage} />
        </Box>

        {/* Hero Section */}
        <Box className={styles.heroSection}>
          <Container>
            <Typography variant="h3" className={styles.heroTitle}>
              Total Security, Total Peace of Mind
            </Typography>
            <Typography variant="body1" className={styles.heroSubtitle}>
              Professional CCTV installation & smart surveillance systems for homes and businesses.
            </Typography>
            <Button variant="contained" className={styles.ctaBtn}>
              Get a Free Quote
            </Button>
          </Container>
        </Box>

        {/* Services Section */}
        <Box className={styles.servicesSection}>
          <Container>
            <Typography variant="h4" className={styles.sectionTitle}>
              Our Services
            </Typography>
            <Box className={styles.servicesGrid}>
              <Box className={styles.serviceCard}>
                <Typography variant="h6">Residential CCTV</Typography>
                <Typography variant="body2">Keep your home safe with smart, reliable surveillance.</Typography>
              </Box>
              <Box className={styles.serviceCard}>
                <Typography variant="h6">Commercial CCTV</Typography>
                <Typography variant="body2">Monitor your premises and deter threats 24/7.</Typography>
              </Box>
              <Box className={styles.serviceCard}>
                <Typography variant="h6">Remote Monitoring</Typography>
                <Typography variant="body2">Access footage from anywhere, anytime.</Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Testimonials */}
        <Box className={styles.testimonialsSection}>
          <Container>
            <Typography variant="h4" className={styles.sectionTitle}>
              What Our Clients Say
            </Typography>
            <Box className={styles.testimonialCard}>
              <Typography variant="body1">"Fortifier transformed our office security. Highly professional and responsive!"</Typography>
              <Typography variant="subtitle2">— Ramesh Kumar, Business Owner</Typography>
            </Box>
            <Box className={styles.testimonialCard}>
              <Typography variant="body1">"Top-notch installation. Friendly team and great support."</Typography>
              <Typography variant="subtitle2">— Anita Sharma, Homeowner</Typography>
            </Box>
          </Container>
        </Box>

        {/* Footer */}
        <Box className={styles.footer}>
          <Container>
            <Typography variant="body2" align="center">
              &copy; {new Date().getFullYear()} Fortifier Security Solutions. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default withLoading(Home);
