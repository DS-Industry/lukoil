import { Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Header } from '../../component/header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useOrder } from '../../context/order-context';
import { useCarWash } from '../../context/carwash-context';

export const SuccessPaymentPage = () => {
	const { updateStore } = useOrder();
	const navigate = useNavigate();
	const { updateStore: updateCWStore } = useCarWash();
	useEffect(() => {
		updateStore({
			paymentId: null,
			paymentTocken: null,
			carWashId: null,
			bayNumber: null,
			sum: null,
		});
		updateCWStore({
			carWash: null,
		});
		console.log('i am in success');
		setTimeout(() => {
			navigate('/home');
		}, 3000);
	}, []);
	return (
		<>
			<Header label="Статус оплаты" />
			<Flex
				w="100vw"
				h="80vh"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<CheckCircleIcon boxSize="80px" color="green.500" mb="20px" />
				<Text fontSize="22px" fontWeight="600">
					Оплата произведена успешно!
				</Text>
			</Flex>
		</>
	);
};
