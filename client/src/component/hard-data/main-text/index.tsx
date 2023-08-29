import { Box, Text } from '@chakra-ui/react';

export const MainText: React.FC = () => {
	return (
		<Box textAlign="center" mt="50px" mx="50px">
			<Box color="colors.BLACK" fontSize="22px" fontWeight="500">
				Мойте автомобиль с выгодой на МОЙ-КА!DS и получайте{' '}
				<Text
					color="colors.PRIMARY_RED"
					fontSize="22px"
					fontWeight="700"
					as="span"
				>
					10%
				</Text>{' '}
				кэшбек баллами на карту{' '}
				<Text
					color="colors.PRIMARY_RED"
					fontSize="22px"
					fontWeight="700"
					lineHeight="30%"
					as="span"
				>
					программы лояльности ЛУКОЙЛ.
				</Text>
			</Box>
		</Box>
	);
};
