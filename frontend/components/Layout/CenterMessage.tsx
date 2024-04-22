import styles from './CenterMessage.module.scss';

const CenteredMessage = ({ message }) => (
    <div className={styles.centeredContainer}>
      <div className={styles.message}>{message}</div>
    </div>
  );

export default CenteredMessage;