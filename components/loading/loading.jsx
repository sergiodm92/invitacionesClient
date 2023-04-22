
'use client'
import styles from './loading.module.css'


const Loading = ({currentIndex, iconsArray}) => {

 

  return (
    <div className={styles.loading}>
      {iconsArray.map((Icon, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={index}
            className={isActive ? styles.loadingIconActive : styles.loadingIcon}
          >
            <Icon size={50} />
          </div>
        );
      })}
    </div>
  );
};

export default Loading;
