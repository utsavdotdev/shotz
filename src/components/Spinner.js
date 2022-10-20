import styles from '../styles/components/Spinner.module.css';

const Spinner = () => (
  <div className={styles.lds_ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
