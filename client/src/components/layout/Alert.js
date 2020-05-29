import React from 'react';
import {AnimateOnChange} from 'react-animation';
import { connect } from 'react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.length >0 && 

alerts.map(alert => (
    <AnimateOnChange durationOut={500} animationIn="bounceIn" animationOut="bounceOut">
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.msg} 
    </div>        
    </AnimateOnChange>
)) 

const mapStateToProps = state => ({alerts: state.alert});

export default connect(mapStateToProps)(Alert);
