import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root') as HTMLElement);

const colors = {
	colors: {
		brand: {
			500: '#D2233C',
		},
		PRIMARY_RED: '#D2233C',
		SECONDARY_RED: '#F7EAEC',
		WHITE: '#FFFFFF',
		BLACK: '#000000',
		DARK_GRAY: '#A0A0A4',
		WHITE_GRAY: '#EFEFF3',
	},
};

const theme = extendTheme({ colors });

root.render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
