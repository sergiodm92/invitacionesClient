'use client'
import React, { useState, useEffect } from "react";
import styles from './countDown.module.css'

const Countdown = ({ date }) => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Date.parse(date) - Date.parse(new Date());
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className={styles.container}>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <div className={styles.num}>{days}</div>
        <div className={styles.word}>días</div>
      </div>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <div className={styles.num}>{hours}</div>
        <div className={styles.word}>hs</div>
      </div>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <div className={styles.num}>{minutes}</div>
        <div className={styles.word}>min</div>
      </div>
      <div style={{display:"flex", flexDirection: "column", alignItems: "center"}}>
        <div className={styles.num}>{seconds}</div>
        <div className={styles.word}>seg</div>
      </div>
    </div>
  );
};

export default Countdown;