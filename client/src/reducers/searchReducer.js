export const searchReducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_TERM':
			return {
				...state,
				searchTerm: action.payload,
				inSearch: true,
			};
		case 'CLEAR_SEARCH':
			return { ...state, searchTerm: '', inSearch: false };
		default:
			break;
	}
};
