import axios from "axios";
import {
	createContext,
	ReactNode,
	useContext,
} from "react";

import { GetSignMessageRequest, GetSignMessageResponse, GetInstallDataRequest, GetInstallDataResponse, RequestListingOrUpdateRequest, RequestListingOrUpdateResponse, SearchRequest, SearchResponse, SetMediaPublicRequest, SetMediaPublicResponse, UploadFileRequest, UploadResponse, UploadTextRequest } from "../types/gosti/MarketplaceApiTypes";
import { Media } from "../types/gosti/Media";
import { useGostiApi } from "./GostiApiContext";

/**
 * Types
 */
interface IContext {
	search: SearchCallback,
	getSignMessage: GetSignMessageCallback,
	getInstallData: InstallDataCallback,
	uploadFile: UploadFileCallback,
	uploadText: UploadTextCallback,
	requestListingOrUpdate: RequestListingOrUpdateCallback,
	setMediaPublic: SetPublicStatusCallback,
}

type SearchCallback = (params: SearchRequest) => Promise<SearchResponse>;
type InstallDataCallback = (params: GetInstallDataRequest) => Promise<GetInstallDataResponse>;
type UploadFileCallback = (params: UploadFileRequest) => Promise<UploadResponse>;
type UploadTextCallback = (params: UploadTextRequest) => Promise<UploadResponse>;
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
	const { gostiConfig } = useGostiApi();

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
			const response = await axios.get(`${gostiConfig.activeMarketplace.url}/listings/search`, { params });
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
			const response = await axios.get(`${gostiConfig.activeMarketplace.url}/listings/getSignMessage`, { params });
			return { message: response.data.message } as GetSignMessageResponse;
		} catch (e) {
			return { message: "An unknown error occurred during getSignMessage" } as GetSignMessageResponse;
		}
	};

	const getInstallData = async (params: GetInstallDataRequest) => {
		try {
			const response = await axios.get(`${gostiConfig.activeMarketplace.url}/listings/getInstallData`, { params });
			return { installData: hitsToGameList(response.data.hits.hits)[0], message: response.data.message } as GetInstallDataResponse;
		} catch (e) {
			return { message: "An unknown error occurred during getInstallData" } as GetInstallDataResponse;
		}
	};

	const uploadText = async (params: UploadTextRequest) => {
		try {
			const response = await axios.post(`${params.url ? params.url : gostiConfig.activeMarketplace.url}/files/uploadText`, { params });
			return { id: response.data.id, message: response.data.message } as UploadResponse;
		} catch (e) {
			return { message: "An unknown error occurred during uploadFile" } as UploadResponse;
		}
	};

	const uploadFile = async (params: UploadFileRequest) => {
		try {
			const formData = new FormData();
			formData.append('file', params.file);
			const response = await axios.post(`${params.url ? params.url : gostiConfig.activeMarketplace.url}/files/uploadFile`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'max-http-header-size': 1_000_000_000
				}
			});
			return { id: response.data.id, message: response.data.message } as UploadResponse;
		} catch (e) {
			return { message: "An unknown error occurred during uploadFile" } as UploadResponse;
		}
	};

	const requestListingOrUpdate = async (params: RequestListingOrUpdateRequest) => {
		try {
			const response = await axios.post(`${params.url ? params.url : gostiConfig.activeMarketplace.url}/listings/requestListingOrUpdate`, { params }, { headers: { 'max-http-header-size': 1_000_000_000 } });
			return { currentStatus: response.data.currentStatus, message: response.data.message } as RequestListingOrUpdateResponse;
		} catch (e) {
			return { currentStatus: "Error", message: "An unknown error occurred during requestListingOrUpdate" } as RequestListingOrUpdateResponse;
		}
	};

	const setMediaPublic = async (params: SetMediaPublicRequest) => {
		try {
			const response = await axios.get(`${params.url ? params.url : gostiConfig.activeMarketplace.url}/listings/setMediaPublic`, { params });
			return { currentStatus: response.data.currentStatus, message: response.data.message } as SetMediaPublicResponse;
		} catch (e) {
			return { currentStatus: "Error", message: "An unknown error occurred during setMediaPublic" } as RequestListingOrUpdateResponse;
		}
	};

	return (
		<MarketplaceApiContext.Provider
			value={{
				search,
				getSignMessage,
				getInstallData,
				uploadFile,
				uploadText,
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
