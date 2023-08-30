import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
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
				<Accordion mt="10%" w="100%" allowMultiple>
					<AccordionItem border="0px">
						<HStack w="100%" justifyContent="space-between" border="0px">
							<AccordionButton
								py="1px"
								px="4px"
								borderRadius="4px"
								h="20px"
								w="35%"
								bgColor="colors.WHITE"
								animation="none"
								_focus={{
									backgroundColor: 'white',
									boxShadow: 'none',
									transition: 'none',
								}}
								transition="none"
							>
								<Text fontSize="12px" fontWeight="700" mr="8px">
									Подробнее
								</Text>
								<AccordionIcon
									w="20px"
									h="20px"
									padding="0"
									bgColor="none"
									color="colors.PRIMARY_RED"
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
						<AccordionPanel>
							<Flex flexDir="row" flexWrap="wrap">
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
								<Box mr="4%" mb="4%">
									<TagInfo
										width="auto"
										label="Tag 1"
										bgColor="colors.PRIMARY_RED"
										color="colors.WHITE"
										fontSize="12px"
										height="20px"
										pY="3px"
									/>
								</Box>
							</Flex>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</VStack>
		</Box>
	);
};
