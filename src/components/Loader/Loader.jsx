import BeatLoader from 'react-spinners/BeatLoader';
import styles from './styles.module.css';

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <BeatLoader size={15} color={'#3f51b5'} className={styles.loader} />
    </div>
  );
}
