import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface IListInput {
	setTerm: (element: string) => void;
}

export const ListInput: React.FC<IListInput> = ({ setTerm }) => {
	const [value, setValue] = useState<string>('');
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		setTerm(event.target.value);
	};

	return (
		<InputGroup mx='16px'>
			<InputLeftElement color="#828286">
				<FaMagnifyingGlass />
			</InputLeftElement>
			<Input
				bgColor="#EBEBEC"
				value={value}
				onChange={handleChange}
				placeholder="По номеру, городу или улице"
				_placeholder={{
					color: 'colors.DARK_GREY',
					fontSize: '15px',
					fontWeight: '500',
					lineHeight: '20px',
				}}
			/>
		</InputGroup>
	);
};
