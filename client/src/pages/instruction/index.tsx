import { Box, Flex, useToast, Text } from '@chakra-ui/react';
import { Header } from '../../component/header';
import { instructionList } from '../../utill/variabels';
import { OperButton } from '../../component/buttons/oper_button';
import { useEffect, useState } from 'react';
import { Logo } from '../../component/logo';
import { InstructionList } from '../../component/hard-data/instructions';
import { MainText } from '../../component/hard-data/main-text';
import { useUser } from '../../context/user-context';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CustomDrawer } from '../../component/drawer';
import { PromoConditions } from '../../component/hard-data/condition-promotion';
export const InstructionPage: React.FC = () => {

	const [ isClicked, setIsClicked ] = useState<boolean>(false)
	const toast = useToast();
	const { getMe, user, updateStore, updatePartnerCard } = useUser();
	const [searchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// take loyalty from query params and do nothing with it.
	const cardId: string | null = searchParams.get('subid');

	const loyaltyId: string | null = searchParams.get('loyalty');
	const navigate = useNavigate();


	const handleClick = async () => {
		const destination = user && !user.isAuth ? '/login' : '/home';
		let correctCardId: string | null = null;
		if (typeof loyaltyId === 'string') {
			correctCardId = loyaltyId.includes('#') ? loyaltyId.replace('#', '') : loyaltyId;
		}

		if(destination === '/home' && correctCardId && correctCardId !== user.partnerCard){
			const phone: string | null = user.phNumber ? user.phNumber : '';
			await updatePartnerCard(correctCardId, phone);
		}

		navigate(destination, { state: { partnerCard: correctCardId } });
	};

	const handleClose = () => {
		setIsOpen(false);
	}
	const handleInfoClick = () => {
		setIsOpen(true);
	}



	useEffect(() => {
		getMe();
		if (!loyaltyId) {
			toast({
				containerStyle: {
					marginTop: 'none',
					width: '95vw',
				},
				title: 'Не указан номер карты лояльности ЛУКОЙЛ',
				status: 'warning',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}

	},[])


	useEffect(() => {
		updateStore({
			error: null
		})
	}, [user.error])


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
				<Box pl="13px" pr="13px" w="100%" >
					<OperButton
						isLoading={isClicked}
						title="Искать автомойку"
						onClick={handleClick}
						disabled={false}
						isOper={false}
					/>
				</Box>
				<Text 
					w='100%'
					pb="80px" 
					color='colors.PRIMARY_RED' 
					textAlign='center'
					onClick={handleInfoClick}
					>Подробнее об акции</Text>
			</Flex>
				<CustomDrawer pl='1px' pr='1px' isOpen={isOpen} isInstruction={true} isList={true} onClose={handleClose}>
					<PromoConditions />
				</CustomDrawer>
		</Flex>
		
	);
};
