import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainerMedico from "../../componentes/SidebarContainerMedico";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const CitasCrear = () => {
  const navigate = useNavigate();

  const [Citas, setCitas] = useState({
    fecha: "",
    hora: "",
    nombre: "",
  });

  const [nombresDoctores, setNombresDoctores] = useState([]); 

  useEffect(() => {
    document.getElementById("fecha").focus();
    cargarNombresDoctores(); 
  }, []);

  const { fecha, hora, nombre } = Citas; 

  const onChange = (e) => {
    setCitas({
      ...Citas,
      [e.target.name]: e.target.value,
    });
  };

  const cargarNombresDoctores = async () => { 
    try {
      const response = await APIInvoke.invokeGET(`/Medicos`); 
      console.log("Lista de doctores:", response);

      if (Array.isArray(response)) {
        setNombresDoctores(response); 
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar la lista de doctores:", error);
    }
  };

  const crearCita = async () => {
    const data = {
      fecha: Citas.fecha,
      hora: Citas.hora,
      nombre: Citas.nombre, 
    };
    const response = await APIInvoke.invokePOST(`/Citas`, data);

    if (response && response.id) {
      navigate("/CitasAdmin");
      const msg = "La cita fue creada correctamente.";
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
      setCitas({
        fecha: "",
        hora: "",
        nombre: "", 
      });
    } else {
      const msg = "La cita no fue creada correctamente.";
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
    crearCita();
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainerMedico></SidebarContainerMedico>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Creación de Citas "}
          breadCrumb1={"Listado de citas"}
          breadCrumb2={"Creación"}
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
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="fecha">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      id="fecha"
                      name="fecha"
                      placeholder="Ingrese la Fecha"
                      value={fecha}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="hora">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      id="hora"
                      name="hora"
                      value={hora}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="nombre">Doctor</label>
                    <select
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={onChange}
                      required
                    >
                      <option value="">Seleccione un doctor</option>
                      {nombresDoctores.map((doctor) => (
                        <option key={doctor.id} value={doctor.nombre}>
                          {doctor.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Crear
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

export default CitasCrear;
