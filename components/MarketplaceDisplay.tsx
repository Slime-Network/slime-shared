import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';

import { Marketplace } from '../types/gosti/MarketplaceApiTypes';

interface MarketplaceDisplayProps {
	marketplace: Marketplace;
	onDelete: () => void;
}

export const MarketplaceDisplay = (props: MarketplaceDisplayProps) => {
	const { marketplace, onDelete } = props;

	const [online, setOnline] = React.useState(false);

	React.useEffect(() => {
		const checkOnline = async () => {
			try {
				const response = await axios.get(`${marketplace.url}/listings/search?titleTerm=abcdef`);
				console.log('dddddd', response);
				// eslint-disable-next-line no-underscore-dangle -- underscore is part of the response
				setOnline(response.status === 200 && response.data._shards.successful > 0);
			} catch (error) {
				setOnline(false);
			}
		};

		checkOnline();
	}, [marketplace.url]);

	return (
		<Paper
			elevation={3}
			key={marketplace.displayName}
			sx={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<Stack spacing={1} direction={'row'}>
				<Stack spacing={1}>
					<Typography variant="h6">{marketplace.displayName}</Typography>
					<Typography variant="body2">{marketplace.url}</Typography>
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
