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
} from '@mui/material';
import * as React from 'react';

import { infoModalStyle } from '../constants';
import { Profile } from '../types/gosti/Profile';

const Transition = React.forwardRef((props: SlideProps, ref) => <Slide direction="up" ref={ref} {...props} />);

export type ProfileEditPageProps = {
	profile: Profile | undefined;
	onUpdateMetadata: (metadata: any) => void;
	onChangeName: (name: string) => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProfileEditPage(props: ProfileEditPageProps) {
	const { profile, onChangeName, onUpdateMetadata, open, setOpen } = props;

	const [openNotice, setOpenNotice] = React.useState(false);
	const [noticeTitle, setNoticeTitle] = React.useState<string | undefined>(undefined);
	const [noticeMessage, setNoticeMessage] = React.useState<string | undefined>(undefined);

	const [name, setName] = React.useState<string | undefined>(profile?.name);
	const [displayName, setDisplayName] = React.useState<string>(profile?.metadata?.gostiDisplayName || "");
	const [avatar, setAvatar] = React.useState<string>(profile?.metadata?.gostiAvatar || "");
	const [bio, setBio] = React.useState<string>(profile?.metadata?.gostiBio || "");
	const [location, setLocation] = React.useState<string>(profile?.metadata?.gostiLocation || "");
	const [website, setWebsite] = React.useState<string>(profile?.metadata?.gostiWebsite || "");
	const [twitter, setTwitter] = React.useState<string>(profile?.metadata?.gostiTwitter || "");
	const [facebook, setFacebook] = React.useState<string>(profile?.metadata?.gostiFacebook || "");
	const [instagram, setInstagram] = React.useState<string>(profile?.metadata?.gostiInstagram || "");
	const [linkedin, setLinkedin] = React.useState<string>(profile?.metadata?.gostiLinkedin || "");
	const [nostrPublicKeys, setNostrPublicKeys] = React.useState<string>(profile?.metadata?.gostiNostrPublicKeys || "[]");

	React.useEffect(() => {
		if (profile) {
			setName(profile?.name);
			setDisplayName(profile?.metadata?.gostiDisplayName || "");
			setAvatar(profile?.metadata?.gostiAvatar || "");
			setBio(profile?.metadata?.gostiBio || "");
			setLocation(profile?.metadata?.gostiLocation || "");
			setWebsite(profile?.metadata?.gostiWebsite || "");
			setTwitter(profile?.metadata?.gostiTwitter || "");
			setFacebook(profile?.metadata?.gostiFacebook || "");
			setInstagram(profile?.metadata?.gostiInstagram || "");
			setLinkedin(profile?.metadata?.gostiLinkedin || "");
			setNostrPublicKeys(profile?.metadata?.gostiNostrPublicKeys || "[]");
		}
	}, [profile]);

	const handleClose = () => {
		setOpen(false);
	};

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
						<Grid item xs={8}>
							<TextField id="NameTextField" sx={{ width: '100%' }} label="Profile Name" variant="filled" defaultValue={profile?.name} value={name} onChange={(event: any) => {
								setName(event.target.value);
							}} />
						</Grid>
						<Grid item xs={3}>
							<Button id="NameConfirmButton" disabled={!name} variant='contained' sx={{ width: '100%', height: "100%" }} onClick={() => {
								if (name)
									onChangeName(name);
							}}>Confirm</Button>
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Name");
								setNoticeMessage(`This is your local name for this profile, which is only visible to you. It does not require a transaction to update.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={12}>
							<HorizontalRule sx={{ width: '100%' }} />
						</Grid>
						<Grid item xs={11}>
							<TextField id="DisplayNameTextField" sx={{ width: '100%' }} label="Display Name" variant="filled" defaultValue={profile?.metadata?.gostiDisplayName} value={displayName} onChange={(event: any) => {
								setDisplayName(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>

						<Grid item xs={11}>
							<TextField id="AvatarTextField" sx={{ width: '100%' }} label="Avatar URL" variant="filled" defaultValue={profile?.metadata?.gostiAvatar} value={avatar} onChange={(event: any) => {
								setAvatar(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="BioTextField" sx={{ width: '100%' }} label="Bio" variant="filled" defaultValue={profile?.metadata?.gostiBio} value={bio} onChange={(event: any) => {
								setBio(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="LocationTextField" sx={{ width: '100%' }} label="Location" variant="filled" defaultValue={profile?.metadata?.gostiLocation} value={location} onChange={(event: any) => {
								setLocation(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="WebsiteTextField" sx={{ width: '100%' }} label="Website" variant="filled" defaultValue={profile?.metadata?.gostiWebsite} value={website} onChange={(event: any) => {
								setWebsite(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="TwitterTextField" sx={{ width: '100%' }} label="Twitter" variant="filled" defaultValue={profile?.metadata?.gostiTwitter} value={twitter} onChange={(event: any) => {
								setTwitter(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="FacebookTextField" sx={{ width: '100%' }} label="Facebook" variant="filled" defaultValue={profile?.metadata?.gostiFacebook} value={facebook} onChange={(event: any) => {
								setFacebook(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="InstagramTextField" sx={{ width: '100%' }} label="Instagram" variant="filled" defaultValue={profile?.metadata?.gostiInstagram} value={instagram} onChange={(event: any) => {
								setInstagram(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
						<Grid item xs={11}>
							<TextField id="LinkedinTextField" sx={{ width: '100%' }} label="Linkedin" variant="filled" defaultValue={profile?.metadata?.gostiLinkedin} value={linkedin} onChange={(event: any) => {
								setLinkedin(event.target.value);
							}} />
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>




						<Grid item xs={11}>
							<Button disabled={!profile?.coinAvailable} id="UpdateProfileButton" variant='contained' sx={{ width: '100%' }} onClick={() => {
								if (profile) {
									if (!profile.metadata) profile.metadata = {};
									if (displayName !== "") profile.metadata.gostiDisplayName = displayName;
									if (avatar !== "") profile.metadata.gostiAvatar = avatar;
									if (bio !== "") profile.metadata.gostiBio = bio;
									if (location !== "") profile.metadata.gostiLocation = location;
									if (website !== "") profile.metadata.gostiWebsite = website;
									if (twitter !== "") profile.metadata.gostiTwitter = twitter;
									if (facebook !== "") profile.metadata.gostiFacebook = facebook;
									if (instagram !== "") profile.metadata.gostiInstagram = instagram;
									if (linkedin !== "") profile.metadata.gostiLinkedin = linkedin;
									if (nostrPublicKeys !== "") profile.metadata.gostiNostrPublicKeys = nostrPublicKeys;

									onUpdateMetadata(profile.metadata);
								}
							}}>Update Profile</Button>
						</Grid>
						<Grid item xs={1}>
							<IconButton size="small" aria-label="info" onClick={() => {
								setNoticeTitle("Profile Update Fee");
								setNoticeMessage(`Creating or updating a profile requires a blockchain transaction. This optional fee can help speed up that transaction if volume is high.`);
								setOpenNotice(true);
							}}><InfoIcon /></IconButton>
						</Grid>
					</Grid>
					<Modal
						open={openNotice}
						onClose={() => { setOpenNotice(false); }}
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
		</Paper >
	);
}
