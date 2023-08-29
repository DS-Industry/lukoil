import { Flex, Text } from '@chakra-ui/react';

interface IHeader {
	label: string;
	bgcolor?: string;
	fontSize?: string;
	fontWeight?: string;
	flexPos?: string;
	paddingLeft?: string;
}

export const Header: React.FC<IHeader> = ({
	label,
	bgcolor = '#F8F8F8',
	fontSize = '15px',
	fontWeight = '600',
	flexPos = 'center',
	paddingLeft = '0',
}) => {
	return (
		<Flex
			h="7vh"
			w="100%"
			bgColor={bgcolor}
			justifyContent={flexPos}
			alignItems="center"
		>
			<Text
				fontSize={fontSize}
				fontWeight={fontWeight}
				pl={paddingLeft}
				lineHeight="20px"
			>
				{label}
			</Text>
		</Flex>
	);
};
