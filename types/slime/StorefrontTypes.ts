export type Product = {
	productId: string;
	name: string;
	description: string;
	longDescription: string;
	price: number;
	options: string[];
	images: string[];
	videos: string[];
	stock: {
		quantity: number;
		option: string;
	}[];
	creator: string;
	hasPhysical: boolean;
	hasChiaAsset: boolean;
	lastUpdated: number;
	isPublic: boolean;
};

export type OrderProduct = {
	product: Product;
	option: string;
	pricePaid: number;
	quantity: number;
};

export type Order = {
	orderId: string;
	customerName: string;
	customerEmail: string;
	customerAddress: string;
	customerDid: string;
	products: OrderProduct[];
	totalPrice: number;
	orderDate: Date;
	orderCodes: string[];
};

export type Person = {
	personId: string;
	name: string;
	description: string;
	longDescription: string;
	did: string;
	socials: { platform: string; url: string }[];
	images: { url: string; type: string }[];
	videos: { url: string; type: string }[];
	lastUpdated: number;
	isPublic: boolean;
};
