import React, { createContext, useCallback, useEffect, useReducer } from 'react';
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

	const logout = useCallback(() => {
		dispatch({ type: 'LOGOUT' });
		localStorage.removeItem('userData');
	}, []);

	return <AuthContext.Provider value={{ authState, dispatch, logout }}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;
