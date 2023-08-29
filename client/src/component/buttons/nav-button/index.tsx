import { IconButton } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface INavButton {
	ariaLabel: string;
	icon: ReactElement;
	filters?: boolean;
	link: string;
}

export const NavButton: React.FC<INavButton> = ({
	ariaLabel,
	icon,
	filters = false,
	link,
}) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(link);
	};

	return (
		<IconButton
			color="colors.PRIMARY_RED"
			bg="white"
			aria-label={ariaLabel}
			fontSize={filters ? '28px' : '21px'}
			ml="5px"
			pl="5px"
			isRound
			icon={icon}
			onClick={handleClick}
		/>
	);
};
