"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./formLogin.module.css";
import { Match, createToast } from "../usefulFunctions/usefulFunctions";
import axios from "axios";
import Loading from "../loading/loading";
import { IoRose } from 'react-icons/io5';
import { GiAmpleDress } from 'react-icons/gi';
import { FiHeart } from 'react-icons/fi';


const guestForm = {
  code: "",
};

const FormLogin = () => {


  let iconsArray = [IoRose,GiAmpleDress,FiHeart];
  
  const port = process.env.NEXT_PUBLIC_PORT;

  const router = useRouter();

  const [form, setForm] = useState(guestForm);
  const [allGuests, setAllGuest] = useState(["sin datos"]);
  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % iconsArray.length) // Cambia de icono cada segundo
    }, 500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  
  useEffect(() => {
    setTimeout(()=>{
      getGuests();
    }, 2000)
    
 }, []);


  const getGuests = async () => {
    await axios
      .get(`${port}/guest/all`)
      .then((response) => {
        setAllGuest(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.code === "house1387") {
      window.sessionStorage.setItem("authenticated", true);
      router.push("/createGuests");
      createToast(
        "success",
        "Bienvenido Eusebio"
      );
    } else if (form.code === "xvgiovaM") {
      window.sessionStorage.setItem("authenticated", true);
      router.push("/createGuests");
      createToast(
        "success",
        "Bienvenida Giova"
      );
    } else if (Match(allGuests, form.code)[0]) {
      let guestName = Match(allGuests, form.code)[1];
      window.sessionStorage.setItem("authenticated", true);
      router.push(`/invitation/${guestName}`);
      createToast("success", "Bienvenido " + guestName);
    } else {
      createToast("error", "Código incorrecto");
    }
  };

  return (
    <div>
      {allGuests[0] !== "sin datos" ? (
        <div className={styles.container}>
          <div className={styles.whiteFlower}></div>
          <div className={styles.whiteButerfly}></div>
          <h1 className={styles.title}>
            Ingresa el Código para ver la invitación de Giovana:{" "}
          </h1>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>
              Código:
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={styles.showPasswordButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🐵" : "🙈"}
                </button>
              </div>
            </label>
            <button type="submit" className={styles.submitButton}>
              Ingresar
            </button>
          </form>
        </div>
      ) : (
        <Loading currentIndex={currentIndex} iconsArray={iconsArray}/>
      )}
    </div>
  );
};

export default FormLogin;
