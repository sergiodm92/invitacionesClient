import Swal from "sweetalert2";
const port = process.env.NEXT_PUBLIC_PORT;
const crypto = require('crypto');

//FUNCION PARA ENCRIPTAR NOMBRE
export const encrypted = (name) => {
  const hash = crypto.createHash('md5').update(name).digest('hex').slice(0, 10);
  return hash;
};


//FUNCION PARA COMPARAR NOMBRE CON EL CÓDIGO
export const compare = (firstname, lastname, enc) => {
  return (encrypted(lastname+" "+firstname) === enc);
};

//FUNCION QUE RECORRE LA LISTA DE NOMBRE Y LOS COMPARA CON EL CÓDIGO INGRESADO
export function Match(guests, encrypt) {
  let state = false
  let name
  guests?.forEach((guest) => {
    if (compare(guest.firstname, guest.lastname, encrypt)) {
      state = true
      name = guest.lastname +" "+ guest.firstname
    }
  });
  return [state, name];
}

//FUNCION PARA EJECUTAR EL SWEETALERT
export const createToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toast.fire({
    icon,
    title,
  });
};

//FUNCION QUE PERMITE PASAR PARAMETROS POR QUERY (puede estar en cualquier lugar, pero tiene que estar)
export async function getServerSideProps(context) {
  const { name } = context.query;
  const response = await fetch(`${port}/guests/${name}`);
  const guest = response.data;
  return {
    props: { guest },
  };
}