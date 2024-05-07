import { Stack, Modal, Box, TextField, Button, Typography } from '@mui/material';
import React from 'react';

interface FeeDialogModalProps {
	messageBefore: string;
	messageSuccess?: string;
	messageFailure?: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	fee: number;
	setFee: React.Dispatch<React.SetStateAction<number>>;
	action: () => any;
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
	const { messageBefore, open, setOpen, fee, setFee, action } = props;

	const messageSuccess = props.messageSuccess || 'Transaction successful';
	const messageFailure = props.messageFailure || 'Transaction failed';

	const [state, setState] = React.useState<'before' | 'waiting' | 'success' | 'failure'>('before');

	React.useEffect(() => {
		setState('before');
	}, [open]);

	React.useEffect(() => {
		console.log('fee', fee);
	}, [fee]);

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			{state === 'before' ? (
				<Box sx={profileModalStyle}>
					<Typography variant="h6">Blockchain Transaction Confirmation</Typography>
					{messageBefore}
					<TextField label="Fee" value={fee} onChange={(e) => setFee(Number(e.target.value))} />
					<Stack justifyContent="flex-start" direction="row" spacing={2} sx={{ p: 2 }}>
						<Stack direction="row" spacing={2}>
							<Button
								variant="contained"
								onClick={async () => {
									setOpen(false);
									setState('waiting');
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
			) : state === 'waiting' ? (
				<Box sx={profileModalStyle}>
					<Typography variant="h6">Waiting...</Typography>
					<p>Please check your wallet to confirm</p>
				</Box>
			) : state === 'success' ? (
				<Box sx={profileModalStyle}>
					<Typography variant="h6">Success</Typography>
					<p>{messageSuccess}</p>
					<Button
						variant="contained"
						onClick={() => {
							setOpen(false);
							setState('before');
						}}
					>
						Close
					</Button>
				</Box>
			) : state === 'failure' ? (
				<Box sx={profileModalStyle}>
					<Typography variant="h6">Transaction Failed</Typography>
					<p>{messageFailure}</p>
					<Button
						variant="contained"
						onClick={() => {
							setOpen(false);
							setState('before');
						}}
					>
						Close
					</Button>
				</Box>
			) : (
				<div />
			)}
		</Modal>
	);
};
