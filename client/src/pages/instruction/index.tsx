import { Box, Flex, useToast } from '@chakra-ui/react';
import { Header } from '../../component/header';
import { instructionList } from '../../utill/variabels';
import { OperButton } from '../../component/buttons/oper_button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../../component/logo';
import { InstructionList } from '../../component/hard-data/instructions';
import { MainText } from '../../component/hard-data/main-text';
import { useUser } from '../../context/user-context';

export const InstructionPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [ isClicked, setIsClicked ] = useState<boolean>(false);
	const [ partnerCard, setPartnerCard ] = useState<string>('');
	const toast = useToast();
	const { updateStore, getMe, user, getStore } = useUser();

	const handleClick = () => {
		const queryParams = new URLSearchParams(location.search);
		const partnerCardParam  = queryParams.get('partnerCard');
		if (partnerCardParam) {
			setPartnerCard(partnerCardParam);
		} 
		getMe();
		setIsClicked(true);

	};

	useEffect(()=> {
	if (isClicked) {
		if (!user || (user && !user.isAuth)) {
			if (partnerCard) {
				updateStore({
					partnerCard :partnerCard,
				})
				setIsClicked(false);
				navigate('/login');
			} else {
				toast({
					containerStyle: {
						marginTop: 'none',
						width: '95vw',
					},
					title: 'Не указан номер карты ЛУКОЙЛ',
					status: 'warning',
					duration: 9000,
					isClosable: true,
					position: 'top',
				});
			}
			setIsClicked(false);
		} else if (user && user.isAuth) {
			navigate('/home');
		}
		}
	}, [user])

	useEffect(()=> {
		getStore();
	}, [])


	return (
		<Flex
			w="99vw"
			bgColor="colors.WHITE"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			pl="16px"
			pr="16px"
		>
			<Header bgcolor="colors.WHITE" label="" />

			<Logo />

			<MainText />

			<Flex
				flexDirection="column"
				w="100%"
				mt="50px"
				pt="40px"
				h="90vh"
				justifyContent="space-between"
				borderTopRadius="25px"
				bgColor="rgba(235, 235, 236, 0.40);"
				alignItems="baseline"
			>
				{instructionList.map((info: string, index: number) => {
					return <InstructionList key={index} info={info} index={index} />;
				})}
				<Box pl="13px" pr="13px" w="100%">
					<OperButton
						isLoading={isClicked}
						title="Искать автомойку"
						onClick={handleClick}
						disabled={false}
						isOper={false}
					/>
				</Box>
			</Flex>
		</Flex>
	);
};
