import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material';
import React from 'react';

export const infoModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const successModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #0f0',
	boxShadow: 24,
	p: 4,
};

export const errorModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #f00',
	boxShadow: 24,
	p: 4,
};

export interface InfoModalProps {
	title: string;
	style: 'info' | 'success' | 'error';
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactNode;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, style, open, setOpen, children }) => (
	<Modal
		open={open}
		onClose={() => {
			setOpen(false);
		}}
	>
		<Box sx={style === 'success' ? successModalStyle : style === 'info' ? infoModalStyle : errorModalStyle}>
			<Stack direction="row" spacing={2}>
				<IconButton onClick={() => setOpen(false)}>
					<Close />
				</IconButton>
				<Typography variant="h6" component="h2">
					{title}
				</Typography>
			</Stack>
			{children}
		</Box>
	</Modal>
);
