import { Flex } from '@chakra-ui/react';
import {
	YMaps,
	Map,
	Placemark,
	GeolocationControl,
	ZoomControl,
} from '@pbe/react-yandex-maps';
import React, {useEffect, useState} from 'react';
import { CustomPlacemark } from '../placemark';
import GeoSVG from '../../../assets/icons/geo.svg';
import ActiveGeoSVG from '../../../assets/icons/geo-2.svg';
import { useCarWash } from '../../../context/carwash-context';
import { Navbar } from '../../nav-bar';
import useGeoLocation from "../../../hooks/location";

interface IYandexMaps {
	userPosition: Array<number>;
	carWashCoords: Array<number> | null;
	setCarWash: any;
	setCarWashCoords: any;
	setDrawerSwitch: any;
	setDistance: any;
	setCarWashMainInfo: any;
	setCarWashIdList: any;
	carWashIdList: number;
	drawerSwitch: string;
	setUserPosition: any;
}

export const YandexMaps: React.FC<IYandexMaps> = React.memo(
	({
		userPosition,
		carWashCoords,
		setCarWash,
		setCarWashCoords,
		setDrawerSwitch,
		setDistance,
		setCarWashMainInfo,
		setCarWashIdList,
		carWashIdList,
		drawerSwitch,
		setUserPosition,
	}) => {
		const { getCarWashList, store } = useCarWash();
		const defaultCords = [55.755811, 37.617617];

		const location = useGeoLocation();

		const [mapState, setMapState] = useState({
			center: defaultCords, // Default center
			zoom: 10,       // Default zoom level
		});


		useEffect(() => {
			async function getCarWashListWithCoords() {
				await getCarWashList();
			}
			getCarWashListWithCoords();
		}, []);



		useEffect(() => {
			if (location.loaded && location.coordinates) {
				// Set the map's center based on the user's location
				setUserPosition(location.coordinates);
				setMapState({
					center: location.coordinates,
					zoom: 14, // Zoom in for a closer view
				});
			}
		}, [location]);


		function getLocation() {
			if (navigator.geolocation) {
				navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
					if (permissionStatus.state === 'denied') {
						alert('Please allow location access.');
						window.location.href = "app-settings:location";
					} else {
						navigator.geolocation.getCurrentPosition((position) => {
							const { latitude, longitude } = position.coords;
							setUserPosition([latitude, longitude]);
						});
					}
				});
			} else {
				alert('Geolocation is not supported in your browser.');
			}
		}

		return (
			<>
					<Flex
						h="90%"
						w="100vw"
						justifyContent="space-evenly"
						alignItems="center"
						flexDirection="column"
					>
						<YMaps
							enterprise
							query={{
								apikey: '8933ab08-0e8f-418a-aa0f-292d4f89c156',
							}}
						>
							<Map
								width="100%"
								height="90%"
								state={mapState}
								modules={[
									'control.ZoomControl',
									'control.FullscreenControl',
									'geoObject.addon.balloon',
									'geolocation',
									'geocode',
									'control.GeolocationControl',
									'multiRouter.MultiRoute',
								]}
							>
								{store.carWashes.map((carWash: any, index: number) => {
									if (carWash.lat && carWash.lon) {
										return (
											<CustomPlacemark
												key={index}
												carWash={carWash}
												index={index}
												coords={[carWash.lat, carWash.lon]}
												carWashes={carWash.carwashes}
												setCarWash={setCarWash}
												icon={GeoSVG}
												activeIcon={ActiveGeoSVG}
												userPosition={location.coordinates ? location.coordinates : [55.755811, 37.617617]}
												getCoords={setCarWashCoords}
												getDistance={setDistance}
												size={[41, 41]}
												activeSize={[61, 61]}
												getInfo={setCarWashMainInfo}
												setCarWashId={setCarWashIdList}
												placemarkId={carWashIdList >= 0 ? carWashIdList : -1}
												setDrawerSwitch={setDrawerSwitch}
												placeMarkSwitch={drawerSwitch}
											/>
										);
									} else return null;
								})}
								{location.loaded && location.coordinates && (
									<Placemark
										key={98928397239231}
										options={{ preset: 'islands#redCircleDotIcon' }}
										geometry={location.coordinates}
									/>
								)}
								<GeolocationControl options={{ float: 'right' }} />
								<ZoomControl
									options={{
										position: {
											right: '10px',
											top: '150px',
										},
									}}
								/>
							</Map>
						</YMaps>
						<Navbar openList={setDrawerSwitch} />
					</Flex>
			</>
		);
	}
);
