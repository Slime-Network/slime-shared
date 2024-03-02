import { Grid, Typography, Stack, Modal, Box } from "@mui/material";
import React from "react";

import { ProfileMetadata } from "../types/gosti/Profile";


interface ProfileViewModalProps {
    profile: ProfileMetadata | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const profileModalStyle = {
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

export const ProfileViewModal = (
    props: ProfileViewModalProps,
) => {
    const { profile, open, setOpen } = props;

    return (
        <Modal open={open} onClose={() => { setOpen(false); }}>
            <Box sx={profileModalStyle}>
                {profile ?
                    <Stack justifyContent="flex-start" direction="row" spacing={2} sx={{ p: 2 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <img src={profile?.gostiAvatar} alt="avatar" style={{ height: "50px", width: "50px" }} />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6">{profile?.gostiDisplayName}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                    :
                    <Stack>
                        <Typography variant="h6">Profile not found...</Typography>
                    </Stack>
                }
            </Box>
        </Modal>
    );
};
