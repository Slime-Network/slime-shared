import { Button, Grid, Modal, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { NostrRelay } from '../types/slime/MarketplaceApiTypes';

export const style = {
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

interface AddRelayModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddRelayModal = (props: AddRelayModalProps) => {
	const { open, setOpen } = props;

	const [RelayName, setRelayName] = useState<string>('');
	const [RelayUrl, setRelayUrl] = useState<string>('');

	const { slimeConfig, setSlimeConfig } = useSlimeApi();

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Paper elevation={1} sx={style}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4">Add Relay</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="RelayName"
							label="Relay Name"
							variant="outlined"
							value={RelayName}
							onChange={(event) => {
								setRelayName(event.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="RelayUrl"
							label="Relay URL"
							variant="outlined"
							value={RelayUrl}
							onChange={(event) => {
								setRelayUrl(event.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Button
							variant="contained"
							onClick={() => {
								setOpen(false);
							}}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							variant="contained"
							disabled={RelayName === '' || RelayUrl === '' || RelayUrl.startsWith('http') === false}
							onClick={() => {
								const newRelay: NostrRelay = {
									displayName: RelayName,
									url: RelayUrl,
								};
								if (slimeConfig.nostrRelays === undefined) {
									slimeConfig.nostrRelays = [];
								}
								slimeConfig.nostrRelays.push(newRelay);
								setSlimeConfig({ ...slimeConfig });
								setOpen(false);
							}}
						>
							Add Relay
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Modal>
	);
};
