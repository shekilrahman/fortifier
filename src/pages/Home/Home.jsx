import styles from "./Home.module.css";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import withLoading from "../../components/withLoading";
import FullScene3D from "../../components/FullScene3D";

function Home() {
  return (
    <Box className={styles.home}>
      {/* Full 3D Scene */}
      <FullScene3D />

      {/* Minimal Navigation Overlay */}
      <AppBar position="fixed" className={styles.appBar} color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            FORTIFIER
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Link className={`${styles.navBtn}`} to="/about">
            About
          </Link>
          <Link className={`${styles.navBtn}`} to="/contact">
            Contact
          </Link>
        </Toolbar>
      </AppBar>

      {/* Scroll Indicator */}
      <Box className={styles.scrollIndicator}>
        <Typography variant="caption" sx={{ color: '#666', writingMode: 'vertical-rl' }}>
          SCROLL TO EXPLORE
        </Typography>
      </Box>
    </Box>
  );
}

export default withLoading(Home);
