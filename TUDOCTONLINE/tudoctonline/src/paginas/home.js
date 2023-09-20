import React from "react";
import Navbar from "../componentes/Navbar";
import SidenarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidenarContainer></SidenarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado proyectos"}
          breadCrumb1={"Incio"}
          breadCrumb2={"Proyectos"}
          ruta1={"/Home"}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Agendar citas</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-edit" />
                  </div>
                  <Link to={"/CitasDisponibles"} className="small-box-footer">
                     Agendar citas disponibles
                    <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
