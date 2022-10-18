import styles from "../styles/components/Layout.module.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { MdCamera } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import {AiOutlineGoogle} from "react-icons/ai"
import { useUserData } from "@nhost/react";
import { useCallback } from "react";
import { useSignOut } from "@nhost/react";

import Avatar from "./Avatar";

const Layout = ({ nhost }) => {
  const user = useUserData();
  const navigate = useNavigate();
  const { signOut } = useSignOut();

  const onLogout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);
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
          {user ? (
            <div className={styles.user}>
              <Avatar src={user?.avatarUrl} alt={user?.displayName} />
              <button onClick={onLogout}>
                <IoLogOutOutline />
              </button>
            </div>
          ) : (
            <div className={styles.auth_con} onClick={handleGoogleSignIn}>
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
