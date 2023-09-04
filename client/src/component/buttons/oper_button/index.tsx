import { Button } from '@chakra-ui/react';
import { useOrder } from '../../../context/order-context';
import { useUser } from '../../../context/user-context';
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
}

export const OperButton: React.FC<IOperButton> = ({
	isSum = false,
	title,
	onClick,
	disabled,
	value,
	isOper = true,
	switchCarWashType,
	isLoading=false
}) => {
	const { updateStore } = useOrder();
	const { updateStore: updateUserStore } = useUser();
	const { store: carWashStore } = useCarWash();

	const handleClick = () => {
		if (switchCarWashType === 'tel') {
			updateUserStore({
				phNumber: value,
			});
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
		<>
			<Button
				isLoading={isLoading}
				bg={!disabled ? 'colors.PRIMARY_RED' : '#D2D3D9'}
				w="100%"
				h="46px"
				mb="64px"
				borderRadius="4px"
				color="colors.WHITE"
				onClick={handleClick}
				isDisabled={!isOper ? false : value ? false : disabled}
			>
				{title}
			</Button>
		</>
	);
};
