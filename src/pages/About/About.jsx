import styles from "./About.module.css";
import withLoading from "../componets/withLoading";

function About() {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <h1>About FORTIFIER</h1>
        <p>This is the about page content...</p>
      </div>
    </div>
  );
}

export default withLoading(About);