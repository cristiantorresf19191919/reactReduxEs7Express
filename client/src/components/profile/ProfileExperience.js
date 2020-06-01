import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
const ProfileExperience = ({ experience }) => {
    const {title,to,from,company,description} = experience;
  return (
    <Fragment>
      <div>
        <h3 class="text-dark">{company}</h3>
        <p>
          <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
          {!to ? "Actual" : <Moment format="YYYY/MM//DD">{to}</Moment>}
        </p>
        <p>
          <strong>Cargo: </strong>{title}
        </p>
        <p>
          <strong>Description: </strong> {description}
        </p>
      </div>
    </Fragment>
  );
};

ProfileExperience.propTypes = {};

export default ProfileExperience;
