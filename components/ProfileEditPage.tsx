import { HorizontalRule } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import RestoreIcon from '@mui/icons-material/Restore';
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

import { infoModalStyle } from '../constants';
import { Language, Languages } from '../constants/languages';
import { SocialLink, socialLinksOptions } from '../constants/social-links';
import { useSlimeApi } from '../contexts/SlimeApiContext';
import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { Identity, IdentityProof } from '../types/slime/MarketplaceApiTypes';
import { ChiaProfile } from '../types/slime/Profile';
import { SignMessageByIdRequest } from '../types/walletconnect/rpc/SignMessageById';
import { NostrEvent, getEventHash } from '../utils/nostr';
import { FeeDialogModal } from './FeeDialogModal';
import ImageUpload from './ImageUpload';

const Transition = React.forwardRef((props: SlideProps, ref) => <Slide direction="up" ref={ref} {...props} />);

export type ProfileEditPageProps = {
	chiaProfile: ChiaProfile | undefined;
	localIdentity: Identity | undefined;
	onUpdateMetadata: (metadata: any) => void;
	onChangeName: (name: string) => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProfileEditPage(props: ProfileEditPageProps) {
	const { chiaProfile, localIdentity, onChangeName, onUpdateMetadata, open, setOpen } = props;

	const [fee, setFee] = React.useState<number>(50_000);

	const [openNotice, setOpenNotice] = React.useState(false);
	const [noticeTitle, setNoticeTitle] = React.useState<string | undefined>(undefined);
	const [noticeMessage, setNoticeMessage] = React.useState<string | undefined>(undefined);
	const [openImportKeysModal, setOpenImportKeysModal] = React.useState(false);

	const [openFeeDialog, setOpenFeeDialog] = React.useState(false);

	const [name, setName] = React.useState<string | undefined>(chiaProfile?.name);
	const [displayName, setDisplayName] = React.useState<string>(localIdentity?.displayName || '');
	const [avatar, setAvatar] = React.useState<string>(localIdentity?.avatar || '');
	const [bio, setBio] = React.useState<string>(localIdentity?.bio || '');
	const [location, setLocation] = React.useState<string>(localIdentity?.location || '');
	const [languages, setLanguages] = React.useState<Language[]>(localIdentity?.languages || []);
	const [links, setLinks] = React.useState<SocialLink[]>(localIdentity?.links || []);
	const [proofs, setProofs] = React.useState<IdentityProof[]>(localIdentity?.proofs || []);
	const [tempPrivateKey, setTempPrivateKey] = React.useState<string | undefined>(undefined);
	const [tempPublicKey, setTempPublicKey] = React.useState<string | undefined>(undefined);
	const [activeProof, setActiveProof] = React.useState<IdentityProof>(
		localIdentity?.activeProof || { pubkey: '', proof: '' }
	);

	const [hasPrivateKey, setHasPrivateKey] = React.useState<Map<string, boolean>>(new Map());
	const { signMessageById } = useWalletConnectRpc();

	const { slimeConfig, addNostrKeypair, addIdentity, hasNostrPrivateKey, signNostrMessage, marketplaces, nostrRelays } =
		useSlimeApi();

	const nostrPool = new SimplePool();

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		console.log('updating local identity', localIdentity);
		if (localIdentity) {
			setDisplayName(localIdentity.displayName);
			setAvatar(localIdentity.avatar);
			setBio(localIdentity.bio);
			setLocation(localIdentity.location);
			setLanguages(localIdentity.languages);
			setLinks(localIdentity.links);
		}
	}, [localIdentity]);

	React.useEffect(() => {
		if (chiaProfile) {
			setName(chiaProfile.name);
		}
	}, [chiaProfile]);

	React.useEffect(() => {
		proofs.forEach(async (proof) => {
			const result = await hasNostrPrivateKey({ publicKey: proof.pubkey });
			hasPrivateKey.set(proof.pubkey, result.hasPrivateKey);
			setHasPrivateKey(new Map(hasPrivateKey));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps -- This is intentional
	}, [hasNostrPrivateKey, proofs]);

	return (
		<Paper>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6">
							{chiaProfile?.name}
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
								defaultValue={chiaProfile?.name}
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
								defaultValue={localIdentity?.displayName}
								value={displayName}
								onChange={async (event: any) => {
									setDisplayName(event.target.value);
									localIdentity!.displayName = event.target.value;
									await addIdentity({ ...localIdentity! });
								}}
								InputProps={{
									endAdornment: (
										<>
											{displayName !== chiaProfile?.metadata.slimeDisplayName && (
												<IconButton
													size="small"
													onClick={async () => {
														setDisplayName(chiaProfile?.metadata.slimeDisplayName || '');
														localIdentity!.displayName = chiaProfile?.metadata.slimeDisplayName || '';
														await addIdentity({ ...localIdentity! });
													}}
												>
													<RestoreIcon />
												</IconButton>
											)}
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
										</>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							{marketplaces && (
								<ImageUpload
									marketplaces={marketplaces}
									title={'Avatar'}
									setGui={(value) => {
										setAvatar(value);
									}}
									height={256}
									initialImage={avatar}
								/>
							)}
							<TextField
								id="AvatarTextField"
								sx={{ width: '100%' }}
								label="Avatar URL"
								variant="filled"
								defaultValue={localIdentity?.avatar}
								value={avatar}
								onChange={async (event: any) => {
									setAvatar(event.target.value);
									localIdentity!.avatar = event.target.value;
									await addIdentity({ ...localIdentity! });
								}}
								InputProps={{
									endAdornment: (
										<>
											{avatar !== chiaProfile?.metadata.slimeAvatar && (
												<IconButton
													size="small"
													onClick={async () => {
														setAvatar(chiaProfile?.metadata.slimeAvatar || '');
														localIdentity!.avatar = chiaProfile?.metadata.slimeAvatar || '';
														await addIdentity({ ...localIdentity! });
													}}
												>
													<RestoreIcon />
												</IconButton>
											)}
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
										</>
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
								defaultValue={localIdentity?.bio}
								value={bio}
								onChange={async (event: any) => {
									setBio(event.target.value);
									localIdentity!.bio = event.target.value;
									await addIdentity({ ...localIdentity! });
								}}
								InputProps={{
									endAdornment: (
										<>
											{bio !== chiaProfile?.metadata.slimeBio && (
												<IconButton
													size="small"
													onClick={async () => {
														setBio(chiaProfile?.metadata.slimeBio || '');
														localIdentity!.bio = chiaProfile?.metadata.slimeBio || '';
														await addIdentity({ ...localIdentity! });
													}}
												>
													<RestoreIcon />
												</IconButton>
											)}
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
										</>
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
								defaultValue={localIdentity?.location}
								value={location}
								onChange={async (event: any) => {
									setLocation(event.target.value);
									localIdentity!.location = event.target.value;
									await addIdentity({ ...localIdentity! });
								}}
								InputProps={{
									endAdornment: (
										<>
											{location !== chiaProfile?.metadata.slimeLocation && (
												<IconButton
													size="small"
													onClick={async () => {
														setLocation(chiaProfile?.metadata.slimeLocation || '');
														localIdentity!.location = chiaProfile?.metadata.slimeLocation || '';
														await addIdentity({ ...localIdentity! });
													}}
												>
													<RestoreIcon />
												</IconButton>
											)}
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
										</>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Autocomplete
								multiple
								id="languages"
								options={Languages}
								defaultValue={localIdentity?.languages}
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
								onChange={async (event: any, value: Language[]) => {
									setLanguages(value);
									localIdentity!.languages = value;
									await addIdentity({ ...localIdentity! });
								}}
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
						{links &&
							links.map((link, index) => (
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
								<IconButton
									size="small"
									onClick={() => {
										setProofs(chiaProfile?.metadata.slimeProofs ? JSON.parse(chiaProfile.metadata.slimeProofs) : []);
										setActiveProof(
											chiaProfile?.metadata.slimeActiveProof
												? JSON.parse(chiaProfile.metadata.slimeActiveProof)
												: undefined
										);
										setNoticeTitle('Nostr Keys Reset');
										setNoticeMessage(
											'Your of keys has been restored to the last saved state. You may need to refresh the page to see the changes.'
										);
									}}
								>
									<RestoreIcon />
								</IconButton>
							</Typography>
							<Box sx={{ m: 2 }}>
								<Grid container>
									{proofs.map((proof, index) => (
										<Grid item xs={6}>
											<Chip
												label={`${proof.pubkey}`}
												color={
													hasPrivateKey.get(proof.pubkey) ? (proof === activeProof ? 'primary' : 'default') : 'error'
												}
												onDelete={() => {
													proofs.splice(index, 1);
													setProofs([...proofs]);
												}}
												onClick={async (event) => {
													console.log('Chip', event, proof);
													console.log('hasPrivateKey', hasPrivateKey, hasPrivateKey.get(proof.pubkey));
													console.log('activeProof', activeProof);
													if (hasPrivateKey.get(proof.pubkey)) {
														setActiveProof(proof);
														localIdentity!.activeProof = proof;
														await addIdentity({ ...localIdentity! });
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
								id="proofsButton"
								variant="contained"
								sx={{ width: '100%' }}
								onClick={async () => {
									if (!localIdentity) {
										alert('No local identity found. Please create a new identity.');
										return;
									}
									console.log('proofsButton', proofs);
									const sk = schnorr.utils.randomPrivateKey(); // `sk` is a Uint8Array
									const pk = schnorr.getPublicKey(sk);

									const signResponse = await signMessageById({
										id: localIdentity.did,
										message: bytesToHex(pk),
									} as SignMessageByIdRequest);

									const resp = await addNostrKeypair({
										publicKey: bytesToHex(pk),
										privateKey: bytesToHex(sk),
										proof: signResponse.signature,
									});
									if (resp.status === 'success') {
										setProofs([...proofs, { pubkey: bytesToHex(pk), proof: signResponse.signature }]);
										setActiveProof({ pubkey: bytesToHex(pk), proof: signResponse.signature });
										localIdentity!.activeProof = { pubkey: bytesToHex(pk), proof: signResponse.signature };
										localIdentity!.proofs.push({
											pubkey: bytesToHex(pk),
											proof: signResponse.signature,
										});
										await addIdentity({ ...localIdentity! });
									} else {
										alert(`Error adding key: ${resp.message}`);
									}
								}}
							>
								Create New Nostr Key
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								id="proofsImportButton"
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
													if (!localIdentity) {
														alert('No local identity found. Please create a new identity.');
														return;
													}
													if (tempPublicKey && tempPrivateKey) {
														const signResponse = await signMessageById({
															id: localIdentity.did,
															message: tempPublicKey,
														} as SignMessageByIdRequest);

														const resp = await addNostrKeypair({
															publicKey: tempPublicKey,
															privateKey: tempPrivateKey,
															proof: signResponse.signature,
														});
														if (resp.status === 'success') {
															setProofs([...proofs, { pubkey: tempPublicKey, proof: signResponse.signature }]);
															setActiveProof({ pubkey: tempPublicKey, proof: signResponse.signature });
															localIdentity!.activeProof = { pubkey: tempPublicKey, proof: signResponse.signature };
															localIdentity!.proofs.push({
																pubkey: tempPublicKey,
																proof: signResponse.signature,
															});
															await addIdentity({ ...localIdentity! });
														} else {
															alert(`Error adding key: ${resp.message}`);
														}
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
									if (!activeProof) {
										alert('Please select an active Nostr public key.');
										return;
									}
									if (chiaProfile) {
										if (!chiaProfile.metadata) chiaProfile.metadata = {};
										if (displayName !== '') chiaProfile.metadata.slimeDisplayName = displayName;
										if (avatar !== '') chiaProfile.metadata.slimeAvatar = avatar;
										if (bio !== '') chiaProfile.metadata.slimeBio = bio;
										if (location !== '') chiaProfile.metadata.slimeLocation = location;
										if (languages.length !== 0) chiaProfile.metadata.slimeLanguages = JSON.stringify(languages);
										if (links.length !== 0) chiaProfile.metadata.slimeLinks = JSON.stringify(links);
										if (proofs.length !== 0) chiaProfile.metadata.slimeProofs = JSON.stringify(proofs);
										if (activeProof) chiaProfile.metadata.slimeActiveProof = JSON.stringify(activeProof);

										onUpdateMetadata(chiaProfile.metadata);

										const createdAt = Math.floor(Date.now() / 1000);

										const event: NostrEvent = {
											content: JSON.stringify({
												...chiaProfile.metadata,
												name: chiaProfile.metadata.slimeDisplayName,
												about: chiaProfile.metadata.slimeBio,
												picture: chiaProfile.metadata.slimeAvatar,
											}),
											kind: 0,
											tags: [['i', `chia:${chiaProfile.did}`, activeProof.proof]],
											created_at: createdAt,
											pubkey: activeProof.pubkey,
											id: '',
											sig: '',
										};
										event.id = getEventHash(event);
										const signResp = await signNostrMessage({ message: event.id });
										console.log('signResp', signResp);
										event.sig = signResp.signature;

										if (nostrRelays) {
											nostrPool.publish(
												nostrRelays.map((relay) => relay.url),
												event
											);
										}
									}
								}}
							/>
							<Button
								// disabled={!chiaProfile?.coinAvailable}
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
							<code>Chia: {JSON.stringify(chiaProfile, null, 2)}</code>
						</Grid>
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>
						<code>local: {JSON.stringify(localIdentity, null, 2)}</code>
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>
						<Grid item xs={12}>
							<code>config: {JSON.stringify(slimeConfig, null, 2)}</code>
						</Grid>
					</Grid>
					<Modal
						open={openNotice}
						onClose={() => {
							setOpenNotice(false);
						}}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={infoModalStyle}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								{noticeTitle}
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								{noticeMessage}
							</Typography>
						</Box>
					</Modal>
				</Container>
			</Dialog>
		</Paper>
	);
}
