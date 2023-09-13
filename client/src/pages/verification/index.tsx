import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { OperButton } from '../../component/buttons/oper_button';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../../component/header';
import { VerificationList } from '../../component/inputs/varification-input-list';

interface IVerificationCode {
	firstN: string;
	secondN: string;
	thirdN: string;
	fourthN: string;
}

export const VerificationPage = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { user, signIn,  sendPhNumber, updateStore } = useUser();
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
	const [timer,setTimer] = useState<number>(50);
	const [code, setCode] = useState<IVerificationCode>({
		firstN: '',
		secondN: '',
		thirdN: '',
		fourthN: '',
	});

	const location = useLocation();
	const partnerCard = location.state && location.state.partnerCard;
	const phone = location.state && location.state.phone;

	// send OTP code to phone number

	const { isLoading, error, isAuth } = user;

	useEffect(() => {
		if (isAuth && !isLoading){
			navigate('/home')
		}
	}, [isAuth])
	const handleClick = () => {
			setIsButtonDisabled(true);
			setTimer(50);
			sendPhNumber(phone);
	};

	// send user OTP input
	useEffect(() => {
		if (code.firstN && code.secondN && code.thirdN && code.fourthN) {
			const otp = Object.values(code).join('');
			signIn(otp, phone, partnerCard);
		}
	}, [code.firstN, code.secondN, code.thirdN, code.fourthN]);


	// disabled button timer use effect
	useEffect(() => {
		if (error && error.code !== 404 && error.code !== 201) {
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
	},[isLoading])

	useEffect(() => {
		let intervalID: any;
		if (isButtonDisabled) {
			intervalID = setInterval(() => {
				setTimer(prevValue => prevValue-1);
			}, 1000);
			if (timer === 0) {
				setIsButtonDisabled(false);
				clearInterval(intervalID);
			}
		}
		return () => clearInterval(intervalID);
	}, [timer]);

	return (
		<Box h="85vh">
			<Header
				fontSize="28px"
				fontWeight="800"
				label="Авторизация"
				flexPos="flex-start"
				paddingLeft="16px"
			/>
			<Flex
				h="93%"
				flexDirection="column"
				justifyContent="space-between"
				alignItems="flex-start"
				pt="50px"
				pl="16px"
				pr="16px"
			>
				<Box>
					<Text fontSize="20px" fontWeight="700">
						Введите код из СМС
					</Text>
					<Text fontSize="15px" color="#C7C7CB" fontWeight="500" mb="30px">
						Код направлен на {phone}
					</Text>

					<VerificationList code={code} setCode={setCode} />

					<Text fontSize="15px" color="#C7C7CB" fontWeight="500" mt="30px">
						Если код не придет, можно получить новый через {timer} сек.
					</Text>
				</Box>
				<Box w="100%" pl="12px" pr="12px">
					<OperButton
						title="Получить код"
						onClick={handleClick}
						disabled={isButtonDisabled}
					/>
				</Box>
			</Flex>
		</Box>
	);
};
