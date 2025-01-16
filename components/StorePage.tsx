import { Buffer } from 'buffer';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
	Grid,
	Tab,
	Tabs,
	Dialog,
	Container,
	Typography,
	Button,
	AppBar,
	Toolbar,
	Slide,
	Paper,
	IconButton,
	Box,
	Stack,
	Divider,
	Autocomplete,
	TextField,
	SlideProps,
	Chip,
} from '@mui/material';
import axios from 'axios';
import { bech32m } from 'bech32';
import { sha256 } from 'js-sha256';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Slide as Slideshow } from 'react-slideshow-image';

import { useWalletConnectRpc } from '../contexts/WalletConnectRpcContext';
import { Media } from '../types/slime/Media';
import { TakeOfferRequest } from '../types/walletconnect/rpc/TakeOffer';
import { CommentSection } from './CommentSection';
import 'react-slideshow-image/dist/styles.css';

const Transition = React.forwardRef((props: SlideProps, ref) => <Slide direction="up" ref={ref} {...props} />);

export type TabPanelProps = {
	children: any;
	index: number;
	value: number;
};

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function TabProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export type StorePageProps = {
	media: Media;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StorePage(props: StorePageProps) {
	const { media, open, setOpen } = props;

	const [activeOffer, setActiveOffer] = React.useState<any | undefined>({});

	const [price, setPrice] = React.useState('');
	const [asset, setAsset] = React.useState('TXCH');
	const [tab, setTab] = React.useState(0);

	const { takeOffer } = useWalletConnectRpc();

	const onBuy = () => {
		console.log('Buying', activeOffer);
		takeOffer({ offer: activeOffer } as TakeOfferRequest);
	};

	React.useEffect(() => {
		if (open) {
			console.log('screenshots', media.screenshots);
			const pubdid = media.publisherDid;
			const id = media.productId;

			const decoded = Buffer.from(bech32m.fromWords(bech32m.decode(pubdid).words)).toString('hex');

			const col = sha256
				.create()
				.update(decoded + id)
				.hex();
			const collectionID = bech32m.encode('col', bech32m.toWords(Buffer.from(col, 'hex')));

			axios
				.get(`https://api-testnet.dexie.space/v1/offers`, {
					params: { requested: asset, offered: collectionID, page_size: 1 },
				})
				.then((res) => {
					console.log(res);
					if (res.data.offers.length > 0) {
						setActiveOffer(res.data.offers[0].offer);
						setPrice(res.data.offers[0].requested[0].amount);
					} else {
						setPrice('Not Found');
					}
				});
		}
	}, [asset, media, open, setActiveOffer]);

	const assets = ['TXCH', 'USDS', 'SBX'];

	const handleClose = () => {
		setOpen(false);
	};

	const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
		setTab(newValue);
	};

	return (
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6">
						{media.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<AppBar position="static">
					<Tabs
						value={tab}
						onChange={handleTabChange}
						indicatorColor="secondary"
						textColor="inherit"
						variant="fullWidth"
					>
						<Tab label="Trailer" {...TabProps(0)} />
						<Tab label="Screenshots" {...TabProps(1)} />
					</Tabs>
				</AppBar>
				<Grid container height={420} sx={{ width: '100%' }}>
					<Grid id="mediaSection" item xs={12} md={8} sx={{ height: '100%' }}>
						<TabPanel value={tab} index={0}>
							<Box sx={{ height: '100%' }}>
								<iframe
									src={`https://www.youtube.com/embed/${media.trailer}?autoplay=1&origin=http://.com`}
									height={'370'}
									width={'100%'}
								/>
							</Box>
						</TabPanel>
						<TabPanel value={tab} index={1}>
							<Box sx={{ height: '100%' }}>
								<Slideshow>
									{media.screenshots &&
										media.screenshots.map((screenshot, index) => (
											<div
												key={index}
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													backgroundSize: 'cover',
													height: '370px',
													backgroundImage: `url(${screenshot})`,
												}}
											/>
										))}
								</Slideshow>
							</Box>
						</TabPanel>
					</Grid>
					<Grid id="infoSection" item xs={12} md={4} sx={{ height: '100%' }}>
						<Stack sx={{ height: '100%' }}>
							<Paper elevation={1} sx={{ height: '60%', p: 2, m: 2 }}>
								<Stack justifyContent={'space-between'} alignContent={'center'} direction="column" height={'100%'}>
									<Box>
										<Typography variant="h5">{media.title}</Typography>
										<Divider />
									</Box>
									<Box>
										<Typography height={'100%'}>{media.description}</Typography>
									</Box>
									<Box>
										<Divider />
										{media.tags &&
											media.tags.map((tag, index) => <Chip size="small" label={tag} key={index} sx={{ m: 1 }} />)}
									</Box>
								</Stack>
							</Paper>
							<Paper elevation={1} sx={{ height: '40%', p: 2, m: 2 }}>
								<Grid container>
									<Grid item xs={6}>
										<Typography alignItems={'center'} sx={{ m: 2 }}>
											{price} {asset}
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Autocomplete
											id="asset-combo-box"
											disableClearable
											disablePortal
											freeSolo
											defaultValue="XCH"
											options={assets}
											sx={{ m: 2 }}
											renderInput={(params) => <TextField {...params} />}
											onChange={(event: any, newAsset: string | null) => {
												if (newAsset && newAsset !== asset) {
													setAsset(newAsset);
												}
											}}
										/>
									</Grid>
									<Grid item xs={10}>
										<Button disabled={activeOffer} fullWidth={true} variant="contained" onClick={onBuy}>
											Buy
										</Button>
									</Grid>
									<Grid item xs={2}>
										<IconButton
											onClick={() => {
												navigator.clipboard.writeText(activeOffer);
											}}
										>
											<ContentCopyIcon />
										</IconButton>
									</Grid>
								</Grid>
							</Paper>
						</Stack>
					</Grid>
					<Paper elevation={1} sx={{ width: '100%', p: 2, m: 2 }}>
						<ReactMarkdown children={media.longDescription} />
					</Paper>
					{CommentSection({
						media,
						open,
					})}
				</Grid>
			</Container>
		</Dialog>
	);
}
