import { Button } from '@chakra-ui/react';
import { useOrder } from '../../../context/order-context';
import { useCarWash } from '../../../context/carwash-context';

interface IOperButton {
	title: string;
	onClick: any;
	disabled?: boolean;
	value?: string;
	isSum?: boolean;
	isOper?: boolean;
	switchCarWashType?: string;
	isLoading?: boolean;
	isOrder?: boolean;
}

export const OperButton: React.FC<IOperButton> = ({
	isSum = false,
	title,
	onClick,
	disabled = false,
	value,
	isOper = true,
	switchCarWashType,
	isLoading=false,
}) => {
	const { updateStore } = useOrder();
	const { store: carWashStore } = useCarWash();

	const handleClick = () => {
		if (switchCarWashType === 'tel') {
			onClick();
		}
		if (switchCarWashType === 'bay') {
			updateStore({
				bayNumber: Number(value),
			});
			if (carWashStore.carWash.type === 'SelfService') {
				onClick('sum');
			} else {
				onClick('portal');
			}
		}

		if (switchCarWashType === 'sum') {
			updateStore({
				sum: Number(value),
			});
			onClick();
		}

		if (!switchCarWashType && !isSum) {
			onClick();
		}
	};
	return (
		<Button
			isLoading={isLoading}
			bgColor={disabled ? '#D2D3D9': 'colors.PRIMARY_RED'}
			w="100%"
			h="46px"
			mb="16px"
			borderRadius="4px"
			color="colors.WHITE"
			onClick={handleClick}
			isDisabled={!isOper ? false : value ? false : disabled}
			_hover={disabled ? { backgroundColor: '#D2D3D9'} : { backgroundColor: 'colors.PRIMARY_RED'}}
		>
			{title}
		</Button>
	);
};
