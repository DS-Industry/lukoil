import { Box, Divider, Text } from '@chakra-ui/react';
import { CarWash } from '../../component/car-wash/car-wash-list-item';
import { ListInput } from '../../component/inputs/list-input';
import { useEffect, useState } from 'react';
import { useCarWash } from '../../context/carwash-context';
import { calculateDistance } from '../../utill/functions';

interface IListPage {
	openFullInfo: any;
	setCarWashCoords: any;
	setCarWash: any;
	setCarWashIdList: any;
	userPosition: number[];
}

export const ListPage: React.FC<IListPage> = ({
	openFullInfo,
	setCarWashCoords,
	setCarWash,
	setCarWashIdList,
	userPosition,
}) => {
	const [term, setTerm] = useState<string>('');
	const { store } = useCarWash();
	const [carWashList, setCarWashList] = useState<any>();

	useEffect(() => {
		const list: Array<any> = [];
		store.carWashes.forEach((carWashWithCoords: any, index: number) => {
			return carWashWithCoords.carwashes.map((carWash: any) => {
				return list.push({
					id: index,
					carWash,
					coords: [carWashWithCoords.lat, carWashWithCoords.lon],
				});
			});
		});
		setCarWashList(list);
	}, []);

	return (
		<Box>
			<Box
				w="100%"
				bg="#F8F8F8"
				pt="12px"
				pb="12px"
				display="flex"
				justifyContent="space-between"
			>
				<ListInput setTerm={setTerm} />
			</Box>
			<Divider />
			<Box w="100%" h="30px" bg="#F8F8F8">
				<Text
					ml="12px"
					pt="5px"
					pb="5px"
					color="colors.DARK_GRAY"
					fontSize="10px"
					fontWeight="500"
					lineHeight="20px"
				>
					ВСЕ
				</Text>
			</Box>
			{carWashList &&
				carWashList
					.filter((carWashWithCoords: any) => {
						return (
							carWashWithCoords.carWash.name.includes(term) ||
							carWashWithCoords.carWash.address.includes(term)
						);
					})
					.map((filteredCarWash: any, index: number) => {
						console.log(filteredCarWash);
						const distance = calculateDistance(
							userPosition[0],
							userPosition[1],
							filteredCarWash.coords[0],
							filteredCarWash.coords[1]
						);
						return (
							<CarWash
								distance={distance}
								setCarWashIdList={setCarWashIdList}
								setCarWash={setCarWash}
								carWash={filteredCarWash.carWash}
								openFullInfo={openFullInfo}
								key={index}
								index={filteredCarWash.id}
								setCarWashCoords={setCarWashCoords}
								coords={filteredCarWash.coords}
								title={filteredCarWash.carWash.name}
								address={filteredCarWash.carWash.address}
							/>
						);
					})}
		</Box>
	);
};
