"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Countdown from "../../components/countDown/countDown";
import Music from "../../components/musicButton/musicButton";
import styles from "./invitationProtected.module.css";
import NavBar from "../navBar/navBar";
import WhereButton from "../whereButton/whereButton";
import axios from "axios";
import Swal from "sweetalert2";
import { createToast } from "../usefulFunctions/usefulFunctions";
import Footer from "../footer/footer";

const InvitationProtected = ({ name }) => {
  const port = process.env.NEXT_PUBLIC_PORT;

  let closingDate = new Date("2023-04-25").getTime();
  let currentDate = new Date().getTime();

  const guestName = name.replaceAll("%20", " ");

  const router = useRouter();

  const start = useRef(null);
  const where = useRef(null);
  const assistance = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [guest, setGuest] = useState({});

  useEffect(() => {
    const authenticated = window.sessionStorage.getItem("authenticated");
    if (!authenticated) {
      router.push("/");
    }
    if (name !== "demo") getGuest();
    if (name == "demo")
      setGuest({
        firstname: "Nombre",
        lastname: "del Invitado",
        amount_guests: 2,
      });
  }, []);

  const getGuest = async () => {
    await axios
      .get(`${port}/guest/name/${guestName}`)
      .then((response) => {
        setGuest(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const edithGuest = async (obj) => {
    await axios.put(`${port}/guest/`, obj).catch((error) => {
      console.error(error);
    });
  };

  const handleAttend = () => {
    if (currentDate <= closingDate) {
      Swal.fire({
        html: `
      <div>
      <h1 style="font-size: 17px;">Confirmar asistencia</h1>
      <p>Confirma cuántos asistiran</p>
      <select id="guest-select" class="swal2-input" style="font-size: 15px;">
        ${(() => {
          let options = "";
          for (let i = 1; i <= guest.amount_guests; i++) {
            options += `<option value="${i}">${i}</option>`;
          }
          return options;
        })()}
      </select>
    </div>
      `,
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e7c6c6",
        cancelButtonColor: "#c7b6d7",
      })
        .then((result) => {
          if (result.isConfirmed) {
            const selectedGuests =
              document.getElementById("guest-select").value;
            const obj2 = {
              firstname: guest.firstname,
              lastname: guest.lastname,
              state: "Asistiré",
              amount_guests: guest.amount_guests,
              amount_confirm: selectedGuests,
              phone: guest.phone,
            };
            edithGuest(obj2).then(() => {
              createToast("success", "Se confirmó asistencia correctamente");
            });
          }
        })
        .catch(() => {
          createToast("error", "No se pudo confimar, intente nuevamente.");
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Lo siento!",
        text: "Ya paso la fecha límite para confirmar",
        footer: "<a>Comunicate a mi wpp</a>",
      });
    }
  };

  const handleNotAttend = () => {
    if (currentDate <= closingDate) {
      Swal.fire({
        title: "¿Seguro?",
        text: "Estas por confirmar que NO vendras a mi fiesta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Estoy seguro",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#e7c6c6",
        cancelButtonColor: "#c7b6d7",
      }).then((result) => {
        if (result.isConfirmed) {
          const obj = {
            firstname: guest.firstname,
            lastname: guest.lastname,
            state: "No asistiré",
            amount_guests: guest.amount_guests,
            amount_confirm: 0,
            phone: guest.phone,
          };
          edithGuest(obj);
          createToast(
            "success",
            "¡Listo! si cambias de opinion puedes confirmar asistencia antes de la fecha limite."
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          createToast(
            "error",
            "¡Cancelado! Por favor, confira que si vendras a mi fiesta..."
          );
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "¡Lo siento!",
        text: "Ya paso la fecha límite para confirmar",
        footer: "<a>Comunicate a mi wpp</a>",
      });
    }
  };

  const scheduleEvent = () => {
    const startTime = "20230429T210000";
    const endTime = "20230430T050000";
    const eventName = encodeURIComponent("15 años Giovana");
    const eventDescription = encodeURIComponent(
      "Fiesta de 15 años de Giovana Mendez"
    );
    const eventLocation = encodeURIComponent(
      "https://www.google.com/maps/place/Salon+Vallejos+Eventos/@-23.1387456,-64.3309091,17z/data=!3m1!4b1!4m6!3m5!1s0x940ff5fa7d31adaf:0xe51df841fd5caad!8m2!3d-23.1387506!4d-64.3283342!16s%2Fg%2F11f29y22x7"
    );
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startTime}/${endTime}&ctz=America/Argentina/Buenos_Aires&details=${eventDescription}&location=${eventLocation}&sf=true&output=xml`;

    window.open(googleCalendarUrl, "_blank");
  };

  // Si el usuario está autenticado, mostrar el contenido de la página
  return (
    <div className={styles.container}>
      <NavBar
        start={() => scrollToSection(start)}
        where={() => scrollToSection(where)}
        assistance={() => scrollToSection(assistance)}
      />
      <section ref={start} className={styles.firstPage}>
        <div>
          <div className={styles.leftLine}></div>
          <p className={styles.date}>29.04.2023</p>
          <div className={styles.rightLine}></div>
        </div>
        <div className={styles.centralDiv}>
          <h1 className={styles.firstname}>Giovana</h1>
          <p className={styles.caption}>Mis 15 años</p>
        </div>
        <div>
          <div>
            <p className={styles.quotationMark}>‘‘</p>
          </div>
          <div>
            <p className={styles.sentence}>
              Hay momentos en la vida que son irrepetibles, pero compartirlos
              con las personas que más querés los hace inolvidables
            </p>
          </div>
          <div>
            <p className={styles.quotationMark}>’’</p>
          </div>
        </div>
      </section>

      <div className={styles.counter}>
        <div className={styles.flower1}></div>
        <div className={styles.buterfly1}></div>
        <div className={styles.countBack}>
          <Countdown date="2023-04-30T01:00:00.000Z" />
        </div>
        <div className={styles.codeBack}>
          <div className={styles.dressCode}>
            <div className={styles.dressTitle}>Dress Code</div>
            <div className={styles.bun}></div>
            <div className={styles.code}>Gala</div>
          </div>
        </div>
      </div>
      <section ref={where} className={styles.where}>
        <div className={styles.title}>Fiesta</div>
        <div className={styles.sec}>
          <div className={styles.subtitle}>Día</div>
          <div className={styles.text}>Sábado 29 de abril - 22hs</div>
          <WhereButton title={"AGENDAR"} click={scheduleEvent} />
        </div>
        <div className={styles.sec}>
          <div className={styles.subtitle}>Lugar</div>
          <div className={styles.text}>Salón Vallejos Eventos</div>
          <WhereButton
            title={"¿CÓMO LLEGAR?"}
            click={() =>
              router.push(
                "https://www.google.com/maps/place/Salon+Vallejos+Eventos/@-23.1387456,-64.3309091,17z/data=!3m1!4b1!4m6!3m5!1s0x940ff5fa7d31adaf:0xe51df841fd5caad!8m2!3d-23.1387506!4d-64.3283342!16s%2Fg%2F11f29y22x7"
              )
            }
          />
        </div>
      </section>
      <section ref={assistance} className={styles.confirm}>
        <div className={styles.guestTitle}>Datos del invitado</div>
        <div className={styles.guest}>
          <div className={styles.guestName}>
            {guest.firstname} {guest.lastname}
          </div>
          <div
            className={styles.guestAmount}
          >{`Invitación válida para ${guest.amount_guests} personas`}</div>
        </div>
        <WhereButton title={"CONFIRMAR ASISTENCIA"} click={handleAttend} />
        <div>{"(Confirmar antes del 25/04/2023)"}</div>
        <WhereButton title={"No Asistiré"} click={handleNotAttend} />
      </section>
      <Music />
      <Footer />
    </div>
  );
};

export default InvitationProtected;
