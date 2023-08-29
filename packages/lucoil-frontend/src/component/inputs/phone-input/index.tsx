import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface IPhoneInput {
	value: string;
	setValue: (value: string) => void;
}

export const PhoneInput: React.FC<IPhoneInput> = ({ value, setValue }) => {
	const formatPhoneNumber = (input: string) => {
		let splitFormatter = input.split('');
		if (
			(input.length === 4 || input.length === 8 || input.length === 11) &&
			splitFormatter[splitFormatter.length - 1] === ' '
		) {
			splitFormatter.pop();
		} else if (
			input.length === 4 ||
			input.length === 8 ||
			input.length === 11
		) {
			splitFormatter.splice(input.length - 1, 0, ' ');
		}
		return splitFormatter.join('');
	};

	return (
		<Box mt="50px" width="100%">
			<Text fontWeight="700" fontSize="20px">
				Введите номер телефона
			</Text>
			<InputGroup display="flex" flexDir="row" alignItems="baseline">
				<InputLeftAddon
					border="0"
					bgColor="colors.WHITE"
					children="+7"
					fontWeight="500"
					pr="0px"
				/>
				<Input
					pl="10px"
					variant="flushed"
					type="tel"
					placeholder="000 000 00 00"
					width="100%"
					fontSize="15px"
					fontWeight="500"
					mb="16px"
					pb="0px"
					value={value}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						const input = event.target.value;
						const formatted = formatPhoneNumber(input);
						if (formatted.length <= 13) {
							setValue(formatted);
						}
					}}
				/>
			</InputGroup>
		</Box>
	);
};
