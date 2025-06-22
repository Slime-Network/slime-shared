export type Product = {
	productId: string;
	name: string;
	description: string;
	price: number;
	options: string[];
	images: string[];
	videos: string[];
	stock: {
		quantity: number;
		option: string;
	};
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
	socials: any[];
	description: string;
	images: any[];
	videos: any[];
	lastUpdated: number;
	isPublic: boolean;
};
