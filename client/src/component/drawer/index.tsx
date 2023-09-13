import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerBody,
	DrawerCloseButton,
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
	isList?: boolean;
	isBay?: boolean;
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
	isList = false,
	isCloseOnOverlayClick = true,
	isBay=false,
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
			<DrawerContent pb="62px" pt={isList ? "0px" : "0px"} borderTopRadius={topBR ? topBR : '16px'}>
				{isList && (
					<>
						<DrawerCloseButton/>
						<DrawerHeader mb="10px"></DrawerHeader>
						
					</>
				)}
				<DrawerBody pl={pl ? pl : '16px'} pr={pr ? pr : '16px'} pt={isList ? "0px" : isBay ? "5px" : "20px"}>
					{children}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
