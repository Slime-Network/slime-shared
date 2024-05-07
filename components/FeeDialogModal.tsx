import { Stack, Modal, Box, TextField, Button } from '@mui/material';
import React from 'react';

interface FeeDialogModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fee: number;
	setFee: React.Dispatch<React.SetStateAction<number>>;
	action: () => void;
}

const profileModalStyle = {
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

export const FeeDialogModal = (props: FeeDialogModalProps) => {
	const { open, setOpen, fee, setFee, action } = props;

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Box sx={profileModalStyle}>
				<Stack justifyContent="flex-start" direction="row" spacing={2} sx={{ p: 2 }}>
					<TextField label="Fee" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
					<Stack direction="row" spacing={2}>
						<Button
							variant="contained"
							onClick={() => {
								setOpen(false);
								action();
							}}
						>
							Confirm
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								setOpen(false);
							}}
						>
							Cancel
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	);
};
