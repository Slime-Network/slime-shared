import { Grid, Typography, Stack, Modal, Box, Link, Paper, CircularProgress } from '@mui/material';
import React from 'react';

import { SocialLink } from '../constants/social-links';
import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { ProfileMetadata } from '../types/gosti/Profile';
import { GetDIDInfoRequest } from '../types/walletconnect/rpc/GetDIDInfo';
import { ProfilePFP } from './ProfilePFP';

interface ProfileViewModalProps {
	did: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export const ProfileViewModal = (props: ProfileViewModalProps) => {
	const { did, open, setOpen } = props;

	const { getDIDInfo } = useWalletConnectRpc();

	const [profile, setProfile] = React.useState<ProfileMetadata | undefined>(undefined);

	React.useEffect(() => {
		if (did && open) {
			getDIDInfo({ coinId: did } as GetDIDInfoRequest).then((res) => {
				setProfile(res.metadata as ProfileMetadata);
			});
		}
	}, [did, getDIDInfo, open]);

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<Box sx={profileModalStyle}>
				{profile ? (
					<Stack justifyContent="flex-start" direction="row" spacing={2} sx={{ p: 2 }}>
						<Paper elevation={1} sx={{ m: 2, p: 2 }}>
							{ProfilePFP({ imgSrc: profile?.gostiAvatar, size: 64 })}
						</Paper>
						<Paper elevation={1} sx={{ m: 2, p: 2 }}>
							<Grid container>
								<Grid item xs={12}>
									<Typography variant="h6">{profile?.gostiDisplayName}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="body1">{profile?.gostiBio}</Typography>
								</Grid>
							</Grid>
						</Paper>
						<Paper elevation={1} sx={{ m: 2, p: 2 }}>
							<Grid container>
								{profile?.gostiLinks &&
									JSON.parse(profile.gostiLinks).map((link: SocialLink) => (
										<Grid item xs={6} key={link.name}>
											<Link href={link.link} target="_blank" rel="noreferrer">
												{link.name}
											</Link>
										</Grid>
									))}
							</Grid>
						</Paper>
					</Stack>
				) : (
					<Stack>
						<Typography variant="h6">
							Fetching Profile <CircularProgress />
						</Typography>
					</Stack>
				)}
			</Box>
		</Modal>
	);
};
