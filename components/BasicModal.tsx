import { Stack, Modal, Box, Button, Typography } from '@mui/material';
import React from 'react';

interface BasicModalProps {
	title: string;
	message: string;
	confirmText: string;
	cancelText: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	successAction: () => any;
}

const basicModalStyle = {
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

export const BasicModal = (props: BasicModalProps) => {
	const { title, message, open, setOpen, successAction, confirmText, cancelText } = props;
	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Box sx={basicModalStyle}>
				<Stack justifyContent="flex-start" direction="column" spacing={2} sx={{ p: 2 }}>
					<Typography variant="h6">{title}</Typography>
					{message}
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							onClick={async () => {
								setOpen(false);
								successAction();
							}}
						>
							{confirmText}
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								setOpen(false);
							}}
						>
							{cancelText}
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};
