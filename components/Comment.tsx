import { Grid, Typography, Paper, Stack, Button, Box, Divider } from '@mui/material';
import { NostrEvent } from 'nostr-tools';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { ProfileMetadata } from '../types/slime/Profile';
import { ProfilePFP } from './ProfilePFP';
import { ProfileViewModal } from './ProfileViewModal';

interface SlimeCommentProps {
	event: NostrEvent;
	profiles: Map<string, ProfileMetadata>;
}

export const SlimeComment = (props: SlimeCommentProps) => {
	const { event, profiles } = props;

	const [openProfileView, setOpenProfileView] = React.useState(false);
	const [profile, setProfile] = React.useState<ProfileMetadata | undefined>(undefined);
	const [did, setDid] = React.useState<string>('Anonymous User');

	React.useEffect(() => {
		const idTag = event.tags.find((tag) => {
			if (tag[0] === 'i' && tag[1].startsWith('chia:')) {
				setDid(tag[1].slice(5, tag[1].length));
				return profiles.has(tag[1].slice(5, tag[1].length));
			}
			return false;
		});
		if (!idTag) return;
		console.log('idTag', idTag[1].slice(5, idTag[1].length), profiles.get(idTag[1].slice(5, idTag[1].length)));
		setProfile(profiles.get(idTag[1].slice(5, idTag[1].length)));
	}, [event, profiles]);

	return (
		<Box>
			<Stack justifyContent={'flex-start'} alignContent={'center'} direction="row">
				<Paper elevation={2} sx={{ m: 2, p: 2, width: '100%' }}>
					<Stack justifyContent={'center'} alignContent={'center'} direction="row">
						<Stack justifyContent={'center'} alignContent={'center'} direction="column">
							{ProfilePFP({ imgSrc: profile?.slimeAvatar, size: 64 })}
						</Stack>
						<Divider sx={{ height: 70, m: 2 }} orientation="vertical" />
						<Grid container>
							<Grid item xs={12}>
								<Button
									size="small"
									sx={{ textTransform: 'unset' }}
									onClick={() => {
										setOpenProfileView(true);
									}}
								>
									<Typography variant="h6">
										{profile?.slimeDisplayName
											? profile?.slimeDisplayName
											: `${did.slice(0, 13)}...${did.slice(64, did.length)}`}
									</Typography>
								</Button>
								<ProfileViewModal open={openProfileView} setOpen={setOpenProfileView} did={did} />
							</Grid>
							<Grid item xs={12}>
								<ReactMarkdown children={event.content} />
							</Grid>
						</Grid>
					</Stack>
				</Paper>
			</Stack>
		</Box>
	);
};
