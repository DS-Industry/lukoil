import { Avatar, Flex, Text } from '@chakra-ui/react';

interface IInstructionList {
	index: number;
	info: string;
}

export const InstructionList: React.FC<IInstructionList> = ({
	index,
	info,
}) => {
	return (
		<Flex
			justifyContent="flex-start"
			alignItems="flex-start"
			pl="30px"
			pr="30px"
		>
			<Avatar
				name={String(index + 1)}
				w="28px"
				h="28px"
				bgColor="colors.PRIMARY_RED"
				fontSize="16px"
				fontWeight="600"
			/>
			<Text ml="16px" fontSize="14px" fontWeight="600" color="colors.BLACK">
				{info}
			</Text>
		</Flex>
	);
};
