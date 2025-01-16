import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { NostrRelay } from '../types/slime/MarketplaceApiTypes';

interface NostrRelayDisplayProps {
	relay: NostrRelay;
	onDelete: () => void;
}

export const NostrRelayDisplay = (props: NostrRelayDisplayProps) => {
	const { relay, onDelete } = props;

	const [online, setOnline] = React.useState(false);

	React.useEffect(() => {
		const checkOnline = async () => {
			try {
				setOnline(true);
			} catch (error) {
				setOnline(false);
			}
		};

		checkOnline();
	}, [relay.url]);

	return (
		<Paper
			elevation={3}
			key={relay.displayName}
			sx={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<Stack spacing={1} direction={'row'}>
				<Stack spacing={1}>
					<Typography variant="h6">{relay.displayName}</Typography>
					<Typography variant="body2">{relay.url}</Typography>
				</Stack>
				{online ? <WifiIcon /> : <WifiOffIcon />}
				<Tooltip title="Delete">
					<IconButton size="large" aria-label="delete" onClick={onDelete}>
						<DeleteForeverIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Paper>
	);
};
