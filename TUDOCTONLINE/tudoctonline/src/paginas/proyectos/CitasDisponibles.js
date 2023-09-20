import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import SidebarContainer from "../../componentes/SidebarContainer";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import Navbar from "../../componentes/Navbar";

const CitasDisponibles = () => {
  const [citas, setCitas] = useState([]);
  const [numeroCita, setNumeroCita] = useState(""); 
  const usuarioAutenticado = getUsuarioAutenticado();

  function getUsuarioAutenticado() {
    return {
      id: 1,
      nombre: "Usuario de Ejemplo",
      email: "ejemplo@example.com",
    };
  }

  const cargarCitas = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Citas`);
      console.log("Respuesta de la API:", response);

      if (Array.isArray(response)) {
        setCitas(response);
        console.log("Citas disponibles:", response);
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar las citas disponibles:", error);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const agendarCita = async (e, idCita) => {
    e.preventDefault();

    if (!usuarioAutenticado) {
      swal({
        title: "Error",
        text: "Debes iniciar sesión para agendar una cita.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (numeroCita === "") {
      swal({
        title: "Error",
        text: "Debes ingresar el número de la autorizacion que deseas agendar.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
      return;
    }

    try {
      const response = await APIInvoke.invokePOST(`/AgendarCita/${idCita}`, {
        usuarioId: usuarioAutenticado.id,
        numeroCita: numeroCita, 
      });

      if (response) {
        const updatedCitas = citas.filter((cita) => cita.id !== idCita);
        setCitas(updatedCitas);

        swal({
          title: "Información",
          text: "La cita se agendó con éxito.",
          icon: "success",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-primary",
              closeModal: true,
            },
          },
        });
        setNumeroCita(""); 
      } else {
        swal({
          title: "Error",
          text: "No se pudo agendar la cita.",
          icon: "error",
          buttons: {
            confirm: {
              text: "Ok",
              value: true,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error al agendar la cita:", error);
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Citas Disponibles"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Citas Disponibles"}
          ruta1={"/Home"}
        />
        <section className="content">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "25%" }}>Fecha</th>
                    <th style={{ width: "30%" }}>Hora</th>
                    <th style={{ width: "20%" }}>Doctor</th>
                    <th style={{ width: "20%" }}>Numero de Autorizacion</th>
                    <th style={{ width: "15%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.fecha}</td>
                      <td>{item.hora}</td>
                      <td>{item.nombre}</td>
                      <td>
                        <input
                          type="text"
                          value={numeroCita}
                          onChange={(e) => setNumeroCita(e.target.value)}
                          placeholder="Numero de Autorizacion"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          onClick={(e) => agendarCita(e, item.id)}
                          className="btn btn-sm btn-primary"
                        >
                          Agendar Cita
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CitasDisponibles;
