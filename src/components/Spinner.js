import styles from '../styles/components/Spinner.module.css';

const Spinner = () => (
  <div class={styles.lds_ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
