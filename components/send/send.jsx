"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./send.module.css";
import { encrypted } from "../usefulFunctions/usefulFunctions";
import Loading from "../loading/loading";
import { IoRose } from "react-icons/io5";
import { GiAmpleDress } from "react-icons/gi";
import { FiHeart } from "react-icons/fi";

const Send = () => {
  let iconsArray = [IoRose, GiAmpleDress, FiHeart];

  const router = useRouter();

  const port = process.env.NEXT_PUBLIC_PORT;

  const link = "https://xv-invitation-front.vercel.app/";

  const [code, setCode] = useState("");
  const [guest1, setGuest1] = useState({});
  const [guest2, setGuest2] = useState({});
  const [allGuests, setAllGuest] = useState(["sin datos"]);
  const [guests, setGuests] = useState([]);
  const [family, setFamily] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % iconsArray.length); // Cambia de icono cada segundo
    }, 500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  //FUNCION PARA TRAER TODOS LOS INVITADOS
  const getGuests = async () => {
    await axios
      .get(`${port}/guest/all`)
      .then((response) => {
        setAllGuest(response.data);
        setFamily(response.data.filter((g) => g.amount_guests > 1));
        setGuests(response.data.filter((g) => g.amount_guests === 1));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const authenticated = window.sessionStorage.getItem("authenticated");
    if (!authenticated) {
      router.push("/");
    }
    getGuests();
  }, []);

  function handleSelectGuests(e) {
    setGuest1(guests[e.target.value]);
    setCode(
      encrypted(
        guests[e.target.value].lastname + " " + guests[e.target.value].firstname
      )
    );
  }
  function handleSelectFamily(e) {
    setGuest2(family[e.target.value]);
    setCode(
      encrypted(
        family[e.target.value].lastname + " " + family[e.target.value].firstname
      )
    );
  }

  const handleSubmitGuests = (e) => {
    e.preventDefault();
    router.push(
      `https://wa.me/${guest1.phone}?text=*¡Hola!* %0A*¡Quiero invitarte a mi fiesta de 15!* %0ALink: ${link} %0ACódigo: *${code}*`
    );
  };
  const handleSubmitFamily = (e) => {
    e.preventDefault();
    router.push(
      `https://wa.me/${guest2.phone}?text=*¡Hola!* %0A*¡Quiero invitarte a mi fiesta de 15!* %0ALink: ${link} %0ACódigo: *${code}*`
    );
  };

  return (
    <div>
      {allGuests[0] !== "sin datos" ? (
        <div>
          <div className={styles.container}>
            <form onSubmit={handleSubmitGuests} className={styles.form}>
              <div className={styles.inputWrapper}>
                <p>Seleccionar invitado:</p>
                <select
                  id="guest-select"
                  onChange={(e) => handleSelectGuests(e)}
                >
                  <option defaultValue>-</option>
                  {guests?.map((g, i) => (
                    <option key={g.id} value={i}>
                      {g.lastname} {g.firstname}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                Enviar Invitación
              </button>
            </form>
          </div>
          <div className={styles.container}>
            <form onSubmit={handleSubmitFamily} className={styles.form}>
              <div className={styles.inputWrapper}>
                <p>Seleccionar invitado (Familiar):</p>
                <select
                  id="guest-select"
                  onChange={(e) => handleSelectFamily(e)}
                >
                  <option defaultValue>-</option>
                  {family?.map((g, j) => (
                    <option key={g.id} value={j}>
                      {g.lastname} {g.firstname}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                Enviar Invitación
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Loading currentIndex={currentIndex} iconsArray={iconsArray} />
      )}
    </div>
  );
};

export default Send;
