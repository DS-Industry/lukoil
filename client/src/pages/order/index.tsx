import { CarWashMap } from '../../component/car-wash/car-wash-map-item';
import { useOrder } from '../../context/order-context';
import { Box, Flex, HStack, Text, useToast } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useCarWash } from '../../context/carwash-context';
import { TagInfo } from '../../component/tag-info';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';

export const OrderPage: React.FC = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const {
		store: orderStore,
		sendPayment,
		getStore: getOrderStore,
		updateStore: updateOrderStore,
	} = useOrder();

	const {
		store: carWashStore,
		pingCarWash,
		updateStore: updateCWStore,
		getStore: getCWStore,
	} = useCarWash();

	const { user: userStore, getStore: getUserStore } = useUser();

	const handleClick = () => {
		if (orderStore.carWashId) {
			pingCarWash(Number(orderStore.carWashId), Number(orderStore.bayNumber));
		}
	};

	useEffect(() => {
		if (orderStore && carWashStore && userStore) {
			console.log(orderStore, carWashStore, userStore);
		}
		if (!orderStore.sum) {
			getOrderStore();
		}
		if (!carWashStore.carWash) {
			getCWStore();
		}
		if (!userStore.phNumber) {
			getUserStore();
		}
	}, [orderStore, carWashStore, userStore]);

	useEffect(() => {
		if (userStore.phNumber && !userStore.partnerCard) {
			toast({
				title: 'Кажется что-то пошло не так...',
				description: 'Приходите позже.',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
			navigate('/home');
		}
	}, [userStore.phNumber]);

	useEffect(() => {
		if (carWashStore.pingStatus === 200) {
			updateCWStore({
				pingStatus: null,
			});
			sendPayment(String(orderStore.sum));
			console.log('ping status free');
		}

		if (carWashStore.pingStatus === 400) {
			console.log('ping status busy');
			updateCWStore({
				pingStatus: null,
			});
			toast({
				title: 'Кажется с постом что-то не так',
				description: 'Возможно он занят',
				status: 'error',
				duration: 9000,
				isClosable: true,
				position: 'top',
			});
			navigate('/home');
		}
	}, [carWashStore.pingStatus]);

	useEffect(() => {
		if (!orderStore.isLoading) {
			if (orderStore.paymentTocken) {
				navigate('/pay');
			}
			if (orderStore.error) {
				toast({
					containerStyle: {
						marginTop: 'none',
						width: '95vw',
					},
					position: 'top',
					title: 'Кажется что-то пошло не так...',
					variant: 'subtle',
					description: 'На сервере ведутся работы, приходите позже',
					status: 'error',
					duration: 9000,
					isClosable: true,
				});
				updateOrderStore({ error: null });
				navigate('/home');
			}
		}
	}, [orderStore.isLoading]);

	return (
		<Flex
			boxSizing="border-box"
			flexDirection="column"
			justifyContent="space-between"
			h="100vh"
			w="100vw"
			p="28px"
			pb="0"
		>
			{userStore.partnerCard !== null && carWashStore.carWash && (
				<>
					<Flex flexDirection="column">
						<CarWashMap
							id={String(orderStore.sum)}
							title={carWashStore.carWash.name}
							openTime="24часа"
							address={carWashStore.carWash.address}
							distance={carWashStore.carWash.distance}
							isDisabled={true}
							IsOrder={true}
						/>
						{carWashStore.carWash && carWashStore.carWash.type === 'Portal' && (
							<Box>
								<Text pt="30px" fontSize="15px" fontWeight="700">
									Программа
								</Text>
								<TagInfo
									label={carWashStore.program ? carWashStore.program : ''}
									bgColor="colors.PRIMARY_RED"
									color="colors.WHITE"
									fontSize="14px"
									height="20px"
								/>
							</Box>
						)}
						<Text pt="30px" fontSize="15px" fontWeight="700">
							Пост
						</Text>
						<Box w="30%">
							<TagInfo
								label={String(orderStore.bayNumber)}
								bgColor="colors.PRIMARY_RED"
								color="colors.WHITE"
								fontSize="14px"
								height="20px"
							/>
						</Box>
						<Text pt="30px" fontSize="15px" fontWeight="700">
							Кэшбек на карту Лукойл
						</Text>
						<Box w="30%">
							<TagInfo
								label="10 %"
								bgColor="colors.PRIMARY_RED"
								color="colors.WHITE"
								fontSize="14px"
								height="20px"
							/>
						</Box>
						<HStack w="80vw">
							<Text pt="36px" fontSize="15px" fontWeight="400">
								Карта программы лояльности
								<Text
									as="span"
									color="colors.PRIMARY_RED"
									ml="5px"
									fontSize="15px"
									fontWeight="700"
									letterSpacing="2px"
								>
									ЛУКОЙЛ
								</Text>
								:
							</Text>
						</HStack>
						<Box mt="11px" fontWeight="500">
							<TagInfo
								label={String(userStore.partnerCard)}
								bgColor="colors.WHITE_GRAY"
								color="colors.BLACK"
								fontSize="14px"
								height="20px"
								fontWeight="500"
							/>
						</Box>
					</Flex>
					<Flex flexDirection="inherit" justifyContent="center">
						<Text w="100%" textAlign="center" fontSize="48px" fontWeight="700">
							{orderStore.sum} ₽
						</Text>
						<OperButton
							title="Оплатить"
							onClick={handleClick}
							disabled={false}
							isOper={false}
						/>
					</Flex>
				</>
			)}
		</Flex>
	);
};
