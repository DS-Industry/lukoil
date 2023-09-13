import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { OperButton } from '../buttons/oper_button';
import CenterDot from '../../assets/icons/center_dot.svg';
import { useState } from 'react';

interface ISelectBay {
	carWash: any;
	onClick: any;
}

export const SelectBay: React.FC<ISelectBay> = ({ carWash, onClick }) => {
	const [value, setValue] = useState<string>('');
	const [isClick, setIsClick] = useState<number>(-1);

	return (
		<Box textAlign="center" w="100%" className='select-bay'>
			<Text fontSize="20px" fontWeight="700">
				Выберите номер поста
			</Text>
			<Flex
				className='select-bay'
				pl="37.5vw"
				pr="35vw"
				mt="20px"
				flexShrink="none"
				flexGrow="none"
				overflowY="scroll"
				flexDirection="row"
				alignContent="flex-end"
			>
				{carWash.boxes.map((box: any, index: number) => {
					return (
						<Box
							key={index}
							marginRight="16px"
							minW="16vw"
							minH="16vw"
							bg={
								isClick === index
									? 'colors.PRIMARY_RED'
									: 'colors.SECONDARY_RED'
							}
							color={isClick === index ? 'colors.WHITE' : 'colors.BLACK'}
							textAlign="center"
							borderRadius="4px"
							onClick={() => {
								setValue(String(index + 1));
								setIsClick(index);
							}}
						>
							<Text fontSize="10vw" fontWeight="700">
								{index + 1}
							</Text>
						</Box>
					);
				})}
			</Flex>
			<Box mt="25px" mb="20px" w="100%" display="flex" pl="42.5vw">
				<Image src={CenterDot} />
			</Box>
			<Box w='100%'>
				<OperButton
					title="Далее"
					switchCarWashType="bay"
					disabled={!value ? true : false}
					onClick={onClick}
					value={value}
				/>
			</Box>
		</Box>
	);
};
