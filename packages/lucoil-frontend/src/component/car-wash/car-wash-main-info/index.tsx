import { Box, Flex } from '@chakra-ui/react';
import { CarWashMap } from '../car-wash-map-item';
import { TagInfo } from '../../tag-info';
import { TagButton } from '../../buttons/tag-button';

interface ICarWashMainInfo {
	carWash: any;
	distance: number;
	setCarWash: any;
	setDrawerSwitch: any;
	carWashMainInfo: any;
}

export const CarWashMainInfo: React.FC<ICarWashMainInfo> = ({
	carWash,
	distance,
	setCarWash,
	setDrawerSwitch,
	carWashMainInfo,
}) => {
	return (
		<Flex flexDirection="column">
			<Box w="100%" mb="20px">
				<CarWashMap
					isDisabled={false}
					carWash={carWash}
					id={carWash.id}
					title={carWash.name}
					openTime="24 часа"
					address={carWash.address}
					distance={distance}
					getCarWash={setCarWash}
					setCarWashDrawer={setDrawerSwitch}
				/>
				{distance && distance > 500 && (
					<Flex w="100%" justifyContent="center" mt="20px">
						<TagInfo
							label="АМС слишком далеко от вас!"
							bgColor="colors.SECONDARY_RED"
							color="colors.PRIMARY_RED"
							fontSize="14px"
							height="28px"
						/>
					</Flex>
				)}
			</Box>

			{carWashMainInfo && carWashMainInfo.carWashes.length < 2 && (
				<Box
					w="100%"
					h="auto"
					display="flex"
					justifyContent="space-between"
					mt="15px"
				>
					<TagButton
						switchCarWashType="bay"
						onClick={setDrawerSwitch}
						carWash={carWash}
						distance={distance}
						height="50px"
						fontSize="15px"
						bgColor="colors.SECONDARY_RED"
						color="colors.PRIMARY_RED"
						label="Оплатить мойку"
					/>
				</Box>
			)}
		</Flex>
	);
};
