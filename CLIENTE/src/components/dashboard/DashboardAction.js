import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const DashboardAction = () => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"> Editar Perfil</i>
        </Link>

        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"><b> Agregar Experiencia</b></i>
        </Link>

        <Link to="/add-studies" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"> Agregar Estudios</i>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, {})(DashboardAction);
