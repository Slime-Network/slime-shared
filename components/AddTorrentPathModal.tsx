import { Button, Grid, Modal, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { AddTorrentPathRequest } from '../types/slime/SlimeRpcTypes';

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

interface AddTorrentPathModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTorrentPathModal = (props: AddTorrentPathModalProps) => {
	const { open, setOpen } = props;

	const [TorrentPathName, setTorrentPathName] = useState<string>('');
	const [TorrentPath, setTorrentPath] = useState<string>('');

	const { addTorrentPath } = useSlimeApi();

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
						<Typography variant="h4">Add Torrent Path</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="TorrentPathName"
							label="TorrentPath Name"
							variant="outlined"
							value={TorrentPathName}
							onChange={(event) => {
								setTorrentPathName(event.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="TorrentPath"
							label="Torrent Path "
							variant="outlined"
							value={TorrentPath}
							onChange={(event) => {
								setTorrentPath(event.target.value);
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
							disabled={TorrentPathName === '' || TorrentPath === ''}
							onClick={() => {
								addTorrentPath({ displayName: TorrentPathName, path: TorrentPath } as AddTorrentPathRequest);
								setOpen(false);
							}}
						>
							Add Torrent Path
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Modal>
	);
};
