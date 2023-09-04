import { Box, Flex, HStack, Text, Divider } from '@chakra-ui/react';

interface ICarWash {
	distance: number;
	coords: string;
	title: string;
	address: string;
	carWash: any;
	openFullInfo: (arg: string) => void;
	setCarWashCoords: any;
	index: number;
	setCarWash: any;
	setCarWashIdList: any;
}

export const CarWash: React.FC<ICarWash> = ({
	coords,
	title,
	address,
	carWash,
	openFullInfo,
	setCarWashCoords,
	index,
	setCarWash,
	setCarWashIdList,
	distance,
}) => {
	const handleClick = () => {
		openFullInfo('full-info');
		setCarWashCoords(coords);
		setCarWashIdList(index);
		setCarWash(carWash);
	};

	return (
		<Box mt="12px" ml="16px" mr="16px" onClick={handleClick}>
			<Flex justifyContent="space-between" mb="12px">
				<Box>
					<Text fontSize="15px" fontWeight="700" lineHeight="20px">
						{title}
					</Text>
					<HStack alignItems="baseline">
						<Text
							bg="colors.WHITE_GRAY"
							fontSize="10px"
							padding="1px 5px"
							fontWeight="700"
							borderRadius="5px"
						>
							{distance && distance < 1000
								? `${Math.round(distance)} м `
								: distance && distance > 1000 && distance / 1000 < 100
								? `${(distance / 1000).toFixed(2)} км `
								: distance && distance / 1000 > 100
								? `${Math.floor(distance / 1000)} км`
								: ''}
						</Text>
						<Text fontSize="12px" fontWeight="500" color="colors.DARK_GRAY">
							{address}
						</Text>
					</HStack>
				</Box>
				<Box>
					<Text fontSize="10px" fontWeight="500" lineHeight="20px">
						24 часа
					</Text>
				</Box>
			</Flex>
			<Divider />
		</Box>
	);
};
