import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SessionTypes } from "@walletconnect/types";
import { useState } from "react";


export default function WalletConnectMenu(
    session: SessionTypes.Struct | undefined,
    connectToWallet: () => void,
    disconnectFromWallet: () => void,
) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isWalletMenuOpen = Boolean(anchorEl);

    const openWalletMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeWalletMenu = () => {
        setAnchorEl(null);
    };

    const purgeWcConnections = () => {
        disconnectFromWallet();
        localStorage.clear();
        sessionStorage.clear();
        setAnchorEl(null);
    };

    const handleConnectToWallet = () => {
        connectToWallet();
        setAnchorEl(null);
    };

    const handleDisconnectFromWallet = () => {
        disconnectFromWallet();
        setAnchorEl(null);
    };

    const walletMenuId = 'primary-search-account-wallet-mobile';
    const renderWalletMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={walletMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isWalletMenuOpen}
            onClose={closeWalletMenu}
        >
            <MenuItem disabled={true}>Wallet</MenuItem>
            <Divider />
            {session
                ? <div>
                    <MenuItem
                        onClick={handleDisconnectFromWallet}
                    >
                        <ListItemIcon>
                            <LinkOffIcon fontSize="small" />
                        </ListItemIcon>
                        Disconnect
                    </MenuItem>
                </div>
                : <div>
                    <MenuItem
                        onClick={handleConnectToWallet}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletIcon fontSize="small" />
                        </ListItemIcon>
                        Connect to Chia Wallet
                    </MenuItem>
                    <MenuItem
                        onClick={purgeWcConnections}
                    >
                        <ListItemIcon>
                            <AccountBalanceWalletIcon fontSize="small" />
                        </ListItemIcon>
                        Purge Connections
                    </MenuItem>
                </div>

            }
        </Menu>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                aria-label=""
                aria-haspopup="true"
                color="inherit"
                onClick={openWalletMenu}
            >
                {session
                    ? <Badge variant="dot" overlap="circular" color="success" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                        <AccountBalanceWalletIcon />
                    </Badge>
                    : <Badge variant="dot" overlap="circular" color="warning" anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                        <AccountBalanceWalletIcon />
                    </Badge>
                }
            </IconButton>
            {renderWalletMenu}
        </div>
    );
}