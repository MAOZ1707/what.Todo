import { useContext, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import AuthContainer from './components/auth/AuthContainer';
import MainHeader from './components/header/MainHeader';
import { AuthContext } from './context/AuthContext';
import TodoContextProvider from './context/TodoContext';

function App() {
	const { authState } = useContext(AuthContext);
	const [isSignup, setIsSignup] = useState(authState.isLogin);
	console.log(authState);

	useEffect(() => {
		setIsSignup(authState.isLogin);
	}, [authState.isLogin]);

	let routes;
	if (isSignup) {
		routes = (
			<Switch>
				<Route exact path="/">
					<Dashboard />
				</Route>
				<Redirect exact to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path="/auth">
					<AuthContainer />
				</Route>
				<Route exact path="/signup">
					<Signup />
				</Route>
				<Route exact path="/login">
					<Signup />
				</Route>
				<Redirect to="/auth" />
			</Switch>
		);
	}

	return (
		<TodoContextProvider>
			<Router>
				<div className="app">
					<MainHeader />
					<>{routes}</>
				</div>
			</Router>
		</TodoContextProvider>
	);
}

export default App;
