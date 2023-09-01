import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/order-context';
import { useCarWash } from '../../../context/carwash-context';
import { ProgramComponentList } from './additional_info';

interface IPortalService {
	name: string;
	cost: string;
	serviceDuration: string;
	serviceInfo: Array<string>;
}

export const PortalService: React.FC<IPortalService> = ({
	name,
	cost,
	serviceDuration,
	serviceInfo,
}) => {
	const navigate = useNavigate();
	const { updateStore } = useOrder();
	const { updateStore: updateCWStore } = useCarWash();

	const handleClick = () => {
		navigate('/order');
		updateStore({ sum: Number(cost) });
		updateCWStore({ program: name });
	};

	return (
		<Box p="18px" borderRadius="8px" bgColor="colors.WHITE_GRAY">
			<VStack>
				<HStack w="100%" justifyContent="space-between" onClick={handleClick}>
					<Text fontSize="24px" fontWeight="700" lineHeight="20px">
						{name}
					</Text>
					<Text fontSize="24px" fontWeight="700" lineHeight="20px">
						{cost} ₽
					</Text>
				</HStack>
				<ProgramComponentList
					serviceDuration={serviceDuration}
					serviceInfo={serviceInfo}
				/>
			</VStack>
		</Box>
	);
};
