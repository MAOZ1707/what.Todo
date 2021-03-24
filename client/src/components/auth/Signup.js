import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext';

const Signup = () => {
	const { authState, dispatch } = useContext(AuthContext);
	const todoState = useContext(TodoContext);

	console.log(todoState);

	return (
		<div className="auth-container">
			<div className="card">Signup</div>
		</div>
	);
};

export default Signup;
