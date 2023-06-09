import React from "react";
import styles from './styles.module.css';
const Loader = () => {
  return (
    <div className={styles["loaderContainer"]}>
    <div className={styles["spinner"]}>
      <div className={styles["bounce1"]}></div>
      <div className={styles["bounce2"]}></div>
      <div className={styles["bounce3"]}></div>
    </div>
    </div>
  );
};


export default Loader;
