import axios from "axios";
import {
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";

import { Media } from "../types/Media";
import { InstallDataParams, RequestListingOrUpdateParams, SearchParams, SetMediaPublicParams } from "../types/SearchTypes";

/**
 * Types
 */
interface IContext {
	apiUrl: string,
	setApiUrl: React.Dispatch<React.SetStateAction<string>>,
	search: {
		search: SearchCallback,
		mostRecent: SearchCallback,
		getSignMessage: SignMessageCallback,
		getInstallData: InstallDataCallback,
	},
	listing: {
		requestListingOrUpdate: ListingStatusCallback,
		setMediaPublic: SetPublicStatusCallback,
	}
}

type SearchCallback = (params: SearchParams) => Promise<Media[]>;
type InstallDataCallback = (params: InstallDataParams) => Promise<Media>;
type ListingStatusCallback = (params: RequestListingOrUpdateParams) => Promise<boolean>;
type SetPublicStatusCallback = (params: SetMediaPublicParams) => Promise<boolean>;
type SignMessageCallback = () => Promise<any>;

/**
 * Context
 */
export const MarketplaceApiContext = createContext<IContext>({} as IContext);

/**
 * Provider
 */
export const MarketplaceApiContextProvider = ({ children }: {
	children: ReactNode | ReactNode[];
}) => {
	const [apiUrl, setApiUrl] = useState('http://api.spriggan.club');

	const hitsToGameList = (hits: any) => {
		const games = new Array<Media>();
		if (hits) {
			hits.forEach((hit: any) => {
				// eslint-disable-next-line no-underscore-dangle -- needed because reading axios response
				games.push(hit._source as Media);
			});
		}
		return games;
	};

	const search = {
		search: async (params: SearchParams) => {
			if (params.url) {
				const response = await axios.get(`${params.url}/listings/search`, { params });
				return hitsToGameList(response.data.hits.hits);
			}
			const response = await axios.get(`${apiUrl}/listings/search`, { params });
			return hitsToGameList(response.data.hits.hits);
		},

		mostRecent: async (params: SearchParams) => {
			if (params.url) {
				const response = await axios.get(`${params.url}/listings/mostRecent`, { params });
				return hitsToGameList(response.data.hits.hits);
			}
			const response = await axios.get(`${apiUrl}/listings/mostRecent`, { params });
			return hitsToGameList(response.data.hits.hits);
		},
		getSignMessage: async () => {
			const response = await axios.get(`${apiUrl}/listings/getSignMessage`);
			console.log("sign message", response);
			return response;
		},
		getInstallData: async (params: InstallDataParams) => {
			if (params.url) {
				const response = await axios.get(`${params.url}/listings/getInstallData`, { params });
				return hitsToGameList(response.data.hits.hits)[0];
			}
			const response = await axios.get(`${apiUrl}/listings/getInstallData`, { params });
			return hitsToGameList(response.data.hits.hits)[0];
		},

	};

	const listing = {
		requestListingOrUpdate: async (params: RequestListingOrUpdateParams) => {
			try {
				if (params.url) {
					const response = await axios.post(`${params.url}/listings/requestListingOrUpdate`, { params }, { headers: { 'max-http-header-size': 1_000_000_000 } });
					console.log("requestListingOrUpdate response", response);
					return true;
				}
				const response = await axios.post(`${apiUrl}/listings/requestListingOrUpdate`, { params }, { headers: { 'max-http-header-size': 1_000_000_000 } });
				console.log("requestListingOrUpdate response", response);
				return true;
			} catch (e) {
				console.log("requestListingOrUpdate error", e);
				return false;
			}
		},
		setMediaPublic: async (params: SetMediaPublicParams) => {
			if (params.url) {
				const response = await axios.get(`${params.url}/listings/setMediaPublic`, { params });
				console.log("setPublic response", response);
				return true;
			}
			const response = await axios.get(`${apiUrl}/listings/setMediaPublic`, { params });
			console.log("setPublic response", response);
			return true;
		}
	};

	return (
		<MarketplaceApiContext.Provider
			value={{
				apiUrl,
				setApiUrl,
				search,
				listing,
			}}
		>
			{children}
		</MarketplaceApiContext.Provider >
	);
};

export const useMarketplaceApi = () => {
	const context = useContext(MarketplaceApiContext);
	if (context === undefined) {
		throw new Error(
			"useMarketplaceApi must be used within a MarketplaceApiContextProvider"
		);
	}
	return context;
};
