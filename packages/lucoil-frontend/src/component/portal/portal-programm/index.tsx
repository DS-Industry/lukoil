import { Box, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/order-context';
import { useCarWash } from '../../../context/carwash-context';

interface IPortalService {
	name: string;
	cost: string;
}

export const PortalService: React.FC<IPortalService> = ({ name, cost }) => {
	const navigate = useNavigate();
	const { updateStore } = useOrder();
	const { updateStore: updateCWStore } = useCarWash();

	const handleClick = () => {
		navigate('/order');
		updateStore({ sum: Number(cost) });
		updateCWStore({ program: name });
	};

	return (
		<Box
			onClick={handleClick}
			p="18px"
			borderRadius="8px"
			bgColor="colors.WHITE_GRAY"
		>
			<HStack justifyContent="space-between">
				<Text fontSize="24px" fontWeight="700" lineHeight="20px">
					{name}
				</Text>
				<Text fontSize="24px" fontWeight="700" lineHeight="20px">
					{cost} ₽
				</Text>
			</HStack>
		</Box>
	);
};
