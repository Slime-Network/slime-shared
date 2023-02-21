
export type NftMetadataResponse = {
	format: string,
	name: string,
	description: string,
	sensitive_content: boolean,
	collection: {
		name: string,
		id: string,
		attributes: [
			{
				type: string,
				value: string
			}
		]
	},
	attributes: [
		{
			trait_type: string,
			value: string
		}
	],
	minting_tool: string
}

export type NftMetadataParsed = {
	isMediaNFT: boolean,
	mediaType: string,
	productId: string,
	productName: string,
	datastoreId: string,
	edition: string,
	attributes: [
		{
			type: string,
			value: string
		}
	],
	traits: [
		{
			trait_type: string,
			value: string
		}
	],
}

export const parseNftMetadata = (resp: NftMetadataResponse): NftMetadataParsed => {
	
	var datastoreId = "";
	var isMediaNFT = false;
	var edition = "Standard";

	console.log(resp)

	for (const a of resp.collection.attributes) {
		if (a.type === "datastore id") {
			datastoreId = a.value;
			isMediaNFT = true;
		}
	}
	for (const a of resp.attributes) {
		if (a.trait_type === "Edition") {
			edition = a.value;
		}
	}

	// TODO: replace with updated metadata format
	return {
		isMediaNFT: isMediaNFT,
		mediaType: "game",
		productId: resp.collection.id,
		productName: resp.collection.name,
		datastoreId: datastoreId,
		edition: edition,
		attributes: resp.collection.attributes,
		traits: resp.attributes
	};
}

export type Media = {
	mediatype: string,
	banner: string,
	capsuleimage: string,
	contentrating: string,
	description: string,
	developer: string,
	discord: string,
	executables: string,
	facebook: string,
	icon: string,
	instagram: string,
	longdescription: string,
	password: string,
	paymentaddress: string,
	productid: string,
	publisher: string,
	publisherdid: string,
	screenshots: string,
	shortdescription: string,
	status: string,
	tags: string,
	title: string,
	torrents: string,
	trailer: string,
	trailersource: string,
	twitter: string,
	version: string,
	website: string,
}

// export default Media;