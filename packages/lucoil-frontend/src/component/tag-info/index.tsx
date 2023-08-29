import { Tag, TagLabel } from '@chakra-ui/react';
import React from 'react';

interface ITagInfo {
	width?: string;
	label: string | number;
	bgColor: string;
	color: string;
	fontSize: string;
	height?: string;
	fontWeight?: string;
	padding?: string;
	borderRadius?: string;
}

export const TagInfo: React.FC<ITagInfo> = ({
	label,
	color,
	bgColor,
	fontSize,
	height = 'auto',
	borderRadius = '4px',
	padding = '10px',
	fontWeight = '600',
}) => {
	return (
		<Tag
			w="auto"
			h={height}
			p={padding}
			borderRadius={borderRadius}
			bg={bgColor}
			whiteSpace="nowrap"
		>
			<TagLabel
				lineHeight="20px"
				fontWeight={fontWeight}
				fontSize={fontSize}
				color={color}
			>
				{label}
			</TagLabel>
		</Tag>
	);
};
