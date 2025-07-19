import styles from './Contact.module.css'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h1>Contact Us</h1>
      <p>Email: support@example.com</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}
