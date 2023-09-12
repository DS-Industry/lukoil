import { Flex } from '@chakra-ui/react';
import { CustomYMap } from '../../component/ya-map/drawers';
import { Header } from '../../component/header';

export const HomePage = () => {
	return (
		<>
			<Flex direction="column" className="App" h="85vh">
				<Header label="Автомойки" />
				<CustomYMap />
			</Flex>
		</>
	);
};
