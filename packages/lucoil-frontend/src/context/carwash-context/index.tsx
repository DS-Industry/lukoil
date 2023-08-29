import React, { ReactNode } from 'react';
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
	getStore: () => void;
}

const CarWashContext = React.createContext<ICarWashContext | null>(null);

const CarWashProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [store, setStore] = React.useState({
		carWash: null,
		carWashes: [],
		pingStatus: null,
		isLoading: false,
		program: '',
		error: null,
	});

	const updateStore = (newState: ICarWashStorePartial) => {
		const state = { ...store, ...newState };
		secureLocalStorage.setItem('carWash-store', state);
		getStore();
	};

	const getStore = () => {
		const store: ICarWashStorePartial | any =
			secureLocalStorage.getItem('carWash-store');
		setStore(store);
	};

	const getCarWashList = async () => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get('carwash/list');
			console.log(response.data);
			updateStore({ carWashes: response.data, isLoading: false, error: null });
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, carWashes: null, error });
		}
	};

	const pingCarWash = async (carWashId: number, bayNumber: number) => {
		try {
			updateStore({ isLoading: true });
			const response = await api.get(
				`carwash/ping?carWashId=${carWashId}&bayNumber=${bayNumber}`
			);
			console.log(response.data);
			if (response.status === 200) {
				updateStore({ pingStatus: 200, isLoading: false, error: null });
			}
			return;
		} catch (error) {
			console.log(error);
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
				getStore,
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
