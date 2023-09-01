import React from 'react';
import secureLocalStorage from 'react-secure-storage';
import api from '../../api';

interface IUserPartial {
	partnerCard?: string | number | null;
	phNumber?: string | null;
	token?: string | null;
	isLoading?: boolean;
	error?: any | null;
}

interface IUserContext {
	user: IUserPartial;
	updateStore: (data: IUserPartial) => void;
	signUp: (verificationCode: string) => void;
	signIn: (verificationCode: string) => void;
	sendPhNumber: (phNumber: string) => void;
	getStore: () => void;
}

const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUserPartial>({
		partnerCard: null,
		phNumber: null,
		token: null,
		isLoading: true,
		error: null,
	});

	const updateStore = (data: IUserPartial) => {
		const state = { ...user, ...data };
		secureLocalStorage.setItem('user-store', state);
		getStore();
	};

	const getStore = () => {
		let store: IUserPartial | any = secureLocalStorage.getItem('user-store');
		console.log('herer 3232323');
		console.log('this is store', store);
		setUser(store);
	};

	const sendPhNumber = async (phNumber: string) => {
		try {
			updateStore({ isLoading: true });
			const phone = phNumber.replaceAll(' ', '');
			console.log('Отправка кода на номер ->', phone);
			const response = await api.post('/auth/send/otp', {
				phone,
			});
			console.log(response.data);
			updateStore({
				isLoading: false,
				phNumber,
				error: null,
			});
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, error, phNumber: null });
		}
	};

	const signUp = async (otp: string) => {
		try {
			const partnerCard = user.partnerCard;
			const phone = user.phNumber?.replaceAll(' ', '');
			updateStore({ isLoading: true });
			console.log('Отправка кода для регистрации');
			const response = await api.post('/auth/register', {
				phone,
				otp,
				partnerCard,
			});
			console.log(response.data);
			updateStore({
				isLoading: false,
				token: response.data.accessToken,
				phNumber: response.data.user.phone,
				error: null,
			});
		} catch (error: any) {
			console.log(error);
			updateStore({ isLoading: false, error });
		}
	};
	const signIn = async (otp: string) => {
		try {
			updateStore({ isLoading: true });
			const phone = user.phNumber?.replaceAll(' ', '');
			console.log('Отправка кода для авторизации');
			console.log('Номер телефона: ', phone);
			console.log(otp);
			const response = await api.post('/auth/login', {
				phone,
				otp,
			});
			updateStore({
				isLoading: false,
				token: response.data.accessToken,
				phNumber: response.data.user.phone,
				partnerCard: response.data.user.partnerCard,
				error: null,
			});
		} catch (error) {
			console.log(error);
			updateStore({ isLoading: false, error: error });
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
				signIn,
				signUp,
				sendPhNumber,
				getStore,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useOrder must be used within a OrderProvider');
	}
	return context;
};

export { UserContext, UserProvider, useUser };
