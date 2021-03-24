import { useContext, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Signup from './components/auth/Signup';
import MainHeader from './components/header/MainHeader';
import { AuthContext } from './context/AuthContext';
import TodoContextProvider from './context/TodoContext';

function App() {
	const { authState } = useContext(AuthContext);
	const [isSignup, setIsSignup] = useState(authState.isLogin);

	useEffect(() => {
		setIsSignup(authState.isLogin);
	}, [authState.isLogin]);

	let routes;
	if (isSignup) {
		routes = (
			<Switch>
				<Route exact path="/">
					<h1>Dashboard</h1>
				</Route>
				<Redirect exact to="/" />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/signup">
					<Signup />
				</Route>
				<Redirect to="/signup" />
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
