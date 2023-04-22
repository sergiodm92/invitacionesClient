'use client'
import styles from './whereButton.module.css';

export default function WhereButton({title, click}) {
  
  return (
    <div className={styles.button} onClick={click}>
        <p>{title}</p>
    </div>
  );
}
