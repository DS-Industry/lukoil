import { Box, Text } from '@chakra-ui/react';
import { PortalService } from '../portal-programm';

interface IPortalProgramList {
	programList: Array<any> | null;
}

export const PortalProgramList: React.FC<IPortalProgramList> = ({
	programList,
}) => {
	return (
		<Box h="460px">
			<Text
				w="100%"
				textAlign="center"
				fontWeight="700"
				fontSize="20px"
				mb="30px"
			>
				Выберите программу
			</Text>
			{programList &&
				programList.map((program: any, index: number) => {
					return (
						<Box mb="10px" key={index}>
							<PortalService
								name={program.name}
								cost={program.cost}
								serviceDuration={program.serviceDuration}
								serviceInfo={program.serviceInfo}
								key={index}
							/>
						</Box>
					);
				})}
		</Box>
	);
};
