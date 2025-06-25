import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Routes";

export const Header = () => (
  <header>
    <nav>
      <div className={styles.navbar}>
        <p className={styles.logo}>Login</p>
        <ul>
          <Link to={ROUTES.HOME}>Home</Link>
        </ul>
      </div>
    </nav>
  </header>
);
