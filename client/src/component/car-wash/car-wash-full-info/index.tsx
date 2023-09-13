import { Box, Flex, Text } from '@chakra-ui/react';
import { CarWashMap } from '../car-wash-map-item';
import { TagButton } from '../../buttons/tag-button';
import { TagInfo } from '../../tag-info';

interface ICarWash {
	carWash: any;
	setDrawerSwitch: any;
	distance: number;
}

export const CarWashFullInfo: React.FC<ICarWash> = ({
	carWash,
	setDrawerSwitch,
	distance,
}) => {
	return (
		<Flex flexDir="column" h="80vh">
			<CarWashMap
				isDisabled={true}
				title={carWash.name}
				id={carWash.id}
				openTime="24 часа"
				address={carWash.address}
				distance={distance}
			/>
			<Flex
				pt="52px"
				h="100%"
				flexDirection="column"
				justifyContent="space-between"
			>
				{carWash.type === 'Portal' ? (
					<>
						<Box>
							<Text lineHeight="20px" fontSize="12px" color="colors.DARK_GRAY">
								Стоимость программ
							</Text>
							{carWash.price.map((program: any, index: number) => {
								return (
									<Box mb="8px" key={index}>
										<TagInfo
											label={`${program.name} ${program.cost} ₽`}
											bgColor="colors.PRIMARY_RED"
											color="colors.WHITE"
											fontSize="14px"
											height="20px"
										/>
									</Box>
								);
							})}
						</Box>
					</>
				) : (
					<Box>
						<Text lineHeight="20px" fontSize="12px" color="colors.DARK_GRAY">
							Программы
						</Text>
						<Flex flexDir="row" flexWrap="wrap">
							{carWash.price.map((program: any, index: number) => {
								return (
									<Box mr="6px" mb="7px" key={index}>
										<TagInfo
											label={program.name}
											bgColor="colors.WHITE_GRAY"
											color="colors.BLACK"
											fontSize="14px"
											height="20px"
										/>
									</Box>
								);
							})}
						</Flex>
					</Box>
				)}
				<Box mb="15px">
					<Text lineHeight="20px" fontSize="12px" color="colors.DARK_GRAY">
						Услуги
					</Text>
					<Flex flexDir="row" flexWrap="wrap">
						{carWash.tags &&
							carWash.tags.map((tag: any, index: number) => {
								return (
									<Box mr="6px" mb="7px" key={index}>
										<TagInfo
											label={tag.name}
											bgColor="colors.WHITE_GRAY"
											color="colors.BLACK"
											fontSize="14px"
											height="20px"
										/>
									</Box>
								);
							})}
					</Flex>
				</Box>
				<Box w="100%" display="flex" justifyContent="center" pb="16px">
					<TagButton
						distance={distance}
						switchCarWashType="bay"
						carWash={carWash}
						onClick={setDrawerSwitch}
						height="50px"
						fontSize="15px"
						bgColor="colors.SECONDARY_RED"
						color="colors.PRIMARY_RED"
						label="Оплатить мойку"
					/>
				</Box>
			</Flex>
		</Flex>
	);
};
