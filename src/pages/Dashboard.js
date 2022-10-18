import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MdCamera } from "react-icons/md";
import styles from "../styles/pages/Dashboard.module.css";

const Dashboard = () => {
  const { user } = useOutletContext();

  return (
    <>
      <Helmet>
        <title>App - Shotz</title>
      </Helmet>
      <div className={styles.dash_con}>
        <div className={styles.main_con}>
          <div className={styles.header}>
            <h2>Shotz</h2>
            <span>Capture beautiful pictures of website</span>
          </div>
          <div className={styles.input_con}>
            <input type="url" placeholder="Enter website url" />
            <div className={styles.features_con}>
              <div className={styles.feature}>
                <label>Browser Size</label>
                <div className={styles.size_con}>
                  <input type="number" placeholder="Width" />
                  <input type="number" placeholder="Height" />
                </div>
              </div>
              <div className={styles.feature}>
                <label>File type</label>
                <div className={styles.select_con}>
                  <select id="file_type" name="Type">
                    <option value="png">png</option>
                    <option value="jpg">jpeg</option>
                    <option value="webp">webp</option>
                  </select>
                </div>
              </div>
              <div className={styles.feature}>
                <label>Options</label>
                <div className={styles.option_con}>
                  <div className={styles.check_con}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Block Ads</span>
                  </div>
                  <div className={styles.check_con}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>No-cookies</span>
                  </div>
                  <div className={styles.check_con}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Dark mode</span>
                  </div>
                  <div className={styles.check_con}>
                    <input type="checkbox" className={styles.checkbox} />
                    <span>Retina</span>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.btn}>
              Take a shot
              <MdCamera className={styles.shot} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
