import { HorizontalRule } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import {
	Dialog,
	Container,
	Typography,
	AppBar,
	Toolbar,
	Slide,
	IconButton,
	SlideProps,
	Grid,
	Paper,
	TextField,
	Button,
	Modal,
	Box,
	Autocomplete,
	Chip,
} from '@mui/material';
import { schnorr } from '@noble/curves/secp256k1';
import { bytesToHex } from '@noble/hashes/utils';
import { SimplePool } from 'nostr-tools';
import * as React from 'react';

import { Language, Languages } from '../constants/languages';
import { SocialLink, socialLinksOptions } from '../constants/social-links';
import { useSlimeApi } from '../contexts/SlimeApiContext';
import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { Marketplace } from '../types/slime/MarketplaceApiTypes';
import { Profile } from '../types/slime/Profile';
import { SignMessageByIdRequest } from '../types/walletconnect/rpc/SignMessageById';
import { NostrEvent, getEventHash } from '../utils/nostr';
import { FeeDialogModal } from './FeeDialogModal';
import ImageUpload from './ImageUpload';
import { InfoModal } from './InfoModal';

const Transition = React.forwardRef((props: SlideProps, ref) => <Slide direction="up" ref={ref} {...props} />);

export type ProfileEditPageProps = {
	profile: Profile | undefined;
	onUpdateMetadata: (metadata: any) => void;
	onChangeName: (name: string) => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const infoModalStyle = {
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

export function ProfileEditPage(props: ProfileEditPageProps) {
	const { profile, onChangeName, onUpdateMetadata, open, setOpen } = props;

	const [fee, setFee] = React.useState<number>(50_000);

	const [openNotice, setOpenNotice] = React.useState(false);
	const [noticeTitle, setNoticeTitle] = React.useState<string>('');
	const [noticeMessage, setNoticeMessage] = React.useState<string>('');
	const [openImportKeysModal, setOpenImportKeysModal] = React.useState(false);

	const [openFeeDialog, setOpenFeeDialog] = React.useState(false);

	const [name, setName] = React.useState<string | undefined>(profile?.name);
	const [displayName, setDisplayName] = React.useState<string>(profile?.metadata?.slimeDisplayName || '');
	const [avatar, setAvatar] = React.useState<string>(profile?.metadata?.slimeAvatar || '');
	const [bio, setBio] = React.useState<string>(profile?.metadata?.slimeBio || '');
	const [location, setLocation] = React.useState<string>(profile?.metadata?.slimeLocation || '');
	const [languages, setLanguages] = React.useState<Language[]>(
		JSON.parse(profile?.metadata?.slimeLanguages || '[]') || []
	);
	const [links, setLinks] = React.useState<SocialLink[]>(JSON.parse(profile?.metadata?.slimeLinks || '[]') || []);
	const [nostrPublicKeys, setNostrPublicKeys] = React.useState<any[]>(
		JSON.parse(profile?.metadata?.slimeNostrPublicKeys || '[]') || []
	);
	const [tempPrivateKey, setTempPrivateKey] = React.useState<string | undefined>(undefined);
	const [tempPublicKey, setTempPublicKey] = React.useState<string | undefined>(undefined);
	const [activeNostrPublicKey, setActiveNostrPublicKey] = React.useState<string | undefined>(
		profile?.metadata?.slimeActiveNostrPublicKey
	);

	const [marketplaces, setMarketplaces] = React.useState<Marketplace[]>([]);
	const [hasPrivateKey, setHasPrivateKey] = React.useState<Map<string, boolean>>(new Map());
	const { signMessageById } = useWalletConnectRpc();

	const { slimeConfig, addNostrKeypair, hasNostrPrivateKey, signNostrMessage, setSlimeConfig } = useSlimeApi();

	const nostrPool = new SimplePool();

	React.useEffect(() => {
		if (slimeConfig) setMarketplaces(slimeConfig.marketplaces);
	}, [slimeConfig]);

	React.useEffect(() => {
		if (profile) {
			if (profile.name) setName(profile?.name);
			if (profile.metadata.slimeDisplayName) setDisplayName(profile.metadata.slimeDisplayName);
			if (profile.metadata.slimeAvatar) setAvatar(profile.metadata.slimeAvatar);
			if (profile.metadata.slimeBio) setBio(profile.metadata.slimeBio);
			if (profile.metadata.slimeLocation) setLocation(profile.metadata.slimeLocation);
			if (profile.metadata.slimeLanguages) setLanguages(JSON.parse(profile.metadata.slimeLanguages));
			if (profile.metadata.slimeLinks) setLinks(JSON.parse(profile.metadata.slimeLinks));
			if (profile.metadata.slimeNostrPublicKeys) setNostrPublicKeys(JSON.parse(profile.metadata.slimeNostrPublicKeys));
			if (profile.metadata.slimeActiveNostrPublicKey)
				setActiveNostrPublicKey(profile.metadata.slimeActiveNostrPublicKey);
		}
	}, [profile]);

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		console.log('nostrPublicKeys', nostrPublicKeys);
		nostrPublicKeys.forEach(async (key) => {
			console.log('key3', key);
			const result = await hasNostrPrivateKey({ publicKey: key.key });
			console.log('result pk', result);

			hasPrivateKey.set(key.key, result.hasPrivateKey);
			setHasPrivateKey(new Map(hasPrivateKey));
			if (activeNostrPublicKey) {
				if (activeNostrPublicKey === key.key && !result.hasPrivateKey) {
					setActiveNostrPublicKey(undefined);
				}
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
	}, [hasNostrPrivateKey, nostrPublicKeys]);

	return (
		<Paper>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6">
							{profile?.name}
						</Typography>
					</Toolbar>
				</AppBar>
				<Container fixed sx={{ mt: 2 }}>
					<Grid container>
						<Grid item xs={9}>
							<TextField
								id="NameTextField"
								sx={{ width: '100%' }}
								label="Profile Name"
								variant="filled"
								defaultValue={profile?.name}
								value={name}
								onChange={(event: any) => {
									setName(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<IconButton
											size="small"
											onClick={() => {
												setNoticeTitle('Profile Name');
												setNoticeMessage(
													`This is your local name for this profile, which is only visible to you. It does not require a transaction to update.`
												);
												setOpenNotice(true);
											}}
										>
											<InfoIcon />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<Button
								id="NameConfirmButton"
								disabled={!name}
								variant="contained"
								sx={{ width: '100%', height: '100%' }}
								onClick={() => {
									if (name) onChangeName(name);
								}}
							>
								Confirm
							</Button>
						</Grid>
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="DisplayNameTextField"
								sx={{ width: '100%' }}
								label="Display Name"
								variant="filled"
								defaultValue={profile?.metadata?.slimeDisplayName}
								value={displayName}
								onChange={(event: any) => {
									setDisplayName(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<IconButton
											size="small"
											onClick={() => {
												setNoticeTitle('Profile Update Fee');
												setNoticeMessage(
													`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`
												);
												setOpenNotice(true);
											}}
										>
											<InfoIcon />
										</IconButton>
									),
								}}
							/>
						</Grid>

						<Grid item xs={12}>
							{ImageUpload({
								marketplaces,
								title: 'Avatar',
								setGui: (value) => {
									setAvatar(value);
								},
								initialImage: avatar,
								height: 256,
							})}
							<TextField
								id="AvatarTextField"
								sx={{ width: '100%' }}
								label="Avatar URL"
								variant="filled"
								defaultValue={profile?.metadata?.slimeAvatar}
								value={avatar}
								onChange={(event: any) => {
									setAvatar(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<IconButton
											size="small"
											onClick={() => {
												setNoticeTitle('Avatar');
												setNoticeMessage(
													'This is the URL for your avatar, you can upload an image to our server, or enter a URL manually, to host your avatar elsewhere.'
												);
												setOpenNotice(true);
											}}
										>
											<InfoIcon />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="BioTextField"
								sx={{ width: '100%' }}
								label="Bio"
								variant="filled"
								multiline
								maxRows={4}
								defaultValue={profile?.metadata?.slimeBio}
								value={bio}
								onChange={(event: any) => {
									setBio(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<IconButton
											size="small"
											onClick={() => {
												setNoticeTitle('Profile Update Fee');
												setNoticeMessage(
													`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`
												);
												setOpenNotice(true);
											}}
										>
											<InfoIcon />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="LocationTextField"
								sx={{ width: '100%' }}
								label="Location"
								variant="filled"
								defaultValue={profile?.metadata?.slimeLocation}
								value={location}
								onChange={(event: any) => {
									setLocation(event.target.value);
								}}
								InputProps={{
									endAdornment: (
										<IconButton
											size="small"
											onClick={() => {
												setNoticeTitle('Location');
												setNoticeMessage('Your country of origin, IRL location, .');
												setOpenNotice(true);
											}}
										>
											<InfoIcon />
										</IconButton>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								multiple
								id="languages"
								options={Languages}
								defaultValue={[]}
								getOptionLabel={(option: Language) => (option.native === '' ? option.english : option.native)}
								renderTags={(tagValue: Language[], getTagProps) =>
									tagValue.map((option, index) => (
										<Chip
											size="small"
											label={option.native === '' ? option.english : option.native}
											{...getTagProps({ index })}
										/>
									))
								}
								renderInput={(params) => <TextField {...params} variant="filled" label="Languages" placeholder="+" />}
							/>
						</Grid>

						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>

						<Grid item xs={12}>
							<Typography variant="h6">Socials</Typography>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								id="AddSocialLink"
								clearOnEscape
								sx={{ width: '100%' }}
								options={socialLinksOptions}
								getOptionLabel={(link: SocialLink) => link.name}
								onChange={(event: any) => {
									console.log('AddSocialLink', event);
									const link = socialLinksOptions.find((newLink) => newLink.name === event.target.innerText);
									if (link) setLinks([...links, link]);
									event.target.clear();
								}}
								renderInput={(params) => <TextField {...params} label="Add Social Link" variant="filled" />}
							/>
						</Grid>
						{links.map((link, index) => (
							<>
								<Grid item xs={6}>
									<TextField
										id={`LinkTextField${link.name}`}
										sx={{ width: '100%' }}
										label={link.name}
										variant="filled"
										defaultValue={link.link}
										value={link.link}
										onChange={(event: any) => {
											links[index].link = event.target.value;
											setLinks([...links]);
										}}
										InputProps={{
											endAdornment: (
												<IconButton
													size="small"
													aria-label="delete"
													onClick={() => {
														links.splice(index, 1);
														setLinks([...links]);
													}}
												>
													<CloseIcon />
												</IconButton>
											),
										}}
									/>
								</Grid>
							</>
						))}
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>

						<Grid item xs={12}>
							<Typography variant="h6">
								Nostr Public Keys
								<IconButton
									size="small"
									onClick={() => {
										setNoticeTitle('Nostr Public Keys');
										setNoticeMessage(
											'Your list of public keys for Nostr, the social media parts of Slime. All of your Nostr keys are linked to your same profile and can be used interchangeably. Your Private keys are stored locally on your device for security, so it is possible to loose old keys. You may also want to create a different key-pair for each device, for security and ease of use. Green means your active public key, Grey is an inactive key, and Red means you do not have the private key on this device. Click on an inactive key to activate it, or to add a missing private key.'
										);
										setOpenNotice(true);
									}}
								>
									<InfoIcon />
								</IconButton>
							</Typography>
							<Box sx={{ m: 2 }}>
								<Grid container>
									{nostrPublicKeys.map((key, index) => (
										<Grid item xs={6}>
											<Chip
												label={`${key.key}`}
												color={
													hasPrivateKey.get(key.key)
														? key.key === activeNostrPublicKey
															? 'primary'
															: 'default'
														: 'error'
												}
												onDelete={() => {
													nostrPublicKeys.splice(index, 1);
													setNostrPublicKeys([...nostrPublicKeys]);
												}}
												onClick={async (event) => {
													console.log('Chip', event, key);
													console.log('hasPrivateKey', hasPrivateKey, hasPrivateKey.get(key.key));
													console.log('activeNostrPublicKey', activeNostrPublicKey);
													if (hasPrivateKey.get(key.key)) {
														setActiveNostrPublicKey(key.key);
													} else {
														alert('You do not have the private key for this public key.');
													}
												}}
											/>
										</Grid>
									))}
								</Grid>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Button
								id="NostrPublicKeysButton"
								variant="contained"
								sx={{ width: '100%' }}
								onClick={async () => {
									console.log('NostrPublicKeysButton', nostrPublicKeys);
									const sk = schnorr.utils.randomPrivateKey(); // `sk` is a Uint8Array
									const pk = schnorr.getPublicKey(sk);
									setNostrPublicKeys([...nostrPublicKeys, { key: bytesToHex(pk), proof: '' }]);
									setActiveNostrPublicKey(bytesToHex(pk));

									const resp = await addNostrKeypair({ publicKey: bytesToHex(pk), privateKey: bytesToHex(sk) });
									console.log('add_nostr_keys', resp);
								}}
							>
								Create New Nostr Key
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								id="NostrPublicKeysImportButton"
								variant="contained"
								sx={{ width: '100%' }}
								onClick={() => {
									setOpenImportKeysModal(true);
								}}
							>
								Import Existing Key Pair
							</Button>
							<Modal
								open={openImportKeysModal}
								onClose={() => {
									setOpenNotice(false);
								}}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={infoModalStyle}>
									<Grid container>
										<Grid item xs={12}>
											<TextField
												id="PrivateKeyTextField"
												sx={{ width: '100%' }}
												label="Private Key"
												variant="filled"
												value={tempPrivateKey}
												onChange={(event: any) => {
													setTempPrivateKey(event.target.value);
												}}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												id="PublicKeyTextField"
												sx={{ width: '100%' }}
												label="Public Key"
												variant="filled"
												value={tempPublicKey}
												onChange={(event: any) => {
													setTempPublicKey(event.target.value);
												}}
											/>
										</Grid>
										<Grid item xs={6}>
											<Button
												id="ImportKeysButton"
												variant="contained"
												sx={{ width: '100%' }}
												onClick={async () => {
													if (tempPublicKey && tempPrivateKey) {
														setNostrPublicKeys([...nostrPublicKeys, { key: tempPublicKey, proof: '' }]);
														const resp = await addNostrKeypair({
															publicKey: tempPublicKey,
															privateKey: tempPrivateKey,
														});
														console.log('add_nostr_keys', resp);
														setActiveNostrPublicKey(tempPublicKey);
													}
													setOpenImportKeysModal(false);
												}}
											>
												Add Keys
											</Button>
										</Grid>
										<Grid item xs={6}>
											<Button
												id="CancelImportKeysButton"
												variant="contained"
												sx={{ width: '100%' }}
												onClick={() => {
													setOpenImportKeysModal(false);
												}}
											>
												Cancel
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Modal>
						</Grid>

						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>

						<Grid item xs={12}>
							<FeeDialogModal
								messageBefore="Update Profile"
								open={openFeeDialog}
								setOpen={setOpenFeeDialog}
								fee={fee}
								setFee={setFee}
								action={async () => {
									if (!slimeConfig) {
										console.log('No slimeConfig found');
										alert('No slimeConfig found. Please set up your profile.');
										return;
									}
									if (!activeNostrPublicKey) {
										alert('Please select an active Nostr public key.');
										return;
									}
									if (profile) {
										if (!profile.metadata) profile.metadata = {};
										if (displayName !== '') profile.metadata.slimeDisplayName = displayName;
										if (avatar !== '') profile.metadata.slimeAvatar = avatar;
										if (bio !== '') profile.metadata.slimeBio = bio;
										if (location !== '') profile.metadata.slimeLocation = location;
										if (languages.length !== 0) profile.metadata.slimeLanguages = JSON.stringify(languages);
										if (links.length !== 0) profile.metadata.slimeLinks = JSON.stringify(links);

										if (nostrPublicKeys.length !== 0) {
											const provenKeys = await Promise.all(
												nostrPublicKeys.map(async (key) => {
													if (key.proof === '') {
														const signResponse = await signMessageById({
															id: profile.did,
															message: key.key,
														} as SignMessageByIdRequest);
														return { key: key.key, proof: signResponse.signature };
													}
													return key;
												})
											);

											console.log('provenKeys', provenKeys);

											profile.metadata.slimeNostrPublicKeys = JSON.stringify(provenKeys);

											profile.metadata.slimeActiveNostrPublicKey = activeNostrPublicKey;

											slimeConfig.activeIdentity = {
												currentNostrPublicKey: activeNostrPublicKey,
												did: profile.did,
												proof: provenKeys.find((key) => key.key === activeNostrPublicKey).proof,
											};

											const resp = await setSlimeConfig({ ...slimeConfig });
											console.log('save_config', resp);

											onUpdateMetadata(profile.metadata);

											const createdAt = Math.floor(Date.now() / 1000);

											const event: NostrEvent = {
												content: JSON.stringify({
													...profile.metadata,
													name: profile.metadata.slimeDisplayName,
													about: profile.metadata.slimeBio,
													picture: profile.metadata.slimeAvatar,
												}),
												kind: 0,
												tags: [
													[
														'i',
														`chia:${profile.did}`,
														provenKeys.find((key) => key.key === activeNostrPublicKey).proof,
													],
												],
												created_at: createdAt,
												pubkey: activeNostrPublicKey,
												id: '',
												sig: '',
											};
											event.id = getEventHash(event);
											const signResp = await signNostrMessage({ message: event.id });
											console.log('signResp', signResp);
											event.sig = signResp.signature;

											nostrPool.publish(
												slimeConfig.nostrRelays.map((relay) => relay.url),
												event
											);
										}
									}
								}}
							/>
							<Button
								disabled={!profile?.coinAvailable}
								id="UpdateProfileButton"
								variant="contained"
								sx={{ width: '100%' }}
								onClick={() => {
									setOpenFeeDialog(true);
								}}
							>
								Update Profile
							</Button>
						</Grid>
						<Grid item xs={12}>
							<code>{JSON.stringify(profile, null, 2)}</code>
						</Grid>
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>
						<Grid item xs={12}>
							<code>{JSON.stringify(slimeConfig, null, 2)}</code>
						</Grid>
					</Grid>
					<InfoModal
						open={openNotice}
						setOpen={setOpenNotice}
						title={noticeTitle}
						style={'info'}
					>{`${noticeMessage}`}</InfoModal>
				</Container>
			</Dialog>
		</Paper>
	);
}
