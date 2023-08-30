import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 10000, // Set the request timeout (optional)
	headers: {
		'Content-Type': 'application/json', // Set the default Content-Type header for all requests
		// Add any other common headers you need
	},
});

export default api;
