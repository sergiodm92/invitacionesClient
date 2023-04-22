"use client";
import { useState } from "react";
import styles from "./navBar.module.css";

export default function NavBar({ start, where, assistance }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
      <nav className={`${styles.navbar} ${menuOpen ? styles.open : ""}`}>
        <button className={styles.menuButton} onClick={handleMenuClick}>
          <span className={styles.menuIcon} />
          <span className={styles.menuIcon} />
          <span className={styles.menuIcon} />
        </button>
        {menuOpen ? (
          <ul className={styles.menuOpen}>
            <li onClick={start}>Inicio</li>
            <li onClick={where}>Donde y cuando</li>
            <li onClick={assistance}>Confirmar Asistencia</li>
          </ul>
        ) : (
          <ul className={styles.menu}>
            <li onClick={start}>Inicio</li>
            <li onClick={where}>Donde y cuando</li>
            <li onClick={assistance}>Confirmar Asistencia</li>
          </ul>
        )}
      </nav>
  );
}
