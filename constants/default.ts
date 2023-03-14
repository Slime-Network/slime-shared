export enum SPRIGGAN_METHODS {
	PING = "ping",
	DOWNLOAD_MEDIA = "downloadMedia",
	GET_LOCAL_DATA = "getLocalData",
	SAVE_LOCAL_DATA = "saveLocalData",
	GET_CONFIG = "getConfig",
	SAVE_CONFIG = "saveConfig",
	GET_OWNED_DATASTORES = "getOwnedDatastores",
	GET_PUBLISHED_MEDIA = "getPublishedMedia",
	PUBLISH_MEDIA = "publishMedia",
	CREATE_DATASTORE = "createDatastore",
	GENERATE_TORRENTS = "generateTorrents",
	MINT_NFT_COPIES = "mintNftCopies",
}

export const MediaTypes = [
	"Game",
	"DApp",
	"Software",
	"Visual Novel",
	"Video",
	"Animation",
	"Book",
	"Audio Book",
];

export const RatingOptions = [
	"Everyone",
	"Everyone 10+",
	"Teen",
	"Mature",
	"Adults Only 18+"
];

export const VideoSources = [
	"Youtube"
];

export const DefaultExecutables = `{
	"windows": "game.exe",
	"mac": "",
	"linux": "",
}`;

export const DevelopmentStatuses = [
	"Coming Soon",
	"Pre-Release",
	"Early Access",
	"Complete",
];

export const KnownMarketplaces = [
	"http://localhost:5233",
];

export const infoModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "80%",
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const successModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "80%",
	bgcolor: 'background.paper',
	border: '2px solid #0f0',
	boxShadow: 24,
	p: 4,
};

export const errorModalStyle = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "80%",
	bgcolor: 'background.paper',
	border: '2px solid #f00',
	boxShadow: 24,
	p: 4,
};