import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import TodoContextProvider from './context/TodoContext';
import AuthContextProvider from './context/AuthContext';
import SearchContextProvider from './context/SearchContext';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TodoContextProvider>
				<SearchContextProvider>
					<App />
				</SearchContextProvider>
			</TodoContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
