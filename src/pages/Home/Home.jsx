import styles from "./Home.module.css";
import withLoading from "../componets/withLoading";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Cctv } from "./Cctv";
import { useEffect, useRef } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import logo from "../../assets/logo_w.png";

function CctvRotator() {
  const cctvRef = useRef();
  const cctvHeadRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (cctvHeadRef.current) {
      const x = ( mouse.x * viewport.width *0.1);
      const y = (-Math.PI / 2) +(mouse.y * viewport.width * 0.08);
      cctvHeadRef.current.rotation.z = Math.max(-2, Math.min(-1.2, y));
      cctvRef.current.rotation.y = Math.max(-0.8, Math.min(0.8, x)) ;
    }
  });

  return <Cctv ref={cctvRef} refHead={cctvHeadRef}/>;
}

function Home() {

  const camLightRef = useRef();
  const camRef = useRef();
  useEffect(() => {
    if (camLightRef.current && camRef.current) {
      // Set the position where the spotlight should look
      camRef.current.position.set(2, 1, 0)

      // Set the spotlight's target
      camLightRef.current.target = camRef.current

    }
  }, []);

  return (
    <Box className={styles.home} sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Navbar */}
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FORTIFIER
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Canvas 3D Scene */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
         
          <spotLight
            ref={camLightRef}
            position={[0, 0, 1.5]}
            angle={Math.PI / 4}
            penumbra={1}
            intensity={6}
            decay={2}
            castShadow
            color="red"
          />
          <CctvRotator ref={camRef} />
        </Canvas>
      </Box>

      {/* Overlay Content */}
     <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "5%",
    transform: "translateY(-50%)",
    zIndex: 2,
    color: "#fff",
    pointerEvents: "none", // 👈 this lets mouse events go to Canvas
  }}
>

        <img src={logo} alt="FORTIFIER Logo" style={{ height: 40, marginRight: 12 }} />
      </Box>
    </Box>
  );
}

export default withLoading(Home);
/*
 <spotLight
            position={[0, 0, 2.5]}
            angle={Math.PI / 6}
            penumbra={1}
            intensity={5}
            decay={2}
            castShadow
            color="red"
          />
  */