import {
	Accordion,
	AccordionItem,
	HStack,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	Flex,
	Text,
	Box,
} from '@chakra-ui/react';
import { TagInfo } from '../../../tag-info';

interface IProgramComponentList {
	serviceInfo: Array<string>;
	serviceDuration: string;
}

export const ProgramComponentList: React.FC<IProgramComponentList> = ({
	serviceDuration,
	serviceInfo,
}) => {
	return (
		<>
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
							label={`${serviceDuration} мин`}
							bgColor="colors.PRIMARY_RED"
							color="colors.WHITE"
							fontSize="14px"
							pY="3px"
						/>
					</HStack>
					<AccordionPanel p="0">
						<Flex flexDir="row" flexWrap="wrap">
							{serviceInfo &&
								serviceInfo.map((item: any, index: number) => {
									return (
										<Box mr="3%" mt="3%" key={index}>
											<TagInfo
												width="auto"
												label={item}
												bgColor="colors.PRIMARY_RED"
												color="colors.WHITE"
												fontSize="12px"
												height="20px"
												pY="3px"
											/>
										</Box>
									);
								})}
						</Flex>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	);
};
