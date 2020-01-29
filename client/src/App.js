import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utilities/setAuthToken';


const App = () => {

	if (localStorage.token){
		setAuthToken(localStorage.token);
	}

	useEffect(() =>{
		store.dispatch(loadUser());
	},[]);


	return (
		<Provider store = {store}>		
		<Router>			
			<Fragment>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<section className="container">				
				<Alert />
				<Switch>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
				</Switch>
				</section>
			</Fragment>
		</Router>
		</Provider>
	);
}

export default App;
