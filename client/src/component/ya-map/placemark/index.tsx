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
	setCarWash,
	setCarWashId,
}) => {
	const [placeMarkParams, setPlaceMarkParams] = useState({
		icon,
		size,
		offset: [-size[0] / 2, -size[1]],
	});
	const [distance, setDistance] = useState<number>(0);
	const balloonData =
		'<div class="baloon-content .ymaps-2-1-79-balloon__tail .ymaps-2-1-79-balloon__layout" ><p> АМС далеко от вас </p></div>';

	useEffect(() => {
		const calcDistance = calculateDistance(
			userPosition[0],
			userPosition[1],
			coords[0],
			coords[1]
		);
		setDistance(calcDistance);
	}, []);

	useEffect(() => {
		const updatePlaceMark = () => {
			if (placemarkId === index) {
				if (
					placeMarkSwitch &&
					placeMarkSwitch !== 'list' &&
					placeMarkSwitch !== 'tel'
				) {
					setPlaceMarkParams({
						icon: activeIcon,
						size: activeSize,
						offset: [-activeSize[0] / 2, -activeSize[1]],
					});
				} else {
					setPlaceMarkParams({
						icon,
						size,
						offset: [-size[0] / 2, -size[1]],
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
			instanceRef={(ref: any) => {
				if (distance > 500 && placemarkId === index) {
					if (placeMarkSwitch === 'bay') {
						ref && ref.balloon.open();
					} else {
						ref && ref.balloon.close();
					}
				}
			}}
			options={{
				iconLayout: 'default#image',
				iconImageHref: placeMarkParams.icon,
				iconImageSize: placeMarkParams.size,
				iconImageOffset: placeMarkParams.offset,
				hideIconOnBalloonOpen: false,
				balloonMinHeight: 10,
				balloonCloseButton: false,
				balloonOffset: [-3, 53],
				openBalloonOnClick: false,
				openEmptyBalloon: true,
			}}
			defaultProperties={{
				balloonContentBody: balloonData,
				balloonPanelMaxMapArea: 0,
			}}
			modules={[
				//чтобы видеть хинты и балуны подключаем данные модули
				'objectManager.addon.objectsBalloon',
			]} 
			onClick={() => {
				if (carWashes.length < 2) {
					setCarWash(carWashes[0]);
				}
				getDistance(distance);
				getCoords(coords);
				setCarWashId(index);
				getInfo({
					id: index,
					carWashes,
				});

				setDrawerSwitch('main');
			}}
		/>
	);
};
