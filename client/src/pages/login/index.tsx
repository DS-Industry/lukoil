import { Flex, useToast } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { Header } from '../../component/header';
import { PhoneInput } from '../../component/inputs/phone-input';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { sendPhNumber, user, updateStore } = useUser();
	const [value, setValue] = useState<any>('');
	const location = useLocation();
	const partnerCard = location.state && location.state.partnerCard;
	const { isLoading, error } = user;
	const handleClick = async () => {
		const phNumber = `+7 ${value}`;
		await sendPhNumber(phNumber);
		setValue('')
	};


	useEffect(() => {
		if (!user.isLoading && error && error.code == 201) {
			updateStore({
				error: null,
			});
			navigate('/verification', { state: { partnerCard: partnerCard, phone: `+7 ${value}` } });
		} else if (error && error.code !== 201) {
			toast({
				containerStyle: {
					marginTop: 'none',
					width: '95vw',
				},
				title: 'Кажется что-то пошло не так',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
			updateStore({
				error: null,
			});
		}
	}, [user]);


	return (
		<>
			<Flex
				h="95vh"
				w="100vw"
				flexDir="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Header
					fontSize="28px"
					fontWeight="800"
					label="Авторизация"
					flexPos="flex-start"
					paddingLeft="16px"
				/>
				<Flex
					h="100%"
					w="100%"
					flexDir="column"
					justifyContent="space-between"
					paddingInline="16px"
					alignItems="flex-start"
				>
					<PhoneInput value={value} setValue={setValue} />
					<OperButton
						isLoading={isLoading}
						title="Далее"
						onClick={handleClick}
						value={value.length === 13 ? value : null}
						disabled={value.length !== 13}
						switchCarWashType="tel"
					/>
				</Flex>
			</Flex>
		</>
	);
};
