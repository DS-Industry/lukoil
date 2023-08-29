import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerBody,
	DrawerHeader,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ICustomDrawer {
	children: ReactNode;
	isOpen: boolean;
	pl?: string;
	pr?: string;
	topBR?: string;
	size?: string;
	isConf?: boolean;
	isCloseOnOverlayClick?: boolean;
	onClose: () => void;
}

export const CustomDrawer: React.FC<ICustomDrawer> = ({
	children,
	isOpen,
	onClose,
	pl,
	pr,
	topBR,
	size,
	isConf,
	isCloseOnOverlayClick = true,
}) => {
	return (
		<Drawer
			isOpen={isOpen}
			placement="bottom"
			onClose={onClose}
			size={size}
			closeOnOverlayClick={isCloseOnOverlayClick}
		>
			<DrawerOverlay />
			<DrawerContent borderTopRadius={topBR ? topBR : '16px'}>
				{isConf ? '' : <DrawerCloseButton />}
				<DrawerHeader></DrawerHeader>
				<DrawerBody pl={pl ? pl : '16px'} pr={pr ? pr : '16px'}>
					{children}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
