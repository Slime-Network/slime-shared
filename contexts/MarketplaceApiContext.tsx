import axios from "axios";
import {
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";

import { Media } from "../types/Media";
import { InstallDataParams, RequestListingOrUpdateParams, SearchParams } from "../types/SearchTypes";

/**
 * Types
 */
interface IContext {
	apiUrl: string,
	setApiUrl: React.Dispatch<React.SetStateAction<string>>,
	search: {
		search: SearchCallback,
		mostRecent: SearchCallback,
		installData: InstallDataCallback,
	},
	listing: {
		requestListingOrUpdate: ListingStatusCallback,
		setPublic: ListingStatusCallback,
	}
}

type SearchCallback = (params: SearchParams) => Promise<Media[]>;
type InstallDataCallback = (params: InstallDataParams) => Promise<Media>;
type ListingStatusCallback = (params: RequestListingOrUpdateParams) => Promise<boolean>;

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
	const [apiUrl, setApiUrl] = useState('http://localhost:5233');

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
			const response = await axios.get(`${apiUrl}/listings/search`, { params });
			return hitsToGameList(response.data.hits.hits);
		},

		mostRecent: async (params: SearchParams) => {
			const response = await axios.get(`${apiUrl}/listings/mostRecent`, { params });
			return hitsToGameList(response.data.hits.hits);
		},
		installData: async (params: InstallDataParams) => {
			const response = await axios.get(`${apiUrl}/listings/getInstallData`, { params });
			return response.data.hits.hits[0];
		}
	};

	const listing = {
		requestListingOrUpdate: async (params: RequestListingOrUpdateParams) => {
			const response = await axios.get(`${apiUrl}/listings/requestListingOrUpdate`, { params });
			console.log("requestListingOrUpdate response", response);
			return true;
		},
		setPublic: async (params: RequestListingOrUpdateParams) => {
			const response = await axios.get(`${apiUrl}/listings/setPublic`, { params });
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
		</MarketplaceApiContext.Provider>
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
