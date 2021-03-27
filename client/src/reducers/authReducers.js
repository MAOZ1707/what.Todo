export const authReducers = (state, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			console.log(action);
			return {
				...state,
				userId: action.payload.user._id,
				token: action.payload.token,
				isLogin: true,
			};
		case 'LOGOUT':
			return { ...state, isLogin: false, userId: null, token: null };
		default:
			break;
	}
};
