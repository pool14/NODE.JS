import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmar) {
      const msg = "Las contraseñas son diferentes";
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else if (password.length < 6) {
      const msg = "La contraseña debe tener al menos 6 caracteres";
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {
      // Verificar si el correo electrónico ya está registrado
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        // El correo electrónico ya está registrado, muestra una alerta de error
        swal({
          title: 'Error',
          text: 'El correo electrónico ya está registrado.',
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        // El correo electrónico no está registrado, puedes continuar con la creación de la cuenta
        const data = {
          nombre: usuario.nombre,
          email: usuario.email,
          password: usuario.password
        };
        const response = await APIInvoke.invokePOST('/Usuarios', data);
        const mensaje = response.msg;
      
        if (mensaje === 'El correo electrónico ya está registrado.') {
          // Manejar la situación si ocurre un error inesperado
          console.log("Error inesperado:", mensaje);
        } else {
          // El usuario fue creado correctamente
          swal({
            title: 'Información',
            text: 'El usuario fue creado correctamente.',
            icon: 'success',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });
          setUsuario({
            nombre: '',
            email: '',
            password: '',
            confirmar: ''
          })
        }
      }
    }
  }

  // Función para verificar si el correo electrónico ya está registrado
  const checkEmailExists = async (email) => {
    try {
      const response = await APIInvoke.invokeGET(`/Usuarios?email=${email}`);
      return response.length > 0;
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return false;
    }
  }

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="#">
            <b>Crear</b> Cuenta
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Ingrese los datos del usuario</p>
              

              <div className="input-group mb-3">
                <input
                  type="text"
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
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
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
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
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
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmar Contraseña"
                  id="confirmar"
                  name="confirmar"
                  value={confirmar}
                  onChange={onChange}                  
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>


              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Crear Cuenta
                </button>
                <Link to={"/"} className="btn btn-block btn-danger">
                  Regresar al login
                </Link>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CrearCuenta;
