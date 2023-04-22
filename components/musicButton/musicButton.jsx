'use client'
import { useState, useRef, useEffect } from 'react';
import { Howl} from 'howler';
import styles from './musicButton.module.css';

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(true); // Cambiado a true
  const [currentPosition, setCurrentPosition] = useState(0);
  const sound = useRef(null);

  function toggleMusic() {
    setIsPlaying(prev => !prev); // Intercambia el valor de isPlaying

    if (!isPlaying) {
      sound.current = new Howl({
        src: ['/utils/Even If The Sky Is Falling Down - Candelion ft. Cara Dee.mp3'],
        onend: function() {
          setIsPlaying(false);
        },
        onload: function() {
          if (currentPosition > 0) {
            sound.current.seek(currentPosition);
          }
        }
      });
      sound.current.play();
    } else {
      setCurrentPosition(sound.current.seek());
      sound.current.pause();
    }
  }

  useEffect(() => {
    sound.current = new Howl({ // Agrega este bloque para reproducir la música al cargar
      src: ['/utils/Even If The Sky Is Falling Down - Candelion ft. Cara Dee.mp3'],
      onend: function() {
        setIsPlaying(false);
      },
      onload: function() {
        if (currentPosition > 0) {
          sound.current.seek(currentPosition);
        }
      }
    });
    sound.current.play();

    return () => {
      if (sound.current) {
        sound.current.pause();
      }
    };
  }, []);

  return (
    <div className={isPlaying ? styles.buttonOn : styles.buttonOff } onClick={toggleMusic}>
    </div>
  );
}

