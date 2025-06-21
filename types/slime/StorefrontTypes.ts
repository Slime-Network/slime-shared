export type Product = {
	productId: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	videos: string[];
	quantity: number;
	hasPhysical: boolean;
	hasChiaAsset: boolean;
	lastUpdated: number;
	isPublic: boolean;
};

export type OrderProduct = {
	product: Product;
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
