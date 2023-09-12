import React, {ReactNode, useEffect} from 'react';
import api from '../../api';
import secureLocalStorage from 'react-secure-storage';

interface ICarWashStorePartial {
	carWash?: any | null;
	carWashes?: any | [];
	pingStatus?: any | null;
	isLoading?: boolean;
	program?: string;
	error?: any | null;
}

interface ICarWashContext {
	store: ICarWashStorePartial;
	getCarWashList: () => void;
	pingCarWash: (carWashId: number, bayNumber: number) => void;
	updateStore: (newState: ICarWashStorePartial) => void;
}

const initState: ICarWashStorePartial = {
	carWash: null,
	carWashes: [],
	pingStatus: null,
	isLoading: false,
	program: '',
	error: null,
}

const getInitState = () => {
	const store: ICarWashStorePartial | any = secureLocalStorage.getItem('carWash-store');
	return store ? store : initState;
}


const CarWashContext = React.createContext<ICarWashContext | null>(null);

const CarWashProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [store, setStore] = React.useState<ICarWashStorePartial>(getInitState);


	useEffect(() => {
		secureLocalStorage.setItem('carWash-store', store);
	}, [store]);

	const updateStore = (data: ICarWashStorePartial) => {
		setStore((prev) => ({
			...prev,
			...data
		}));
	};

	const getCarWashList = async () => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get('carwash/list');
			updateStore({ carWashes: response.data, isLoading: false, error: null });
		} catch (error) {
			updateStore({ isLoading: false, carWashes: null, error });
		}
	};

	const pingCarWash = async (carWashId: number, bayNumber: number) => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get(
				`carwash/ping?carWashId=${carWashId}&bayNumber=${bayNumber}`
			);
			if (response.status === 200) {
				updateStore({ pingStatus: 200, isLoading: false, error: null });
			}
			return;
		} catch (error) {
			updateStore({ isLoading: false, pingStatus: 400, error });
		}
	};

	return (
		<CarWashContext.Provider
			value={{
				store,
				getCarWashList,
				pingCarWash,
				updateStore,
			}}
		>
			{children}
		</CarWashContext.Provider>
	);
};

const useCarWash = () => {
	const context = React.useContext(CarWashContext);
	if (!context) {
		throw new Error('useCarWash must be used within a CarWashProvider');
	}
	return context;
};

export { CarWashContext, CarWashProvider, useCarWash };
