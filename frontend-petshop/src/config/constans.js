import Swal from "sweetalert2"
import JwtDecode from "jwt-decode"


export const URL_BASE = "http://localhost:3001" //DESARROLLO
//export const URL_BASE = "https://misiontic-u37-tienda-mascotas.herokuapp.com" //PRODUCCION

export const AVISO = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const payload = (sessionStorage.getItem("token")) ? JwtDecode(sessionStorage.getItem("token")) : {}
