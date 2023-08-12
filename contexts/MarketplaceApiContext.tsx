import axios from "axios";
import {
	createContext,
	ReactNode,
	useContext,
	useState,
} from "react";

import { GetSignMessageRequest, GetSignMessageResponse, GetInstallDataRequest, GetInstallDataResponse, RequestListingOrUpdateRequest, RequestListingOrUpdateResponse, SearchRequest, SearchResponse, SetMediaPublicRequest, SetMediaPublicResponse } from "../types/spriggan/MarketplaceApiTypes";
import { Media } from "../types/spriggan/Media";

/**
 * Types
 */
interface IContext {
	apiUrl: string,
	setApiUrl: React.Dispatch<React.SetStateAction<string>>,
	search: SearchCallback,
	getSignMessage: GetSignMessageCallback,
	getInstallData: InstallDataCallback,
	requestListingOrUpdate: RequestListingOrUpdateCallback,
	setMediaPublic: SetPublicStatusCallback,
}

type SearchCallback = (params: SearchRequest) => Promise<SearchResponse>;
type InstallDataCallback = (params: GetInstallDataRequest) => Promise<GetInstallDataResponse>;
type RequestListingOrUpdateCallback = (params: RequestListingOrUpdateRequest) => Promise<RequestListingOrUpdateResponse>;
type SetPublicStatusCallback = (params: SetMediaPublicRequest) => Promise<SetMediaPublicResponse>;
type GetSignMessageCallback = (params: GetSignMessageRequest) => Promise<GetSignMessageResponse>;

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

	const search = async (params: SearchRequest) => {
		try {
			const response = await axios.get(`${apiUrl}/listings/search`, { params });
			return {
				results: hitsToGameList(response.data.hits.hits),
				message: response.data.message
			} as SearchResponse;
		} catch (e) {
			return {
				results: [],
				message: "An unknown error occurred during search"
			} as SearchResponse;
		};
	};

	const getSignMessage = async (params: GetSignMessageRequest) => {
		try {
			const response = await axios.get(`${apiUrl}/listings/getSignMessage`, { params });
			return { message: response.data.message } as GetSignMessageResponse;
		} catch (e) {
			return { message: "An unknown error occurred during getSignMessage" } as GetSignMessageResponse;
		}
	};

	const getInstallData = async (params: GetInstallDataRequest) => {
		try {
			const response = await axios.get(`${apiUrl}/listings/getInstallData`, { params });
			return { installData: hitsToGameList(response.data.hits.hits)[0], message: response.data.message } as GetInstallDataResponse;
		} catch (e) {
			return { message: "An unknown error occurred during getInstallData" } as GetInstallDataResponse;
		}
	};

	const requestListingOrUpdate = async (params: RequestListingOrUpdateRequest) => {
		try {
			const response = await axios.post(`${apiUrl}/listings/requestListingOrUpdate`, { params }, { headers: { 'max-http-header-size': 1_000_000_000 } });
			return { currentStatus: response.data.currentStatus, message: response.data.message } as RequestListingOrUpdateResponse;
		} catch (e) {
			return { currentStatus: "Error", message: "An unknown error occurred during requestListingOrUpdate" } as RequestListingOrUpdateResponse;
		}
	};

	const setMediaPublic = async (params: SetMediaPublicRequest) => {
		try {
			const response = await axios.get(`${apiUrl}/listings/setMediaPublic`, { params });
			return { currentStatus: response.data.currentStatus, message: response.data.message } as SetMediaPublicResponse;
		} catch (e) {
			return { currentStatus: "Error", message: "An unknown error occurred during setMediaPublic" } as RequestListingOrUpdateResponse;
		}
	};

	return (
		<MarketplaceApiContext.Provider
			value={{
				apiUrl,
				setApiUrl,
				search,
				getSignMessage,
				getInstallData,
				requestListingOrUpdate,
				setMediaPublic
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
