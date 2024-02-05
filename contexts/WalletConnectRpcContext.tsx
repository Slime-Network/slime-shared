import { createContext, PropsWithChildren, useContext } from 'react';

import { ChiaMethod } from '../constants/wallet-connect';
import {
    AddCatTokenRequest,
    AddCatTokenResponse,
} from '../types/walletconnect/rpc/AddCatToken';
import {
    CancelOfferRequest,
    CancelOfferResponse,
} from '../types/walletconnect/rpc/CancelOffer';
import {
    CheckOfferValidityRequest,
    CheckOfferValidityResponse,
} from '../types/walletconnect/rpc/CheckOfferValidity';
import { CreateNewDIDWalletRequest, CreateNewDIDWalletResponse } from '../types/walletconnect/rpc/CreateNewDIDWallet';
import {
    CreateOfferForIdsRequest,
    CreateOfferForIdsResponse,
} from '../types/walletconnect/rpc/CreateOfferForIds';
import { FindLostDIDRequest, FindLostDIDResponse } from '../types/walletconnect/rpc/FindLostDID';
import {
    GetAllOffersRequest,
    GetAllOffersResponse,
} from '../types/walletconnect/rpc/GetAllOffers';
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
import {
    GetNextAddressRequest,
    GetNextAddressResponse,
} from '../types/walletconnect/rpc/GetNextAddress';
import {
    GetNftInfoRequest,
    GetNftInfoResponse,
} from '../types/walletconnect/rpc/GetNftInfo';
import {
    GetNftWalletsWithDIDsRequest,
    GetNftWalletsWithDIDsResponse,
} from '../types/walletconnect/rpc/GetNftWalletsWithDIDs';
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
import {
    GetSyncStatusRequest,
    GetSyncStatusResponse,
} from '../types/walletconnect/rpc/GetSyncStatus';
import {
    GetTransactionRequest,
    GetTransactionResponse,
} from '../types/walletconnect/rpc/GetTransaction';
import {
    GetWalletBalanceRequest,
    GetWalletBalanceResponse,
} from '../types/walletconnect/rpc/GetWalletBalance';
import { GetWalletsRequest, GetWalletsResponse } from '../types/walletconnect/rpc/GetWallets';
import { LogInRequest, LogInResponse } from '../types/walletconnect/rpc/LogIn';
import {
    MintNftRequest,
    MintNftResponse,
} from '../types/walletconnect/rpc/MintNft';
import {
    SendTransactionRequest,
    SendTransactionResponse,
} from '../types/walletconnect/rpc/SendTransaction';
import { SetDIDNameRequest, SetDIDNameResponse } from '../types/walletconnect/rpc/SetDIDName';
import { SetNftDIDRequest, SetNftDIDResponse } from '../types/walletconnect/rpc/SetNftDID';
import {
    SignMessageByAddressRequest,
    SignMessageByAddressResponse,
} from '../types/walletconnect/rpc/SignMessageByAddress';
import {
    SignMessageByIdRequest,
    SignMessageByIdResponse,
} from '../types/walletconnect/rpc/SignMessageById';
import { SpendCatRequest, SpendCatResponse } from '../types/walletconnect/rpc/SpendCat';
import { TakeOfferRequest, TakeOfferResponse } from '../types/walletconnect/rpc/TakeOffer';
import { TransferDIDRequest, TransferDIDResponse } from '../types/walletconnect/rpc/TransferDID';
import {
    TransferNftRequest,
    TransferNftResponse,
} from '../types/walletconnect/rpc/TransferNft';
import { UpdateDIDMetadataRequest, UpdateDIDMetadataResponse } from '../types/walletconnect/rpc/UpdateDIDMetadata';
import { UpdateDIDRecoveryIdsRequest, UpdateDIDRecoveryIdsResponse } from '../types/walletconnect/rpc/UpdateDIDRecoveryIds';
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
    mintNft: (data: MintNftRequest) => Promise<MintNftResponse>;
    transferNft: (data: TransferNftRequest) => Promise<TransferNftResponse>;
    getNftsCount: (data: GetNftsCountRequest) => Promise<GetNftsCountResponse>;

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
                mintNft,
                transferNft,
                getNftsCount,

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
