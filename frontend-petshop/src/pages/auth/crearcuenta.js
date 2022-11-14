import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import axios from "axios"
import { AVISO, URL_BASE } from "../../config/constans"

const CrearCuenta = () => {

  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()

    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido:"",
        tipoDoc:"",
        numDoc:0,
        email: "",
        password: "",
        confirmar: "",
    });

    const { nombre, apellido, tipoDoc, numDoc, email, password, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const crearCuenta = async () => {

        if (password !== confirmar) {
            const msg = "Las contraseñas no coinciden.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confrim: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        classname: 'btn btn-danger',
                        closeModal: true
                    }
                }
            }
            )
        } else if (password.length < 6) {
            const msg = "La contraseña debe tener mas de 6 caracteres.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confrim: {
                        text: 'ok',
                        value: true,
                        visible: true,
                        classname: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });

        } else {
            const data = {
                tipoDoc: usuario.tipoDoc,
                numeroDoc: usuario.numDoc,
                name: {nombre: usuario.nombre, apellido: usuario.apellido},
                email: usuario.email,
                password: usuario.password
            }
            console.log(data);
            axios.post(URL_BASE + "/usuario", data)
              .then((res) => {
                console.log(res)
                AVISO.fire({ icon: "success", text: "Se registro el usuario" })
                navigate("/login")
              })
              .catch((err) => {
                console.error(err)
                const { mensaje } = err.response.data
                if (mensaje) AVISO.fire({ icon: "error", text: mensaje })
              })

        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Crear</b> Cuenta</Link>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Ingrese los datos del usuario</p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    id="nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    id="apellido"
                                    name="apellido"
                                    value={apellido}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Tipo de documento 'CC, NIT'"
                                    id="tipoDoc"
                                    name="tipoDoc"
                                    value={tipoDoc}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="number"
                                    className="form-control"
                                    placeholder="Número de documento "
                                    id="numDoc"
                                    name="numDoc"
                                    value={numDoc}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input type="password"
                                    className="form-control"
                                    placeholder="Confirmar contraseña"
                                    id="confirmar"
                                    name="confirmar"
                                    value={confirmar}
                                    onChange={onChange}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="social-auth-links text-center mb-3">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Crear cuenta
                                </button>
                                <Link to={"/"} className="btn btn-block btn-danger">
                                    Regresar al login
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>

    );

}
export default CrearCuenta;