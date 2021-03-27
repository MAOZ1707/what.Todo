import { useCallback, useState } from 'react';
import axios from 'axios';

export const useFetch = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			console.log(body);
			setIsLoading(true);
			try {
				const response = await axios({
					url,
					method,
					data: body,
					headers,
				});
				const data = response.data;
				console.log(data);
				setIsLoading(false);
				return data;
			} catch (err) {
				setError(err.response.data.message);
				setIsLoading(false);
			}
		},
		[]
	);

	return { error, isLoading, sendRequest };
};
