import React, {useEffect} from 'react';
import secureLocalStorage from 'react-secure-storage';
import api from '../../api';

interface IUserError {
	message : string,
	code: number
}

interface IUserPartial {
	partnerCard?: string | null;
	phNumber?: string | null;
	token?: string | null;
	isLoading?: boolean;
	error?: IUserError | null;
	isAuth? : boolean | null;
}``

interface IUserContext {
	user: IUserPartial;
	updateStore: (data: IUserPartial) => void;
	signIn: (verificationCode: string, phone: string, partnerCard: string) => void;
	sendPhNumber: (phNumber: string) => void;
	updatePartnerCard: (partnerCard?: string, phone?: string | null) => void;
	getMe: () => void;
}

const initState: IUserPartial = {
	partnerCard: null,
	phNumber: null,
	token: null,
	isLoading: true,
	error: null,
	isAuth: null,
}

const getInitState = () => {
	const user: IUserPartial | any = secureLocalStorage.getItem('user-store');
	return user ? user : initState;
}


const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<IUserPartial>(getInitState);

	useEffect(() => {
		secureLocalStorage.setItem('user-store', user);
	}, [user])

	const updateStore = (data: IUserPartial) => {
		setUser((prev) => ({
			...prev,
			...data
		}));
	};


	const sendPhNumber = async (phNumber: string) => {
		try {
			updateStore({ isLoading: true });
			const formattedPhone = phNumber.replaceAll(' ', '');
			const response = await api.post('/auth/send/otp', {
				phone: formattedPhone,
			});
			updateStore({
				isLoading: false,
				error: {message: response.data.message, code: response.status},
			});
		} catch (error: any) {
			const customError: IUserError = { code: error.response?.data?.statusCode || 500, message: 'Приносим извинения повторите попытку еще раз' };
			updateStore({ isLoading: false, error: customError });
		}
	};

	const getMe = async () => {
		try {
			const response = await api.get('/auth/me',
				{
					headers: {
						Authorization: `Bearer ${user && user.token ? user.token : null}`,
					},
				}
			);
			updateStore({
				isLoading: false,
				isAuth: true
			})
		} catch (error: any) {
			const code = error.response?.data?.statusCode;
			let message;
			switch (code) {
				case 404:
					message = 'Пользователь с данными номером телефона не найден';
					break;
				case 401:
					message = 'Пользователь неавторизованный';
					break;
				default:
					message = 'Что то пошло не так...';
					break;
			}
			const customError: IUserError = { code, message };
			updateStore({ isLoading: false, isAuth: false, error: customError });
		}
	}

	const signIn = async (otp: string, phone: string, partnerCard: string) => {
		const formattedPhone = phone.replaceAll(' ', '');
		try {
			updateStore({ isLoading: true });

			// Attempt to log in
			const loginResponse = await api.post('/auth/login', {
				phone: formattedPhone,
				otp,
				partnerCard
			});

			updateStore({
				isLoading: false,
				token: loginResponse.data.accessToken,
				phNumber: loginResponse.data.user.phone,
				partnerCard: loginResponse.data.user.partnerCard,
				isAuth: true,
				error: null,
			});
		} catch (error: any) {
			const code: number = error.response?.data?.statusCode;

			if (code === 404) {
				// If the error code is 404, user not found, attempt registration
				try {
					const registerResponse = await api.post('/auth/register', {
						phone: formattedPhone,
						otp,
						partnerCard,
					});

					updateStore({
						isLoading: false,
						token: registerResponse.data.accessToken,
						phNumber: registerResponse.data.user.phone,
						partnerCard: registerResponse.data.user.partnerCard,
						isAuth: true,
						error: null,
					});
				} catch (registerError: any) {
					const code = registerError.response?.data?.statusCode;
					let message;
					switch (code) {
						case 404:
							message = 'Пользователь с данными номером телефона уже зарегистрирован';
							break;
						case 401:
							message = 'Введен не верный код';
							break;
						default:
							message = 'Что то пошло не так...';
							break;
					}
					const customError: IUserError = { code, message };
					updateStore({ isLoading: false, isAuth: false, error: customError });
				}
			} else {
				const code = error.response?.data?.statusCode;
				let message;
				switch (code) {
					case 404:
						message = 'Пользователь с данными номером телефона не найден';
						break;
					case 401:
						message = 'Введен не верный код';
						break;
					default:
						message = 'Что то пошло не так...';
						break;
				}
				const customError: IUserError = { code, message };
				updateStore({ isLoading: false, isAuth: false, error: customError });
			}
		}
	};

	const updatePartnerCard = async (partnerCard?: string, phone?: string | null) => {
		console.log(`UPDATING CARDINFO`);
		console.log(`${partnerCard} --> ${phone}`);
		if (!partnerCard || !phone) {
			const customError: IUserError = { code: 500, message: 'Ошибка соединения с сервером' };
			updateStore({ isLoading: false, error: customError });
		}
		try {
			updateStore({ isLoading: true });
			const response = await api.post('/user/update', {
				phone: phone,
				partnerCard: partnerCard
			},
			{
				headers: {
					Authorization: `Bearer ${user && user.token ? user.token : null}`,
				}
			});

			updateStore({ isLoading: true, partnerCard: response.data.partnerCard });
		}catch (error: any) {
			console.log(JSON.stringify(error));
			const customError: IUserError = { code: error.response?.data?.statusCode || 500, message: 'Ошибка соединения с сервером' };
			updateStore({ isLoading: false, error: customError });
		}
	}
	return (
		<UserContext.Provider
			value={{
				user,
				updateStore,
				signIn,
				sendPhNumber,
				getMe,
				updatePartnerCard
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
