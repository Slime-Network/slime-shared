import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { GostiRpcCallback } from "../contexts/GostiRpcContext";
import { SaveConfigRequest, GostiConfig } from "../types/gosti/GostiRpcTypes";
import { Marketplace } from "../types/gosti/types";


export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AddMarketplaceModal = (
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    config: GostiConfig | undefined,
    saveConfig: GostiRpcCallback,
) => {
    const [marketplaceName, setMarketplaceName] = useState<string>("");
    const [marketplaceUrl, setMarketplaceUrl] = useState<string>("");

    return (
        <Modal
            open={open}
            onClose={() => { setOpen(false); }}
        >
            <Paper elevation={1} sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Add Marketplace</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="marketplaceName"
                            label="Marketplace Name"
                            variant="outlined"
                            value={marketplaceName}
                            onChange={(event) => {
                                setMarketplaceName(event.target.value);
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="marketplaceUrl"
                            label="Marketplace URL"
                            variant="outlined"
                            value={marketplaceUrl}
                            onChange={(event) => {
                                setMarketplaceUrl(event.target.value);
                            }
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={() => {
                            setOpen(false);
                        }
                        }>Cancel</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" disabled={marketplaceName === "" || marketplaceUrl === "" || marketplaceUrl.startsWith("http") === false}
                            onClick={() => {
                                const configCopy = config || {} as GostiConfig;
                                const newMarketplace: Marketplace = {
                                    displayName: marketplaceName,
                                    url: marketplaceUrl
                                };
                                if (configCopy.marketplaces === undefined) {
                                    configCopy.marketplaces = [];
                                }
                                configCopy.marketplaces.push(newMarketplace);
                                saveConfig({ config: configCopy } as SaveConfigRequest);
                                setOpen(false);
                            }}>Add Marketplace</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};