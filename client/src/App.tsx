import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { OrderPage } from './pages/order';
import { OrderProvider } from './context/order-context';
import { CarWashProvider } from './context/carwash-context';
import { InstructionPage } from './pages/instruction';
import { UserProvider } from './context/user-context';
import { PaymentPage } from './pages/payment';
import { LoginPage } from './pages/login';
import { VerificationPage } from './pages/verification';
import { SuccessPaymentPage } from './pages/success-payment';
import { ErrorPaymentPage } from './pages/error-payment';

function App() {
	return (
		<>
			<UserProvider>
				<OrderProvider>
					<CarWashProvider>
						<Routes>
							<Route path="/" element={<InstructionPage />} />
							<Route path="/#/login" element={<LoginPage />} />
							<Route path="/verification" element={<VerificationPage />} />
							<Route path="/home" element={<HomePage />} />
							<Route path="/order" element={<OrderPage />} />
							<Route path="/pay" element={<PaymentPage />} />
							<Route path="/success" element={<SuccessPaymentPage />} />
							<Route path="/error" element={<ErrorPaymentPage />} />
						</Routes>
					</CarWashProvider>
				</OrderProvider>
			</UserProvider>
		</>
	);
}

export default App;
