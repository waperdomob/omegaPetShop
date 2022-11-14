import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { LoginUser } from '../../services/user';
import axiosInstance from '../../axios';

const Login = () => {
    //para redireccionar de un componente a otro
    const history = useNavigate();
    //definimos el estado inicial de las variables
    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const iniciarSesion = async () => {
        if (password.length < 6) {
            const msg = "La contraseña debe ser al menos de 6 caracteres.";
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
            );
        } else {
            const data = {
                email: usuario.email,
                password: usuario.password
            }
            
            try {
                await LoginUser({
                  email,
                  password
                }).then((res) => {
                  console.log(res);
                  localStorage.setItem("token", res.data.tokenSession);
                  localStorage.setItem("user", JSON.stringify(res.data.data));
          
                  axiosInstance.defaults.headers["Authorization"] =
                    localStorage.getItem("token");
                  history("/");
          
                  window.location.reload();
                });
              } catch (error) {
                alert("Credenciales erroneas");
                setTimeout(() => {
                  alert(null);
                }, 5000);
              }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar</b> Sesión</Link>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Bienvenido, ingrese sus datos</p>

                        <form onSubmit={onSubmit}>
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

                            <div className="social-auth-links text-center mb-3">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Ingresar
                                </button>
                                <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                                    Crear cuenta
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>

    );
}

export default Login;