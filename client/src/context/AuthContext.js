import React, { createContext, useEffect, useReducer } from 'react';
import { authReducers } from '../reducers/authReducers';

export const AuthContext = createContext();

const initialState = {
	userId: null,
	token: null,
	isLogin: false,
};

const AuthContextProvider = (props) => {
	const [authState, dispatch] = useReducer(authReducers, initialState, () => {
		const local = localStorage.getItem('userData');
		return local ? JSON.parse(local) : [];
	});
	console.log(authState);

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(authState));
	}, [authState]);

	return (
		<AuthContext.Provider value={{ authState, dispatch }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
