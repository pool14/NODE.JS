import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CitasEditar = () => {
  const navigate = useNavigate();
  const { idCitas } = useParams();
  const arreglo = idCitas.split("@");
  const fechaCita = arreglo[1];
  const nombre = arreglo[2];
  const horaCita = arreglo[3];

  const [Citas, setCitas] = useState({
    fecha: fechaCita,
    hora: horaCita,
    nombre: nombre,
  });

  useEffect(() => {
    cargarCita();
  }, []);

  const cargarCita = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Citas/${arreglo[0]}`);
      console.log("Respuesta de la API:", response);

      if (response) {
        setCitas({
          ...Citas,
          nombre: response.nombre,
        });
      } else {
        console.error("No se encontró la cita con el ID proporcionado.");
      }
    } catch (error) {
      console.error("Error al cargar la cita:", error);
    }
  };

  const onChange = (e) => {
    setCitas({
      ...Citas,
      [e.target.name]: e.target.value,
    });
  };

  const editarCita = async () => {
    const arreglo = idCitas.split("@");
    const idCita = arreglo[0];

    const data = {
      fecha: Citas.fecha,
      hora: Citas.hora,
      nombre: Citas.nombre,
    };

    const response = await APIInvoke.invokePUT(`/Citas/${idCita}`, data);

    if (response) {
      navigate("/CitasAdmin");
      const msg = "La cita fue editada correctamente.";
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
    } else {
      const msg = "La cita no fue editada correctamente.";
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

  const onSubmit = (e) => {
    e.preventDefault();
    editarCita();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Editar citas "}
          breadCrumb1={"Listado de citas"}
          breadCrumb2={"Edicion"}
          ruta1={"/CitasAdmin"}
        />
        <section className="content">
          <div className="card">
            <div className="card-header">
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
              <form onSubmit={onSubmit}>

              <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha"
                      name="fecha"
                      placeholder="Ingrese la Fecha"
                      value={Citas.fecha}
                      onChange={onChange}
                      required
                    />
                  </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora"
                      name="hora"
                      placeholder="Ingrese la Hora"
                      value={Citas.hora}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="nombre">Doctor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del Doctor"
                    value={Citas.nombre}
                    readOnly
                  />
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Editar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CitasEditar;
