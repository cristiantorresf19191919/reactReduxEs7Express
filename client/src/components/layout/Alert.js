import React from 'react';

import { connect } from 'react-redux';

// alert { alertType:string; id:string }

const Alert = ({alerts}) => alerts !== null && alerts.length >0 && 
alerts.map(alert => (
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
        {alert.msg}
    </div>
)) 


const mapStateToProps = state => ({alerts: state.alert});


export default connect(mapStateToProps)(Alert);
