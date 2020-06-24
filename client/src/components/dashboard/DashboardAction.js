import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardAction = () => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 50, scale:0.5, opacity:.7 },
    visible: {
      y: 0,
      scale:1,
      opacity:1
      
    },
  };
  return (
    <div>
      <div className="dash-buttons">
        <motion.ul variants={container} initial="hidden" animate="visible">
          <motion.li key={1} variants={item} className="btn btn-light">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-primary"> Editar Perfil</i>
            </Link>
          </motion.li>

          <motion.li key={1} variants={item} className="btn btn-light">
            <Link to="/add-experience" className="btn btn-light" >
              <i className="fab fa-black-tie text-primary">
                <b> Agregar Experiencia</b>
              </i>
            </Link>
          </motion.li>

          <motion.li key={1} variants={item} className="btn btn-light">
            <Link to="/add-studies" className="btn btn-light">
              <i className="fas fa-graduation-cap text-primary">
                {" "}
                Agregar Estudios
              </i>
            </Link>
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
};

export default connect(null, {})(DashboardAction);
