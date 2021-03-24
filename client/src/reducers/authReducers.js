export const authReducers = (state, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return {
				...state,
				userId: action.payload.userId,
				token: action.payload.token,
				isLogin: true,
			};
		case 'LOGOUT':
			return { ...state, isLogin: false, userId: null, token: null };
		default:
			break;
	}
};
