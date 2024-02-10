import { createContext, PropsWithChildren, useContext } from 'react';

import { ChiaMethod } from '../constants/wallet-connect';
import {
    AddCatTokenRequest,
    AddCatTokenResponse,
} from '../types/walletconnect/rpc/AddCatToken';
import { AddMirrorRequest, AddMirrorResponse } from '../types/walletconnect/rpc/AddMirror';
import { AddMissingFilesRequest, AddMissingFilesResponse } from '../types/walletconnect/rpc/AddMissingFiles';
import { BatchUpdateRequest, BatchUpdateResponse } from '../types/walletconnect/rpc/BatchUpdate';
import { CancelDataLayerOfferRequest, CancelDataLayerOfferResponse } from '../types/walletconnect/rpc/CancelDataLayerOffer';
import {
    CancelOfferRequest,
    CancelOfferResponse,
} from '../types/walletconnect/rpc/CancelOffer';
import {
    CheckOfferValidityRequest,
    CheckOfferValidityResponse,
} from '../types/walletconnect/rpc/CheckOfferValidity';
import { CheckPluginsRequest, CheckPluginsResponse } from '../types/walletconnect/rpc/CheckPlugins';
import { ClearPendingRootsRequest, ClearPendingRootsResponse } from '../types/walletconnect/rpc/ClearPendingRoots';
import { CreateDataStoreRequest, CreateDataStoreResponse } from '../types/walletconnect/rpc/CreateDataStore';
import { CreateNewDIDWalletRequest, CreateNewDIDWalletResponse } from '../types/walletconnect/rpc/CreateNewDidWallet';
import {
    CreateOfferForIdsRequest,
    CreateOfferForIdsResponse,
} from '../types/walletconnect/rpc/CreateOfferForIds';
import { DeleteKeyRequest, DeleteKeyResponse } from '../types/walletconnect/rpc/DeleteKey';
import { DeleteMirrorRequest, DeleteMirrorResponse } from '../types/walletconnect/rpc/DeleteMirror';
import { FindLostDIDRequest, FindLostDIDResponse } from '../types/walletconnect/rpc/FindLostDID';
import {
    GetAllOffersRequest,
    GetAllOffersResponse,
} from '../types/walletconnect/rpc/GetAllOffers';
import { GetAncestorsRequest, GetAncestorsResponse } from '../types/walletconnect/rpc/GetAncestors';
import {
    GetCatAssetIdRequest,
    GetCatAssetIdResponse,
} from '../types/walletconnect/rpc/GetCatAssetId';
import {
    GetCatWalletInfoRequest,
    GetCatWalletInfoResponse,
} from '../types/walletconnect/rpc/GetCatWalletInfo';
import {
    GetCurrentAddressRequest,
    GetCurrentAddressResponse,
} from '../types/walletconnect/rpc/GetCurrentAddress';
import { GetDIDRequest, GetDIDResponse } from '../types/walletconnect/rpc/GetDID';
import { GetDIDCurrentCoinInfoRequest, GetDIDCurrentCoinInfoResponse } from '../types/walletconnect/rpc/GetDIDCurrentCoinInfo';
import { GetDIDInfoRequest, GetDIDInfoResponse } from '../types/walletconnect/rpc/GetDIDInfo';
import { GetDIDInformationNeededForRecoveryRequest, GetDIDInformationNeededForRecoveryResponse } from '../types/walletconnect/rpc/GetDIDInformationNeededForRecovery';
import { GetDIDMetadataRequest, GetDIDMetadataResponse } from '../types/walletconnect/rpc/GetDIDMetadata';
import { GetDIDNameRequest, GetDIDNameResponse } from '../types/walletconnect/rpc/GetDIDName';
import { GetDIDPubkeyRequest, GetDIDPubkeyResponse } from '../types/walletconnect/rpc/GetDIDPubkey';
import { GetDIDRecoveryListRequest, GetDIDRecoveryListResponse } from '../types/walletconnect/rpc/GetDIDRecoveryList';
import { GetDataLayerSyncStatusRequest, GetDataLayerSyncStatusResponse } from '../types/walletconnect/rpc/GetDataLayerSyncStatus';
import { GetKeysRequest, GetKeysResponse } from '../types/walletconnect/rpc/GetKeys';
import { GetKeysValuesRequest, GetKeysValuesResponse } from '../types/walletconnect/rpc/GetKeysValues';
import { GetKvDiffRequest, GetKvDiffResponse } from '../types/walletconnect/rpc/GetKvDiff';
import { GetLocalRootRequest, GetLocalRootResponse } from '../types/walletconnect/rpc/GetLocalRoot';
import { GetMirrorsRequest, GetMirrorsResponse } from '../types/walletconnect/rpc/GetMirrors';
import {
    GetNextAddressRequest,
    GetNextAddressResponse,
} from '../types/walletconnect/rpc/GetNextAddress';
import {
    GetNftInfoRequest,
    GetNftInfoResponse,
} from '../types/walletconnect/rpc/GetNftInfo';
import { GetNftWalletsWithDIDsRequest, GetNftWalletsWithDIDsResponse } from '../types/walletconnect/rpc/GetNftWalletsWithDids';
import {
    GetNftsRequest,
    GetNftsResponse,
} from '../types/walletconnect/rpc/GetNfts';
import {
    GetNftsCountRequest,
    GetNftsCountResponse,
} from '../types/walletconnect/rpc/GetNftsCount';
import {
    GetOfferDataRequest,
    GetOfferDataResponse,
} from '../types/walletconnect/rpc/GetOfferData';
import {
    GetOfferRecordRequest,
    GetOfferRecordResponse,
} from '../types/walletconnect/rpc/GetOfferRecord';
import {
    GetOfferSummaryRequest,
    GetOfferSummaryResponse,
} from '../types/walletconnect/rpc/GetOfferSummary';
import {
    GetOffersCountRequest,
    GetOffersCountResponse,
} from '../types/walletconnect/rpc/GetOffersCount';
import { GetOwnedStoresRequest, GetOwnedStoresResponse } from '../types/walletconnect/rpc/GetOwnedStores';
import { GetRootRequest, GetRootResponse } from '../types/walletconnect/rpc/GetRoot';
import { GetRootHistoryRequest, GetRootHistoryResponse } from '../types/walletconnect/rpc/GetRootHistory';
import { GetRootsRequest, GetRootsResponse } from '../types/walletconnect/rpc/GetRoots';
import {
    GetSyncStatusRequest,
    GetSyncStatusResponse,
} from '../types/walletconnect/rpc/GetSyncStatus';
import {
    GetTransactionRequest,
    GetTransactionResponse,
} from '../types/walletconnect/rpc/GetTransaction';
import { GetValueRequest, GetValueResponse } from '../types/walletconnect/rpc/GetValue';
import {
    GetWalletBalanceRequest,
    GetWalletBalanceResponse,
} from '../types/walletconnect/rpc/GetWalletBalance';
import { GetWalletsRequest, GetWalletsResponse } from '../types/walletconnect/rpc/GetWallets';
import { InsertRequest, InsertResponse } from '../types/walletconnect/rpc/Insert';
import { LogInRequest, LogInResponse } from '../types/walletconnect/rpc/LogIn';
import { MakeDataLayerOfferRequest, MakeDataLayerOfferResponse } from '../types/walletconnect/rpc/MakeDataLayerOffer';
import { MintBulkRequest, MintBulkResponse } from '../types/walletconnect/rpc/MintBulk';
import {
    MintNftRequest,
    MintNftResponse,
} from '../types/walletconnect/rpc/MintNft';
import { PushTxRequest, PushTxResponse } from '../types/walletconnect/rpc/PushTx';
import { RemoveSubscriptionsRequest, RemoveSubscriptionsResponse } from '../types/walletconnect/rpc/RemoveSubscriptions';
import {
    SendTransactionRequest,
    SendTransactionResponse,
} from '../types/walletconnect/rpc/SendTransaction';
import { SetDIDNameRequest, SetDIDNameResponse } from '../types/walletconnect/rpc/SetDidName';
import { SetNftDIDRequest, SetNftDIDResponse } from '../types/walletconnect/rpc/SetNftDid';
import {
    SignMessageByAddressRequest,
    SignMessageByAddressResponse,
} from '../types/walletconnect/rpc/SignMessageByAddress';
import {
    SignMessageByIdRequest,
    SignMessageByIdResponse,
} from '../types/walletconnect/rpc/SignMessageById';
import { SpendCatRequest, SpendCatResponse } from '../types/walletconnect/rpc/SpendCat';
import { SubscribeRequest, SubscribeResponse } from '../types/walletconnect/rpc/Subscribe';
import { SubscriptionsRequest, SubscriptionsResponse } from '../types/walletconnect/rpc/Subscriptions';
import { TakeDataLayerOfferRequest, TakeDataLayerOfferResponse } from '../types/walletconnect/rpc/TakeDataLayerOffer';
import { TakeOfferRequest, TakeOfferResponse } from '../types/walletconnect/rpc/TakeOffer';
import { TransferDIDRequest, TransferDIDResponse } from '../types/walletconnect/rpc/TransferDID';
import {
    TransferNftRequest,
    TransferNftResponse,
} from '../types/walletconnect/rpc/TransferNft';
import { UnsubscribeRequest, UnsubscribeResponse } from '../types/walletconnect/rpc/Unsubscribe';
import { UpdateDIDMetadataRequest, UpdateDIDMetadataResponse } from '../types/walletconnect/rpc/UpdateDIDMetadata';
import { UpdateDIDRecoveryIdsRequest, UpdateDIDRecoveryIdsResponse } from '../types/walletconnect/rpc/UpdateDIDRecoveryIds';
import { VerifyOfferRequest, VerifyOfferResponse } from '../types/walletconnect/rpc/VerifyOffer';
import {
    VerifySignatureRequest,
    VerifySignatureResponse,
} from '../types/walletconnect/rpc/VerifySignature';
import { useWalletConnect } from './WalletConnectContext';

interface WalletConnectRpc {
    // Wallet
    logIn: (data: LogInRequest) => Promise<LogInResponse>;
    getWallets: (data: GetWalletsRequest) => Promise<GetWalletsResponse>;
    getTransaction: (
        data: GetTransactionRequest
    ) => Promise<GetTransactionResponse>;
    getWalletBalance: (
        data: GetWalletBalanceRequest
    ) => Promise<GetWalletBalanceResponse>;
    signMessageById: (
        data: SignMessageByIdRequest
    ) => Promise<SignMessageByIdResponse>;
    getCurrentAddress: (
        data: GetCurrentAddressRequest
    ) => Promise<GetCurrentAddressResponse>;
    pushTx: (data: PushTxRequest) => Promise<PushTxResponse>;
    sendTransaction: (
        data: SendTransactionRequest
    ) => Promise<SendTransactionResponse>;
    signMessageByAddress: (
        data: SignMessageByAddressRequest
    ) => Promise<SignMessageByAddressResponse>;
    verifySignature: (
        data: VerifySignatureRequest
    ) => Promise<VerifySignatureResponse>;
    getNextAddress: (
        data: GetNextAddressRequest
    ) => Promise<GetNextAddressResponse>;
    getSyncStatus: (
        data: GetSyncStatusRequest
    ) => Promise<GetSyncStatusResponse>;

    // Offers
    getAllOffers: (data: GetAllOffersRequest) => Promise<GetAllOffersResponse>;
    getOffersCount: (
        data: GetOffersCountRequest
    ) => Promise<GetOffersCountResponse>;
    createOfferForIds: (
        data: CreateOfferForIdsRequest
    ) => Promise<CreateOfferForIdsResponse>;
    cancelOffer: (data: CancelOfferRequest) => Promise<CancelOfferResponse>;
    checkOfferValidity: (
        data: CheckOfferValidityRequest
    ) => Promise<CheckOfferValidityResponse>;
    takeOffer: (data: TakeOfferRequest) => Promise<TakeOfferResponse>;
    getOfferSummary: (
        data: GetOfferSummaryRequest
    ) => Promise<GetOfferSummaryResponse>;
    getOfferData: (data: GetOfferDataRequest) => Promise<GetOfferDataResponse>;
    getOfferRecord: (
        data: GetOfferRecordRequest
    ) => Promise<GetOfferRecordResponse>;

    // CATs
    getCatWalletInfo: (
        data: GetCatWalletInfoRequest
    ) => Promise<GetCatWalletInfoResponse>;
    getCatAssetId: (
        data: GetCatAssetIdRequest
    ) => Promise<GetCatAssetIdResponse>;
    spendCat: (data: SpendCatRequest) => Promise<SpendCatResponse>;
    addCatToken: (data: AddCatTokenRequest) => Promise<AddCatTokenResponse>;

    // NFTs
    getNfts: (data: GetNftsRequest) => Promise<GetNftsResponse>;
    getNftInfo: (data: GetNftInfoRequest) => Promise<GetNftInfoResponse>;
    mintBulk: (data: MintBulkRequest) => Promise<MintBulkResponse>;
    mintNft: (data: MintNftRequest) => Promise<MintNftResponse>;
    transferNft: (data: TransferNftRequest) => Promise<TransferNftResponse>;
    getNftsCount: (data: GetNftsCountRequest) => Promise<GetNftsCountResponse>;

    // DataLayer
    addMirror: (data: AddMirrorRequest) => Promise<AddMirrorResponse>;
    addMissingFiles: (data: AddMissingFilesRequest) => Promise<AddMissingFilesResponse>;
    batchUpdate: (data: BatchUpdateRequest) => Promise<BatchUpdateResponse>;
    cancelDataLayerOffer: (data: CancelDataLayerOfferRequest) => Promise<CancelDataLayerOfferResponse>;
    checkPlugins: (data: CheckPluginsRequest) => Promise<CheckPluginsResponse>;
    clearPendingRoots: (data: ClearPendingRootsRequest) => Promise<ClearPendingRootsResponse>;
    createDataStore: (data: CreateDataStoreRequest) => Promise<CreateDataStoreResponse>;
    deleteKey: (data: DeleteKeyRequest) => Promise<DeleteKeyResponse>;
    deleteMirror: (data: DeleteMirrorRequest) => Promise<DeleteMirrorResponse>;
    getAncestors: (data: GetAncestorsRequest) => Promise<GetAncestorsResponse>;
    getKeys: (data: GetKeysRequest) => Promise<GetKeysResponse>;
    getKeysValues: (data: GetKeysValuesRequest) => Promise<GetKeysValuesResponse>;
    getKvDiff: (data: GetKvDiffRequest) => Promise<GetKvDiffResponse>;
    getLocalRoot: (data: GetLocalRootRequest) => Promise<GetLocalRootResponse>;
    getMirrors: (data: GetMirrorsRequest) => Promise<GetMirrorsResponse>;
    getOwnedStores: (data: GetOwnedStoresRequest) => Promise<GetOwnedStoresResponse>;
    getRoot: (data: GetRootRequest) => Promise<GetRootResponse>;
    getRoots: (data: GetRootsRequest) => Promise<GetRootsResponse>;
    getRootHistory: (data: GetRootHistoryRequest) => Promise<GetRootHistoryResponse>;
    getDataLayerSyncStatus: (data: GetDataLayerSyncStatusRequest) => Promise<GetDataLayerSyncStatusResponse>;
    getValue: (data: GetValueRequest) => Promise<GetValueResponse>;
    insert: (data: InsertRequest) => Promise<InsertResponse>;
    makeDataLayerOffer: (data: MakeDataLayerOfferRequest) => Promise<MakeDataLayerOfferResponse>;
    removeSubscriptions: (data: RemoveSubscriptionsRequest) => Promise<RemoveSubscriptionsResponse>;
    subscribe: (data: SubscribeRequest) => Promise<SubscribeResponse>;
    subscriptions: (data: SubscriptionsRequest) => Promise<SubscriptionsResponse>;
    takeDataLayerOffer: (data: TakeDataLayerOfferRequest) => Promise<TakeDataLayerOfferResponse>;
    unsubscribe: (data: UnsubscribeRequest) => Promise<UnsubscribeResponse>;
    verifyOffer: (data: VerifyOfferRequest) => Promise<VerifyOfferResponse>;

    // DIDs
    createNewDIDWallet: (
        data: CreateNewDIDWalletRequest
    ) => Promise<CreateNewDIDWalletResponse>;
    // didCreateAttest: (
    //     data: DIDCreateAttestRequest
    // ) => Promise<CreateAttestResponse>;
    // didCreateBackupFile: (
    //     data: DIDCreateBackupFileRequest
    // ) => Promise<CreateBackupFileResponse>;
    findLostDID: (
        data: FindLostDIDRequest
    ) => Promise<FindLostDIDResponse>;
    getDIDCurrentCoinInfo: (
        data: GetDIDCurrentCoinInfoRequest
    ) => Promise<GetDIDCurrentCoinInfoResponse>;
    getDID: (data: any) => Promise<any>;
    getDIDInfo: (data: GetDIDInfoRequest) => Promise<GetDIDInfoResponse>;
    getDIDInformationNeededForRecovery: (
        data: GetDIDInformationNeededForRecoveryRequest
    ) => Promise<GetDIDInformationNeededForRecoveryResponse>;
    getDIDMetadata: (
        data: GetDIDMetadataRequest
    ) => Promise<GetDIDMetadataResponse>;
    getDIDPubkey: (data: GetDIDPubkeyRequest) => Promise<GetDIDPubkeyResponse>;
    getDIDRecoveryList: (
        data: GetDIDRecoveryListRequest
    ) => Promise<GetDIDRecoveryListResponse>;
    getDIDName: (
        data: GetDIDNameRequest
    ) => Promise<GetDIDNameResponse>;
    // messageSpend: (
    //     data: DIDMessageSpendRequest
    // ) => Promise<MessageSpendResponse>;
    // recoverySpend: (
    //     data: DIDRecoverySpendRequest
    // ) => Promise<RecoverySpendResponse>;
    transferDID: (
        data: TransferDIDRequest
    ) => Promise<TransferDIDResponse>;
    updateDIDMetadata: (
        data: UpdateDIDMetadataRequest
    ) => Promise<UpdateDIDMetadataResponse>;
    updateDIDRecoveryIds: (
        data: UpdateDIDRecoveryIdsRequest
    ) => Promise<UpdateDIDRecoveryIdsResponse>;
    setDIDName: (data: SetDIDNameRequest) => Promise<SetDIDNameResponse>;
    setNftDID: (data: SetNftDIDRequest) => Promise<SetNftDIDResponse>;
    getNftWalletsWithDIDs: (
        data: GetNftWalletsWithDIDsRequest
    ) => Promise<GetNftWalletsWithDIDsResponse>;
}

export const WalletConnectRpcContext = createContext<WalletConnectRpc>({} as WalletConnectRpc);

export function WalletConnectRpcProvider({ children }: PropsWithChildren) {
    const { client, session, chainId, fingerprint } = useWalletConnect();

    async function request<T>(method: ChiaMethod, data: any): Promise<T> {
        if (!client) throw new Error('WalletConnect is not initialized');
        if (!session) throw new Error('Session is not connected');
        if (!fingerprint) throw new Error('Fingerprint is not loaded.');

        const result = await client!.request<{ data: T } | { error: any }>({
            topic: session!.topic,
            chainId,
            request: {
                method,
                params: { fingerprint, ...data },
            },
        });
        console.log(`${method} result`, data, result);

        if ('error' in result) throw new Error(JSON.stringify(result.error));

        return result.data;
    }

    // Wallet
    async function logIn(data: LogInRequest) {
        return request<LogInResponse>(ChiaMethod.LogIn, data);
    }

    async function getWallets(data: GetWalletsRequest) {
        return request<GetWalletsResponse>(ChiaMethod.GetWallets, data);
    }

    async function pushTx(data: PushTxRequest) {
        return request<PushTxResponse>(ChiaMethod.PushTx, data);
    }

    async function getTransaction(data: GetTransactionRequest) {
        return request<GetTransactionResponse>(
            ChiaMethod.GetTransaction,
            data
        );
    }

    async function getWalletBalance(data: GetWalletBalanceRequest) {
        return request<GetWalletBalanceResponse>(
            ChiaMethod.GetWalletBalance,
            data
        );
    }

    async function getCurrentAddress(data: GetCurrentAddressRequest) {
        return request<GetCurrentAddressResponse>(
            ChiaMethod.GetCurrentAddress,
            data
        );
    }

    async function sendTransaction(data: SendTransactionRequest) {
        return request<SendTransactionResponse>(
            ChiaMethod.SendTransaction,
            data
        );
    }

    async function signMessageById(data: SignMessageByIdRequest) {
        return request<SignMessageByIdResponse>(
            ChiaMethod.SignMessageById,
            data
        );
    }

    async function signMessageByAddress(data: SignMessageByAddressRequest) {
        return request<SignMessageByAddressResponse>(
            ChiaMethod.SignMessageByAddress,
            data
        );
    }

    async function verifySignature(data: VerifySignatureRequest) {
        return request<VerifySignatureResponse>(
            ChiaMethod.VerifySignature,
            data
        );
    }

    async function getNextAddress(data: GetNextAddressRequest) {
        return request<GetNextAddressResponse>(
            ChiaMethod.GetNextAddress,
            data
        );
    }

    async function getSyncStatus(data: GetSyncStatusRequest) {
        return request<GetSyncStatusResponse>(
            ChiaMethod.GetSyncStatus,
            data
        );
    }

    // Offers

    async function getAllOffers(data: GetAllOffersRequest) {
        return request<GetAllOffersResponse>(
            ChiaMethod.GetAllOffers,
            data
        );
    }

    async function getOffersCount(data: GetOffersCountRequest) {
        return request<GetOffersCountResponse>(
            ChiaMethod.GetOffersCount,
            data
        );
    }

    async function createOfferForIds(data: CreateOfferForIdsRequest) {
        return request<CreateOfferForIdsResponse>(
            ChiaMethod.CreateOfferForIds,
            data
        );
    }

    async function cancelOffer(data: CancelOfferRequest) {
        return request<CancelOfferResponse>(ChiaMethod.CancelOffer, data);
    }

    async function checkOfferValidity(data: CheckOfferValidityRequest) {
        return request<CheckOfferValidityResponse>(
            ChiaMethod.CheckOfferValidity,
            data
        );
    }

    async function takeOffer(data: TakeOfferRequest) {
        return request<TakeOfferResponse>(ChiaMethod.TakeOffer, data);
    }

    async function getOfferSummary(data: GetOfferSummaryRequest) {
        return request<GetOfferSummaryResponse>(
            ChiaMethod.GetOfferSummary,
            data
        );
    }

    async function getOfferData(data: GetOfferDataRequest) {
        return request<GetOfferDataResponse>(
            ChiaMethod.GetOfferData,
            data
        );
    }

    async function getOfferRecord(data: GetOfferRecordRequest) {
        return request<GetOfferRecordResponse>(
            ChiaMethod.GetOfferRecord,
            data
        );
    }

    // CATs

    async function getCatWalletInfo(data: GetCatWalletInfoRequest) {
        return request<GetCatWalletInfoResponse>(
            ChiaMethod.GetCatWalletInfo,
            data
        );
    }

    async function getCatAssetId(data: GetCatAssetIdRequest) {
        return request<GetCatAssetIdResponse>(
            ChiaMethod.GetCatAssetId,
            data
        );
    }

    async function spendCat(data: SpendCatRequest) {
        return request<SpendCatResponse>(ChiaMethod.SpendCat, data);
    }

    async function addCatToken(data: AddCatTokenRequest) {
        return request<AddCatTokenResponse>(ChiaMethod.AddCatToken, data);
    }

    // NFTs
    async function getNfts(data: GetNftsRequest) {
        return request<GetNftsResponse>(ChiaMethod.GetNfts, data);
    }

    async function getNftInfo(data: GetNftInfoRequest) {
        return request<GetNftInfoResponse>(ChiaMethod.GetNftInfo, data);
    }

    async function mintBulk(data: MintBulkRequest) {
        return request<MintBulkResponse>(ChiaMethod.MintBulk, data);
    }

    async function mintNft(data: MintNftRequest) {
        return request<MintNftResponse>(ChiaMethod.MintNft, data);
    }

    async function transferNft(data: TransferNftRequest) {
        return request<TransferNftResponse>(ChiaMethod.TransferNft, data);
    }

    async function getNftsCount(data: GetNftsCountRequest) {
        return request<GetNftsCountResponse>(
            ChiaMethod.GetNftsCount,
            data
        );
    }

    // DataLayer
    async function addMirror(data: AddMirrorRequest) {
        return request<AddMirrorResponse>(ChiaMethod.AddMirror, data);
    }
    async function addMissingFiles(data: AddMissingFilesRequest) {
        return request<AddMissingFilesResponse>(ChiaMethod.AddMissingFiles, data);
    }
    async function batchUpdate(data: BatchUpdateRequest) {
        return request<BatchUpdateResponse>(ChiaMethod.BatchUpdate, data);
    }
    async function cancelDataLayerOffer(data: CancelDataLayerOfferRequest) {
        return request<CancelDataLayerOfferResponse>(ChiaMethod.CancelDataLayerOffer, data);
    }
    async function checkPlugins(data: CheckPluginsRequest) {
        return request<CheckPluginsResponse>(ChiaMethod.CheckPlugins, data);
    }
    async function clearPendingRoots(data: ClearPendingRootsRequest) {
        return request<ClearPendingRootsResponse>(ChiaMethod.ClearPendingRoots, data);
    }
    async function createDataStore(data: CreateDataStoreRequest) {
        return request<CreateDataStoreResponse>(ChiaMethod.CreateDataStore, data);
    }
    async function deleteKey(data: DeleteKeyRequest) {
        return request<DeleteKeyResponse>(ChiaMethod.DeleteKey, data);
    }
    async function deleteMirror(data: DeleteMirrorRequest) {
        return request<DeleteMirrorResponse>(ChiaMethod.DeleteMirror, data);
    }
    async function getAncestors(data: GetAncestorsRequest) {
        return request<GetAncestorsResponse>(ChiaMethod.GetAncestors, data);
    }
    async function getKeys(data: GetKeysRequest) {
        return request<GetKeysResponse>(ChiaMethod.GetKeys, data);
    }
    async function getKeysValues(data: GetKeysValuesRequest) {
        return request<GetKeysValuesResponse>(ChiaMethod.GetKeysValues, data);
    }
    async function getKvDiff(data: GetKvDiffRequest) {
        return request<GetKvDiffResponse>(ChiaMethod.GetKvDiff, data);
    }
    async function getLocalRoot(data: GetLocalRootRequest) {
        return request<GetLocalRootResponse>(ChiaMethod.GetLocalRoot, data);
    }
    async function getMirrors(data: GetMirrorsRequest) {
        return request<GetMirrorsResponse>(ChiaMethod.GetMirrors, data);
    }
    async function getOwnedStores(data: GetOwnedStoresRequest) {
        return request<GetOwnedStoresResponse>(ChiaMethod.GetOwnedStores, data);
    }
    async function getRoot(data: GetRootRequest) {
        return request<GetRootResponse>(ChiaMethod.GetRoot, data);
    }
    async function getRoots(data: GetRootsRequest) {
        return request<GetRootsResponse>(ChiaMethod.GetRoots, data);
    }
    async function getRootHistory(data: GetRootHistoryRequest) {
        return request<GetRootHistoryResponse>(ChiaMethod.GetRootHistory, data);
    }
    async function getDataLayerSyncStatus(data: GetDataLayerSyncStatusRequest) {
        return request<GetDataLayerSyncStatusResponse>(ChiaMethod.GetDataLayerSyncStatus, data);
    }
    async function getValue(data: GetValueRequest) {
        return request<GetValueResponse>(ChiaMethod.GetValue, data);
    }
    async function insert(data: InsertRequest) {
        return request<InsertResponse>(ChiaMethod.Insert, data);
    }
    async function makeDataLayerOffer(data: MakeDataLayerOfferRequest) {
        return request<MakeDataLayerOfferResponse>(ChiaMethod.MakeDataLayerOffer, data);
    }
    async function removeSubscriptions(data: RemoveSubscriptionsRequest) {
        return request<RemoveSubscriptionsResponse>(ChiaMethod.RemoveSubscriptions, data);
    }
    async function subscribe(data: SubscribeRequest) {
        return request<SubscribeResponse>(ChiaMethod.Subscribe, data);
    }
    async function subscriptions(data: SubscriptionsRequest) {
        return request<SubscriptionsResponse>(ChiaMethod.Subscriptions, data);
    }
    async function takeDataLayerOffer(data: TakeDataLayerOfferRequest) {
        return request<TakeDataLayerOfferResponse>(ChiaMethod.TakeDataLayerOffer, data);
    }
    async function unsubscribe(data: UnsubscribeRequest) {
        return request<UnsubscribeResponse>(ChiaMethod.Unsubscribe, data);
    }
    async function verifyOffer(data: VerifyOfferRequest) {
        return request<VerifyOfferResponse>(ChiaMethod.VerifyOffer, data);
    }

    // DIDs
    async function createNewDIDWallet(data: CreateNewDIDWalletRequest) {
        return request<CreateNewDIDWalletResponse>(
            ChiaMethod.CreateNewDIDWallet,
            data
        );
    }
    // async function didCreateAttest(data: DIDCreateAttestRequest) {
    //     return request<CreateAttestResponse>(
    //         ChiaMethod.DIDCreateAttest,
    //         data
    //     );
    // }
    // async function didCreateBackupFile(data: DIDCreateBackupFileRequest) {
    //     return request<CreateBackupFileResponse>(
    //         ChiaMethod.DIDCreateBackupFile,
    //         data
    //     );
    // }
    async function findLostDID(data: FindLostDIDRequest) {
        return request<FindLostDIDResponse>(
            ChiaMethod.FindLostDID,
            data
        );
    }
    async function getDIDCurrentCoinInfo(data: GetDIDCurrentCoinInfoRequest) {
        return request<GetDIDCurrentCoinInfoResponse>(
            ChiaMethod.GetDIDCurrentCoinInfo,
            data
        );
    }
    async function getDID(data: GetDIDRequest) {
        return request<GetDIDResponse>(
            ChiaMethod.GetDID,
            data
        );
    }
    async function getDIDInfo(data: GetDIDInfoRequest) {
        return request<GetDIDInfoResponse>(
            ChiaMethod.GetDIDInfo,
            data
        );
    }
    async function getDIDInformationNeededForRecovery(data: GetDIDInformationNeededForRecoveryRequest) {
        return request<GetDIDInformationNeededForRecoveryResponse>(
            ChiaMethod.GetDIDInformationNeededForRecovery,
            data
        );
    }
    async function getDIDMetadata(data: GetDIDMetadataRequest) {
        return request<GetDIDMetadataResponse>(
            ChiaMethod.GetDIDMetadata,
            data
        );
    }
    async function getDIDPubkey(data: GetDIDPubkeyRequest) {
        return request<GetDIDPubkeyResponse>(
            ChiaMethod.GetDIDPubkey,
            data
        );
    }
    async function getDIDRecoveryList(data: GetDIDRecoveryListRequest) {
        return request<GetDIDRecoveryListResponse>(
            ChiaMethod.GetDIDRecoveryList,
            data
        );
    }
    async function getDIDName(data: GetDIDNameRequest) {
        return request<GetDIDNameResponse>(
            ChiaMethod.GetDIDName,
            data
        );
    }
    // async function messageSpend(data: DIDMessageSpendRequest) {
    //     return request<MessageSpendResponse>(
    //         ChiaMethod.MessageSpend,
    //         data
    //     );
    // }
    // async function recoverySpend(data: DIDRecoverySpendRequest) {
    //     return request<RecoverySpendResponse>(
    //         ChiaMethod.RecoverySpend,
    //         data
    //     );
    // }
    async function transferDID(data: TransferDIDRequest) {
        return request<TransferDIDResponse>(
            ChiaMethod.TransferDID,
            data
        );
    }
    async function updateDIDMetadata(data: UpdateDIDMetadataRequest) {
        return request<UpdateDIDMetadataResponse>(
            ChiaMethod.UpdateDIDMetadata,
            data
        );
    }
    async function updateDIDRecoveryIds(data: UpdateDIDRecoveryIdsRequest) {
        return request<UpdateDIDRecoveryIdsResponse>(
            ChiaMethod.UpdateDIDRecoveryIds,
            data
        );
    }

    async function setDIDName(data: SetDIDNameRequest) {
        return request<SetDIDNameResponse>(ChiaMethod.SetDIDName, data);
    }

    async function setNftDID(data: SetNftDIDRequest) {
        return request<SetNftDIDResponse>(ChiaMethod.SetNftDID, data);
    }

    async function getNftWalletsWithDIDs(data: GetNftWalletsWithDIDsRequest) {
        return request<GetNftWalletsWithDIDsResponse>(
            ChiaMethod.GetNftWalletsWithDIDs,
            data
        );
    }

    return (
        <WalletConnectRpcContext.Provider
            value={{
                // Wallet
                logIn,
                getWallets,
                pushTx,
                getTransaction,
                getWalletBalance,
                getCurrentAddress,
                sendTransaction,
                signMessageById,
                signMessageByAddress,
                verifySignature,
                getNextAddress,
                getSyncStatus,

                // Offers
                getAllOffers,
                getOffersCount,
                createOfferForIds,
                cancelOffer,
                checkOfferValidity,
                takeOffer,
                getOfferSummary,
                getOfferData,
                getOfferRecord,

                // CATs
                getCatWalletInfo,
                getCatAssetId,
                spendCat,
                addCatToken,

                // NFTs
                getNfts,
                getNftInfo,
                mintBulk,
                mintNft,
                transferNft,
                getNftsCount,

                // DataLayer
                addMirror,
                addMissingFiles,
                batchUpdate,
                cancelDataLayerOffer,
                checkPlugins,
                clearPendingRoots,
                createDataStore,
                deleteKey,
                deleteMirror,
                getAncestors,
                getKeys,
                getKeysValues,
                getKvDiff,
                getLocalRoot,
                getMirrors,
                getOwnedStores,
                getRoot,
                getRoots,
                getRootHistory,
                getDataLayerSyncStatus,
                getValue,
                insert,
                makeDataLayerOffer,
                removeSubscriptions,
                subscribe,
                subscriptions,
                takeDataLayerOffer,
                unsubscribe,
                verifyOffer,

                // DIDs
                createNewDIDWallet,
                // didCreateAttest,
                // didCreateBackupFile,
                findLostDID,
                getDIDCurrentCoinInfo,
                getDID,
                getDIDInfo,
                getDIDInformationNeededForRecovery,
                getDIDMetadata,
                getDIDPubkey,
                getDIDRecoveryList,
                getDIDName,
                // messageSpend,
                // recoverySpend,
                transferDID,
                updateDIDMetadata,
                updateDIDRecoveryIds,
                setDIDName,
                setNftDID,
                getNftWalletsWithDIDs,
            }}
        >
            {children}
        </WalletConnectRpcContext.Provider>
    );
}

export function useWalletConnectRpc() {
    const context = useContext(WalletConnectRpcContext);

    if (!context)
        throw new Error(
            'Calls to `useWalletConnectRpc` must be used within a `WalletConnectRpcProvider`.'
        );

    return context;
}
