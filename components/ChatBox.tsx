import { Box, Stack, Paper } from '@mui/material';
import { NostrEvent, SimplePool, getEventHash } from 'nostr-tools';
import React from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { ChiaProfileMetadata } from '../types/slime/Profile';
import { GetDIDInfoRequest } from '../types/walletconnect/rpc/GetDIDInfo';
import { SlimeComment } from './Comment';
import { CommentBox } from './CommentBox';

export interface ChatBoxProps {
	open: boolean;
}

export const ChatBox = (props: ChatBoxProps) => {
	const { open } = props;

	const [profiles, setProfiles] = React.useState<Map<string, ChiaProfileMetadata>>(
		new Map<string, ChiaProfileMetadata>()
	);

	const { slimeConfig, signNostrMessage, nostrRelays } = useSlimeApi();
	const { getDIDInfo } = useWalletConnectRpc();

	const [events, setEvents] = React.useState<NostrEvent[]>([]);

	React.useEffect(() => {
		const subscribeToComments = async () => {
			if (!nostrRelays) {
				console.log('No slimeConfig found');
				alert('No slimeConfig found. Please set up your profile.');
				return;
			}
			const nostrPool = new SimplePool();
			const subs = nostrPool.subscribeMany(
				[...nostrRelays.map((relay) => relay.url)],
				[
					{
						// "#e": [media.nostrEventId],
						since: Math.floor(Date.now() / 1000),
					},
				],
				{
					onevent(event) {
						events.push(event);
						setEvents([...events]);
						event.tags.forEach(async (tag) => {
							const nostrProfile = await nostrPool.querySync(
								nostrRelays.map((relay) => relay.url),
								{
									kinds: [0],
									authors: [event.pubkey],
								}
							);
							if (tag[0] === 'i' && tag[1].split(':')[0] === 'chia') {
								console.log('tag', tag);
								const did = tag[1].slice(5, tag[1].length);
								if (profiles.has(did)) {
									console.log('profile already found', did);
									return;
								}
								if (nostrProfile.length > 0) {
									const quickProfile = JSON.parse(nostrProfile[0].content);
									console.log('quickProfile', quickProfile, event.pubkey, did);
									if (quickProfile) {
										profiles.set(did, quickProfile as ChiaProfileMetadata);
										setProfiles(new Map(profiles));
									}
									return;
								}
								const foundProfile = await getDIDInfo({ coinId: did } as GetDIDInfoRequest);
								if (foundProfile) {
									profiles.set(did, foundProfile.metadata as ChiaProfileMetadata);
									setProfiles(new Map(profiles));
								}
							}
						});
					},
					oneose() {
						subs.close();
					},
				}
			);
		};
		if (open && events.length === 0) {
			subscribeToComments();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- need to ignore events updates
	}, [slimeConfig, open]);

	const handleSubmitComment = async (comment: string) => {
		if (!slimeConfig) {
			console.log('No slimeConfig found');
			alert('No slimeConfig found. Please set up your profile.');
			return;
		}
		if (!nostrRelays) {
			console.log('No Relays found');
			alert('No Relays found. Please set up your profile.');
			return;
		}
		const pk = slimeConfig.activeProof?.pubkey;

		if (!pk) {
			console.log('No public key found');
			alert('No public key found. Please set up your profile.');
			return;
		}

		const createdAt = Math.floor(Date.now() / 1000);

		const event: NostrEvent = {
			content: comment,
			kind: 1,
			tags: [['i', `chia:${slimeConfig.did}`, slimeConfig.activeProof?.proof || '']],
			created_at: createdAt,
			pubkey: pk,
			id: '',
			sig: '',
		};
		event.id = getEventHash(event);
		const signResp = await signNostrMessage({ message: event.id });
		console.log('signResp', signResp);
		event.sig = signResp.signature;

		const nostrPool = new SimplePool();
		const resp = await nostrPool.publish(
			nostrRelays.map((relay) => relay.url),
			event
		);
		console.log('publish resp', resp);
		if (resp) {
			events.push(event);
			setEvents([...events]);
			console.log('events', events);
		}
	};

	return (
		<Paper
			elevation={1}
			sx={{
				width: '100%',
				height: '100%',
				gridColumn: 'span 2',
				flexDirection: 'row-reverse',
				flexWrap: 'wrap',
				overflow: 'hidden',
			}}
		>
			<Stack direction={'column-reverse'} sx={{ m: 0, p: 0, height: '100%' }}>
				<Box sx={{ p: 2 }}>
					<CommentBox onSubmit={handleSubmitComment} label="Chat Message" />
				</Box>
				{events
					.sort((a, b) => b.created_at - a.created_at)
					.map((event: any) => (
						<SlimeComment event={event} profiles={profiles} key={event.id} />
					))}
			</Stack>
		</Paper>
	);
};
