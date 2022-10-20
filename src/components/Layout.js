import styles from "../styles/components/Layout.module.css";
import {
  Outlet,
  Link,
  useNavigate,
  NavLink,
  useLocation,
} from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineGoogle } from "react-icons/ai";
import { useUserData } from "@nhost/react";
import { useCallback } from "react";
import { useSignOut } from "@nhost/react";
import { useAuthenticationStatus } from "@nhost/react";

import Avatar from "./Avatar";

const Layout = ({ nhost }) => {
  const user = useUserData();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticationStatus();
  const location = useLocation();
  const { signOut } = useSignOut();

  const onLogout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);

  if (location.pathname === "/mycollection") {
    if (!isAuthenticated) {
      return navigate("/", { replace: true });
    }
  }

  const handleGoogleSignIn = () => {
    nhost.auth.signIn({
      provider: "google",
    });
  };
  return (
    <div>
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.left}>
            <span>
              <MdCamera />
            </span>
            <p>Shotz</p>
          </div>
        </Link>
        <div className={styles.right}>
          {isAuthenticated ? (
            <div className={styles.user}>
              <Avatar src={user?.avatarUrl} alt={user?.displayName} />
              <NavLink to="/mycollection" className={styles.my}>
                My Collection
              </NavLink>
              <button onClick={() => onLogout()}>
                <IoLogOutOutline />
              </button>
            </div>
          ) : (
            <div
              className={styles.auth_con}
              onClick={() => handleGoogleSignIn()}
            >
              <button>
                <AiOutlineGoogle />
              </button>
              <p>Login</p>
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles["main-container"]}>
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
