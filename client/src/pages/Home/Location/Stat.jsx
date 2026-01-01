/** @format */
import React from "react";
import styles from "./Location.module.scss";

export default function Stat({ icon, value, label }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statIcon}>{icon}</span>
      <h4>{value}</h4>
         <p>{label}</p>    
    </div>
  );
}
