import styles from "./style.module.scss";
import React from "react";


const Empty = ({ image, label }) => (
  <div className={styles.Empty}>
    <div className={styles.Image}>
      {image()}
    </div>
    <div className={styles.Label}>
      {label()}
    </div>
  </div>
);

export default Empty;