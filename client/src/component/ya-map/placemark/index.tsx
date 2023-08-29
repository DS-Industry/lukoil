import { Placemark } from '@pbe/react-yandex-maps/';
import { useEffect, useState } from 'react';
import { calculateDistance } from '../../../utill/functions';

interface ICustomPlacemark {
	index: number | null;
	carWash: any;
	placemarkId: number;
	userPosition: Array<number>;
	coords: Array<number>;
	getCoords: any;
	icon: string;
	activeIcon: string;
	size: Array<number>;
	activeSize: Array<number>;
	carWashes: Array<any>;
	getInfo: any;
	setDrawerSwitch: any;
	placeMarkSwitch: string;
	getDistance: any;
	setPlaceMarkStyle: any;
	setCarWash: any;
	setCarWashId: any;
}

export const CustomPlacemark: React.FC<ICustomPlacemark> = ({
	index,
	placemarkId,
	coords,
	icon,
	activeIcon,
	activeSize,
	size,
	carWashes,
	getInfo,
	setDrawerSwitch,
	placeMarkSwitch,
	userPosition,
	getDistance,
	getCoords,
	setPlaceMarkStyle,
	setCarWash,
	setCarWashId,
}) => {
	const [placeMarkParams, setPlaceMarkParams] = useState({
		icon,
		size,
	});

	useEffect(() => {
		if (placemarkId === index) {
			const distance = calculateDistance(
				userPosition[0],
				userPosition[1],
				coords[0],
				coords[1]
			);
			getDistance(distance);
		}
	});

	useEffect(() => {
		const updatePlaceMark = async () => {
			if (placemarkId === index) {
				if (
					placeMarkSwitch &&
					placeMarkSwitch !== 'list' &&
					placeMarkSwitch !== 'tel'
				) {
					setPlaceMarkParams({
						icon: activeIcon,
						size: activeSize,
					});
				} else {
					setPlaceMarkParams({
						icon,
						size,
					});
				}
			}
		};
		updatePlaceMark();
	}, [placeMarkSwitch]);

	return (
		<Placemark
			key={index}
			geometry={coords}
			options={{
				iconLayout: 'default#image',
				iconImageHref: placeMarkParams.icon,
				iconImageSize: placeMarkParams.size,
			}}
			onClick={() => {
				if (carWashes.length < 2) {
					setCarWash(carWashes[0]);
				}
				getCoords(coords);
				setCarWashId(index);
				getInfo({
					id: index,
					carWashes,
				});
				setDrawerSwitch('main');
				setPlaceMarkStyle('main');
			}}
		/>
	);
};
