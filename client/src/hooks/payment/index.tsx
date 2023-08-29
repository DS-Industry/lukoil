import { useEffect } from 'react';

interface IWidgetProps {
	confirmation_token: string;
	onSuccess: (data?: any) => void;
	onError: (error: any) => void;
}

export default function useYooKassaWidget({
	confirmation_token,
	onError,
	onSuccess,
}: IWidgetProps) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
		script.async = true;

		script.onload = () => {
			// Initialization of the widget
			// @ts-ignore
			const checkout = new window.YooMoneyCheckoutWidget({
				confirmation_token: confirmation_token, // Your confirmation token obtained from YooKassa// Your completion payment page URL

				// Uncomment the following block if you need to customize the widget's appearance
				// customization: {
				//   colors: {
				//     control_primary: '#00BF96', // HEX color value for accent elements
				//     background: '#F2F3F5', // HEX color value for the payment form and its elements
				//   },
				// },
				// @ts-ignore
				error_callback: function (error) {
					console.log(error);
					onError(error);
				},
			});

			checkout.on('success', () => {
				//Код, который нужно выполнить после успешной оплаты.
				console.log('Start Equipment');
				onSuccess();
				//Удаление инициализированного виджета
				checkout.destroy();
			});

			// Render the payment form in the container with the 'payment-form' id
			checkout.render('payment-form');

			document.head.appendChild(script);
			return () => {
				document.head.removeChild(script);
			};
		};
	}, [confirmation_token]);
}
