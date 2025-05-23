import SendIcon from '@mui/icons-material/Send';
import { Box, Divider, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { ChiaProfileMetadata } from '../types/slime/Profile';
import { GetDIDInfoRequest } from '../types/walletconnect/rpc/GetDIDInfo';
import { ProfilePFP } from './ProfilePFP';

interface CommentBoxProps {
	onSubmit: (comment: string) => {};
	label?: string;
}

export const CommentBox = (props: CommentBoxProps) => {
	const { onSubmit, label } = props;

	const [comment, setComment] = React.useState('');
	const [commentValid, setCommentValid] = React.useState(true);

	const [profile, setProfile] = React.useState<ChiaProfileMetadata | undefined>(undefined);

	const { getDIDInfo } = useWalletConnectRpc();
	const { slimeConfig } = useSlimeApi();

	React.useEffect(() => {
		console.log('slimeConfig', slimeConfig);
		getDIDInfo({ coinId: slimeConfig?.did } as GetDIDInfoRequest).then((res) => {
			setProfile(res.metadata as ChiaProfileMetadata);
		});
	}, [getDIDInfo, slimeConfig]);

	React.useEffect(() => {
		if (comment.length > 0) {
			setCommentValid(false);
		} else {
			setCommentValid(true);
		}
	}, [comment]);

	return (
		<Box>
			<Paper
				component="form"
				elevation={2}
				sx={{ p: '4px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(comment);
					setComment('');
				}}
			>
				<ProfilePFP imgSrc={profile?.slimeAvatar} size={45} />
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={label || 'Comment'}
					inputProps={{ 'aria-label': label || 'Comment' }}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton
					size="large"
					color="primary"
					sx={{ p: 4 }}
					aria-label="directions"
					disabled={commentValid}
					type="submit"
				>
					<SendIcon />
				</IconButton>
			</Paper>
		</Box>
	);
};
