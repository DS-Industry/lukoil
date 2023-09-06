import { Box, Flex, useToast } from '@chakra-ui/react';
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
export const InstructionPage: React.FC = () => {

	const [ isClicked, setIsClicked ] = useState<boolean>(false)
	const toast = useToast();
	const { getMe, user, updateStore } = useUser();
	const [searchParams] = useSearchParams();
	const cardId: string | null = searchParams.get('CardId');
	const navigate = useNavigate();


	const handleClick = () => {
		const destination = user && !user.isAuth ? '/login' : '/home';
		navigate(destination, { state: { partnerCard: cardId } });
	};



	useEffect(() => {
		getMe();
		if (!cardId) {
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
