import React, { createContext, useReducer } from 'react';
import { authReducers } from '../reducers/authReducers';

export const AuthContext = createContext();

const initialState = {
	userId: null,
	token: null,
	isLogin: false,
};

const AuthContextProvider = (props) => {
	const [authState, dispatch] = useReducer(authReducers, initialState);

	return (
		<AuthContext.Provider value={{ authState, dispatch }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
