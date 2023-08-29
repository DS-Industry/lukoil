import { Box, Image } from '@chakra-ui/react';
import LogoImg from '../../assets/logo/header_logo.svg';

export const Logo = () => {
	return (
		<Box mt="30px">
			<Image h="25vh" w="50vw" src={LogoImg} alt="logo car wash" mr="0" />
		</Box>
	);
};
