import axios from 'axios';
import { BASE_URL } from './constants';

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000, // Set the request timeout (optional)
	headers: {
		'Content-Type': 'application/json', // Set the default Content-Type header for all requests
		// Add any other common headers you need
	},
});

export default api;
