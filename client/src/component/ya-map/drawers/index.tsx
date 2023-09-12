import { useState } from 'react';
import { CustomDrawer } from '../../drawer';
import { CarWashFullInfo } from '../../car-wash/car-wash-full-info';
import { NumInput } from '../../inputs/num-input';
import { useNavigate } from 'react-router-dom';
import { PortalProgramList } from '../../portal/portal-program-list';
import { ListPage } from '../../../pages/list';
import { YandexMaps } from '../map';
import { CarWashMainInfo } from '../../car-wash/car-wash-main-info';
import { SelectBay } from '../../select-bay';

export const CustomYMap = () => {
	const navigate = useNavigate();

	const [userPosition, setUserPosition] = useState<number[]>([]);
	const [drawerSwitch, setDrawerSwitch] = useState<string>('');
	const [carWashIdList, setCarWashIdList] = useState<number>(-1);
	const [carWashCoords, setCarWashCoords] = useState<Array<number>>();
	const [distance, setDistance] = useState<number>(0);
	const [carWashMainInfo, setCarWashMainInfo] = useState<any>();
	const [carWash, setCarWash] = useState<any>();


	const handleCloseDrawer = () => {
		setDrawerSwitch('');
	};

	const navigateToOrder = () => {
		navigate('/order');
	};
	return (
		<>
			<YandexMaps
				userPosition={userPosition}
				carWashCoords={carWashCoords ? carWashCoords : null}
				carWashIdList={carWashIdList}
				setCarWash={setCarWash}
				setCarWashCoords={setCarWashCoords}
				setCarWashIdList={setCarWashIdList}
				setCarWashMainInfo={setCarWashMainInfo}
				setDistance={setDistance}
				setDrawerSwitch={setDrawerSwitch}
				drawerSwitch={drawerSwitch}
				setUserPosition={setUserPosition}
			/>

			<CustomDrawer
				key={100}
				isOpen={drawerSwitch === 'list'}
				onClose={handleCloseDrawer}
				topBR="0"
				pl="0"
				pr="0"
				isList={true}
			>
				<ListPage
					key={1001}
					userPosition={userPosition}
					openFullInfo={setDrawerSwitch}
					setCarWashCoords={setCarWashCoords}
					setCarWash={setCarWash}
					setCarWashIdList={setCarWashIdList}
				/>
			</CustomDrawer>

			<CustomDrawer
				key={1011}
				isOpen={drawerSwitch === 'main' ? true : false}
				onClose={handleCloseDrawer}
			>
				{carWashMainInfo &&
					carWashMainInfo.carWashes.map((carWash: any, index: number) => {
						return (
							<CarWashMainInfo
								key={index}
								distance={distance}
								carWash={carWash}
								setCarWash={setCarWash}
								setDrawerSwitch={setDrawerSwitch}
								carWashMainInfo={carWashMainInfo}
							/>
						);
					})}
			</CustomDrawer>

			<CustomDrawer
				isOpen={drawerSwitch === 'full-info' ? true : false}
				onClose={handleCloseDrawer}
			>
				<CarWashFullInfo
					distance={distance}
					carWash={carWash && carWash}
					setDrawerSwitch={setDrawerSwitch}
				/>
			</CustomDrawer>

			{carWash && (
				<>
					<CustomDrawer
						isOpen={drawerSwitch === 'bay'}
						onClose={handleCloseDrawer}
					>
						<SelectBay carWash={carWash} onClick={setDrawerSwitch} />
					</CustomDrawer>
					<CustomDrawer
						isOpen={drawerSwitch === 'sum'}
						onClose={handleCloseDrawer}
					>
						<NumInput
							nameMessage="Сумма"
							switchCarWashType={drawerSwitch}
							minValue={carWash.limitMinCost}
							maxValue={carWash.limitMaxCost}
							onClick={navigateToOrder}
							label="Введите сумму"
						/>
					</CustomDrawer>
					<CustomDrawer
						isOpen={drawerSwitch === 'portal'}
						onClose={handleCloseDrawer}
					>
						<PortalProgramList programList={carWash && carWash.price} />
					</CustomDrawer>
				</>
			)}
		</>
	);
};
