import { TimeIcon } from '@chakra-ui/icons';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
	Divider,
	Flex,
	HStack,
	IconButton,
	Spacer,
	Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCarWash } from '../../../context/carwash-context';
import { useOrder } from '../../../context/order-context';

interface ICarWashMap {
	id: string;
	title: string | undefined;
	openTime: string | undefined;
	address: string | undefined;
	distance?: number | null;
	isDisabled: boolean;
	carWash?: any;
	getCarWash?: any;
	setSwitch?: any;
	setCarWashDrawer?: any;
	IsOrder?: boolean;
	isMain?: boolean;
}

export const CarWashMap: React.FC<ICarWashMap> = ({
	title,
	openTime,
	address,
	carWash,
	getCarWash,
	distance,
	setCarWashDrawer,
	isDisabled,
	IsOrder = false,
	isMain = false
}) => {
	const navigate = useNavigate();
	const { updateStore } = useCarWash();
	const { updateStore: updateOrderStore } = useOrder();
	const handleClick = () => {
		if (!isDisabled) {
			getCarWash(carWash);
			setCarWashDrawer('full-info');
		}
	};

	const handleBackClick = () => {
		navigate('/home');
		updateStore({
			carWash: null,
			program: '',
		});
		updateOrderStore({
			carWashId: null,
			bayNumber: null,
			sum: null,
		});
	};

	return (
		<Flex
			justifyContent="flex-start"
			flexDirection="column"
		>
			{IsOrder ? (
				<HStack>
					<Text
						fontSize="20px"
						lineHeight="20px"
						color="colors.BLACK"
						fontWeight="800"
						maxW="80%"
					>
						{title}
					</Text>
					<Spacer />
					<IconButton
						onClick={handleBackClick}
						isRound
						colorScheme="colors.brand"
						aria-label="back button"
						icon={<IoMdArrowRoundBack />}
					/>
				</HStack>
			) : (
				<Text
					fontSize="20px"
					lineHeight="20px"
					color="colors.BLACK"
					fontWeight="800"
				>
					{title}
				</Text>
			)}

			<Flex
				fontSize="14px"
				lineHeight="20px"
				fontWeight="500"
				flexDirection="row"
				alignItems="center"
			>
				<TimeIcon /> <Text ml="5px">{openTime}</Text>
			</Flex>
			<Divider />
			<Text
				fontSize="14px"
				lineHeight="20px"
				fontWeight="400"
				mt="15px"
				color="colors.DARK_GRAY"
			>
				{address}
			</Text>
			<Text fontSize="12px" fontWeight="600" color="colors.PRIMARY_RED">
				{distance && distance < 1000
					? `${Math.round(distance)} М `
					: distance && distance > 1000
					? `${(distance / 1000).toFixed(2)} КМ `
					: ''}
				ДО АМС
			</Text>
			{ isMain ? 
				(
					<Text
						mt='10px'
						bgColor='colors.WHITE_GRAY' 
						color='colors.DARK'
						p='3px'
						w='45%'
						textAlign='center'
						borderRadius='8px'
						fontWeight='700'
						fontSize='12px'
						onClick={handleClick}>Подробнее об услугах</Text>
				) 
				: ''
			}
		</Flex>
	);
};
