import { Button, Grid, Modal, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { AddInstallPathRequest } from '../types/slime/SlimeRpcTypes';

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

interface AddInstallPathModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddInstallPathModal = (props: AddInstallPathModalProps) => {
	const { open, setOpen } = props;

	const [InstallPathName, setInstallPathName] = useState<string>('');
	const [InstallPath, setInstallPath] = useState<string>('');

	const { addInstallPath } = useSlimeApi();

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
						<Typography variant="h4">Add InstallPath</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="InstallPathName"
							label="InstallPath Name"
							variant="outlined"
							value={InstallPathName}
							onChange={(event) => {
								setInstallPathName(event.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="InstallPath"
							label="Install Path "
							variant="outlined"
							value={InstallPath}
							onChange={(event) => {
								setInstallPath(event.target.value);
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
							disabled={InstallPathName === '' || InstallPath === ''}
							onClick={() => {
								addInstallPath({ displayName: InstallPathName, path: InstallPath } as AddInstallPathRequest);
								setOpen(false);
							}}
						>
							Add InstallPath
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Modal>
	);
};
