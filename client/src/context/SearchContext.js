import React, { createContext, useReducer } from 'react';
import { searchReducer } from '../reducers/searchReducer';

export const SearchContext = createContext();

const initialState = {
	searchTerm: '',
	inSearch: false,
};
const SearchContextProvider = ({ children }) => {
	const [searchState, dispatch] = useReducer(searchReducer, initialState);

	return <SearchContext.Provider value={{ searchState, dispatch }}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
