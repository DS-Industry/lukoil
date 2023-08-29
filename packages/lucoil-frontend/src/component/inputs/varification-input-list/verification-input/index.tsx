import { Input } from '@chakra-ui/react';
import { ChangeEvent, RefObject } from 'react';
import { useUser } from '../../../../context/user-context';

interface IVerificationCode {
	firstN: string;
	secondN: string;
	thirdN: string;
	fourthN: string;
}
interface IVerificationInput {
	index: number;
	reference: RefObject<HTMLInputElement>;
	inputRefs: Array<RefObject<HTMLInputElement>>;
	code: IVerificationCode;
	setValue: any;
}

export const VerificationInput: React.FC<IVerificationInput> = ({
	setValue,
	index,
	code,
	reference,
	inputRefs,
}) => {
	const { user } = useUser();

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
		firstRef: RefObject<HTMLInputElement> | null,
		lastRef: RefObject<HTMLInputElement> | null,
		currRef: RefObject<HTMLInputElement> | null,
		nextRef: RefObject<HTMLInputElement> | null,
		prevRef: RefObject<HTMLInputElement> | null,
		index: string
	) => {
		const input = event.target.value;
		if (input.length < 2 && Number(input) >= 0 && currRef) {
			setValue((prevValue: any) => ({
				...prevValue,
				[index]: input,
			}));
			if (nextRef && nextRef.current && input) {
				nextRef.current.focus();
			} else if (currRef === lastRef) {
				firstRef?.current?.focus();
			} else {
				prevRef?.current?.focus();
			}
		}
	};

	return (
		<Input
			autoFocus={index === 0}
			disabled={user.isLoading}
			borderRadius="9px"
			borderColor="colors.WHITE"
			bgColor="colors.SECONDARY_RED"
			fontSize="28px"
			fontWeight="700"
			p="16px"
			h="55px"
			w="50px"
			textAlign="center"
			type="number"
			value={
				index === 0
					? code.firstN
					: index === 1
					? code.secondN
					: index === 2
					? code.thirdN
					: code.fourthN
			}
			ref={reference}
			onChange={(event: ChangeEvent<HTMLInputElement>) => {
				handleInputChange(
					event,
					inputRefs[0],
					inputRefs[inputRefs.length - 1],
					reference,
					inputRefs[index + 1] ? inputRefs[index + 1] : null,
					inputRefs[index - 1] ? inputRefs[index - 1] : null,
					index === 0
						? 'firstN'
						: index === 1
						? 'secondN'
						: index === 2
						? 'thirdN'
						: 'fourthN'
				);
			}}
		/>
	);
};
