import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/ContentHeader";
import SidebarContainer from "../../componentes/SidebarContainer";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import Navbar from "../../componentes/Navbar";

const CitasAgendadas = () => {
  const [citasAgendadas, setCitasAgendadas] = useState([]);

  const cargarCitasAgendadas = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/Citas`);
      console.log("Respuesta de la API:", response);

      if (Array.isArray(response)) {
        setCitasAgendadas(response);
        console.log("Citas agendadas:", response);
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al cargar las citas agendadas:", error);
    }
  };

  useEffect(() => {
    cargarCitasAgendadas();
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Citas Agendadas"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Citas Agendadas"}
          ruta1={"/Home"}
        />
        <section className="content">
          <div className="card">
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Id</th>
                    <th style={{ width: "30%" }}>Fecha</th>
                    <th style={{ width: "30%" }}>Hora</th>
                    <th style={{ width: "15%" }}>Número de Cita</th> 
                    <th style={{ width: "10%" }}>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {citasAgendadas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.fecha}</td>
                      <td>{item.hora}</td>
                      <td>{item.numeroCita}</td> 
                      <td>{item.nombre}</td>
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

export default CitasAgendadas;
