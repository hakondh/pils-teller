import React from 'react'
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.LdsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
