import { useEffect } from 'react';
import { useOrder } from '../../context/order-context';
import { useNavigate } from 'react-router-dom';
export const PaymentPage = () => {
	const { store, sendOrder } = useOrder();
	const navigate = useNavigate();

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://yookassa.ru/checkout-widget/v1/checkout-widget.js';
		script.async = true;
		script.onload = () => {
			// Initialization of the widget
			// @ts-ignore
			const checkout = new window.YooMoneyCheckoutWidget({
				confirmation_token: store.paymentTocken, // Your confirmation token obtained from YooKassa// Your completion payment page URL

				// Uncomment the following block if you need to customize the widget's appearance
				// customization: {
				//   colors: {
				//     control_primary: '#00BF96', // HEX color value for accent elements
				//     background: '#F2F3F5', // HEX color value for the payment form and its elements
				//   },
				// },
				// @ts-ignore
				error_callback: function (error) {
					navigate('/error');
				},
			});

			checkout.on('success', async () => {
				//Код, который нужно выполнить после успешной оплаты.
				await sendOrder();
				navigate('/success');
				//Удаление инициализированного виджета
				checkout.destroy();
			});

			// Render the payment form in the container with the 'payment-form' id
			checkout.render('payment-form');
		};

		document.head.appendChild(script);

		// Clean up the script when the component is unmounted
		return () => {
			document.head.removeChild(script);
		};
	}, []);
	return <div id="payment-form"></div>;
};
