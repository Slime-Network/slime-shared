import { Grid, Typography, Paper, Stack, Button } from "@mui/material";
import { NostrEvent } from "nostr-tools";
import React from "react";

import { ProfileMetadata } from "../types/gosti/Profile";
import { ProfileViewModal } from "./ProfileViewModal";


interface GostiCommentProps {
    event: NostrEvent;
    profiles: Map<string, ProfileMetadata>;
};


export const GostiComment = (
    props: GostiCommentProps,
) => {
    const { event, profiles } = props;

    const [openProfileView, setOpenProfileView] = React.useState(false);

    const idTag = event.tags.find((tag) => {
        if (tag[0] === "i" && tag[1].startsWith("chia:")) {
            return profiles.has(tag[1].slice(5, tag[1].length));
        }
        return false;
    });
    if (!idTag) return <></>;

    const profile = profiles.get(idTag[1].slice(5, idTag[1].length));

    return (
        <Paper elevation={1} sx={{ m: 2 }}>
            <Stack justifyContent="flex-start" direction="row">
                <Grid container>
                    <Grid item xs={12}>
                        <img src={profile?.gostiAvatar} alt="avatar" style={{ height: "50px", width: "50px" }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Button size="small" sx={{ textTransform: "unset" }} onClick={() => {
                            setOpenProfileView(true);
                        }}><Typography variant="h6">{profile?.gostiDisplayName}</Typography></Button>
                        <ProfileViewModal open={openProfileView} setOpen={setOpenProfileView} profile={profile} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">{event.content}</Typography>
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
};
