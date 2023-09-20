import React from "react";
import { Link } from "react-router-dom";

const MenuMedico = () => {
  return (
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"
      >
        
        <li className="nav-item">
          <Link to={"/HomeMedico"} className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Inicio
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link  to={"/CitasAdmin"} className="nav-link">
            <i className="nav-icon fas fa-edit" />
            <p>
              Citas
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link  to={"/CitasAgendadasM"} className="nav-link">
            <i className="nav-icon fa fa-archive"/>
            
            <p>
               Citas agendadas
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MenuMedico;
