import styles from "./Header.module.css";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/";
  const isTestingPage = location.pathname === "/testing";
  const isVideoPage = location.pathname === "/video";

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li className={isLoginPage ? styles.active : ""}>Login</li>
        <li className={isTestingPage ? styles.active : ""}>Testing</li>
        <li className={isVideoPage ? styles.active : ""}>Video</li>
      </ul>
    </nav>
  );
}
