import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { Link } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CitasAdmin = () => {
  const [Citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Citas`);
      console.log("Respuesta de la API:", response); 
      if (Array.isArray(response)) {
        setCitas(response); 
        console.log("Citas actualizadas:", response); 
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar las citas:", error);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const eliminarCitas = async (e, idCitas) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/Citas/${idCitas}`);

    if (response === response) {
      const msg = "La cita fue eliminada correctamente.";
      swal({
        title: "Información",
        text: msg,
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
      cargarCitas();
    } else {
      const msg = "La cita no fue borrada correctamente.";
      swal({
        title: "Error",
        text: msg,
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
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Citas"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Citas"}
          ruta1={"/HomeMedico"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Link to="/CitasCrear" className="btn btn-sm btn-primary">
                  Crear Citas
                </Link>
              </h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "20%" }}>Doctor</th>
                    <th style={{ width: "30%" }}>Fecha</th>
                    <th style={{ width: "30%" }}>Hora</th>
                    <th style={{ width: "10%" }}>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Citas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nombre}</td>
                      <td>{item.fecha}</td>
                      <td>{item.hora}</td>
                      <td>
                        <Link to={`/CitasEditar/${item.id}@${encodeURIComponent( item.fecha)}@${encodeURIComponent(item.hora)}`}className="btn btn-sm btn-primary"
                        >
                          Editar
                        </Link>
                        &nbsp;&nbsp;
                        <button
                          onClick={(e) => eliminarCitas(e, item.id)}
                          className="btn btn-sm  btn-danger"
                        >
                          Eliminar
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CitasAdmin;
