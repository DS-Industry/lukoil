import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	HStack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/order-context';
import { useCarWash } from '../../../context/carwash-context';
import { TagInfo } from '../../tag-info';

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
				<HStack w="100%" justifyContent="space-between">
					<Accordion
						w="100%"
						borderTopWidth="0"
						borderBottomWidth="0"
						borderBottomColor="none"
						allowMultiple
					>
						<AccordionItem
							borderTopWidth="0"
							borderBottomWidth="0"
							borderBottomColor="none"
						>
							<HStack w="100%" justifyContent="space-between">
								<AccordionButton
									py="1px"
									pl="3px"
									pr="4px"
									borderRadius="4px"
									h="20px"
									w="35%"
									bgColor="colors.WHITE"
									_hover={{ backgroundColor: 'white' }}
									borderBottomColor="none"
								>
									<Text fontSize="12px" fontWeight="700" mr="8px">
										Подробнее
									</Text>
									<AccordionIcon
										borderTopWidth="0"
										borderBottomWidth="0"
										w="20px"
										h="20px"
										padding="0"
										bgColor="none"
										color={'colors.PRIMARY_RED'}
										borderBottomColor="none"
									/>
								</AccordionButton>
								<TagInfo
									label="5 мин"
									bgColor="colors.PRIMARY_RED"
									color="colors.WHITE"
									fontSize="14px"
									pY="3px"
								/>
							</HStack>
							<AccordionPanel borderBottomColor="none"></AccordionPanel>
						</AccordionItem>
					</Accordion>
				</HStack>
			</VStack>
		</Box>
	);
};
