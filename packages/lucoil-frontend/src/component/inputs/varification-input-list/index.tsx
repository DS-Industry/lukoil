import { HStack } from '@chakra-ui/react';
import { VerificationInput } from './verification-input';
import { useRef } from 'react';

interface IVerificationList {
	code: any;
	setCode: any;
}

export const VerificationList: React.FC<IVerificationList> = ({
	code,
	setCode,
}) => {
	const inputRefs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];

	return (
		<HStack w="100%">
			{inputRefs.map((ref: any, index: number) => {
				return (
					<VerificationInput
						key={index}
						index={index}
						reference={ref}
						inputRefs={inputRefs}
						code={code}
						setValue={setCode}
					/>
				);
			})}
		</HStack>
	);
};
