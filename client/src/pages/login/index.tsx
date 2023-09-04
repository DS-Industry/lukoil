import { Flex, useToast } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { Header } from '../../component/header';
import { PhoneInput } from '../../component/inputs/phone-input';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const { sendPhNumber, user } = useUser();
	const [value, setValue] = useState<any>('');
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleClick = async () => {
		const phNumber = `+7 ${value}`;
		await sendPhNumber(phNumber);
		setIsClicked(true);
	};

	useEffect(() => {
		if (!user.isLoading) {
			setValue('');
			if (user.phNumber) {
				navigate('/verification');
			} else if (user.error.response.status !== 401) {
				toast({
					containerStyle: {
						marginTop: 'none',
						width: '95vw',
					},
					title: 'Кажется что-то пошло не так',
					description:
						'На сервере ведутся работы, приносим извинения за доставленные неудобства',
					status: 'error',
					duration: 9000,
					isClosable: true,
					position: 'top',
				});
			}
		}
	}, [user.isLoading]);

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
						isLoading={isClicked}
						title="Далее"
						onClick={handleClick}
						value={value.length === 13 ? value : null}
						disabled={value.length === 13 ? false : true}
						switchCarWashType="tel"
					/>
				</Flex>
			</Flex>
		</>
	);
};
