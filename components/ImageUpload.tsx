import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import { useMarketplaceApi } from '../contexts/MarketplaceApiContext';
import { Marketplace, UploadFileRequest } from '../types/gosti/MarketplaceApiTypes';


interface ImageUploadProps {
    marketplaces: Marketplace[];
    title: string;
    setGui: (uri: string) => void;
    initialImage?: string;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const { marketplaces, title, setGui, initialImage } = props;

    const [image, setImage] = React.useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
        }
    };

    const { uploadFile } = useMarketplaceApi();

    return (
        <Grid container p={4} spacing={4} id="Image Upload">
            <Grid key={`imageUploadInput`} item xs={4}>
                <Typography sx={{ p: 2 }} variant="h5">{title}</Typography>
                <Button component="label" variant="contained" style={{ width: "100%" }} startIcon={<ImageIcon />}>
                    Select Image
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                </Button>
                <Button component="label" variant="contained" style={{ marginTop: "5px", width: "100%" }} disabled={image == null} startIcon={<CloudUploadIcon />} onClick={
                    async () => {
                        if (image) {
                            marketplaces.forEach(async (marketplace) => {
                                const res = await uploadFile({ file: image, url: marketplace.url } as UploadFileRequest);
                                if (res.id) {
                                    setGui(`${marketplace.url}/public/${res.id}`);
                                } else {
                                    alert(`Unknown Error during upload to ${marketplace.url}\n${res.message}`);
                                }
                            });
                            if (marketplaces.length === 0) {
                                alert("No Marketplaces Available");
                            }
                        }
                    }
                }>
                    Upload
                </Button>
            </Grid>
            <Grid key={`imageUploadPreview`} item xs={8}>
                {!image && initialImage && <img src={initialImage} style={{ maxWidth: "-webkit-fill-available" }} alt="preview" />}
                {image && <img src={URL.createObjectURL(image)} style={{ maxWidth: "-webkit-fill-available" }} alt="preview" />}
            </Grid>
        </Grid>
    );
};

export default ImageUpload;
