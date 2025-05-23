import { CardActionArea, Typography, CardMedia, CardContent, Card } from '@mui/material';
import * as React from 'react';

import { useSlimeApi } from '../contexts/SlimeApiContext';
import { Media } from '../types/slime/Media';
import StorePage, { StorePageProps } from './StorePage';

export type GameCardProps = {
	media: Media;
};

export default function GameCard(props: GameCardProps) {
	const { media } = props;

	const { slimeConfig } = useSlimeApi();

	const [open, setOpen] = React.useState(false);
	const [capsule, setCapsule] = React.useState<string | undefined>(undefined);
	const [title, setTitle] = React.useState<string | undefined>(undefined);
	const [shortDescription, setShortDescription] = React.useState<string | undefined>(undefined);

	React.useEffect(() => {
		let foundCapsule = false;
		let foundTitle = false;
		let foundShortDescription = false;
		slimeConfig?.languages?.forEach((language) => {
			if (!foundCapsule) {
				media.images.forEach((image) => {
					if (image.type === 'capsule' && image.language.english === language.english && !foundCapsule) {
						foundCapsule = true;
						setCapsule(image.url);
					}
				});
			}
			if (!foundTitle) {
				media.titles.forEach((titleI) => {
					if (titleI.language.english === language.english && !foundTitle) {
						foundTitle = true;
						setTitle(titleI.title);
					}
				});
			}
			if (!foundShortDescription) {
				media.descriptions.forEach((descriptionI) => {
					if (
						descriptionI.language.english === language.english &&
						descriptionI.type === 'short' &&
						!foundShortDescription
					) {
						foundShortDescription = true;
						setShortDescription(descriptionI.description);
					}
				});
			}
		});

		if (!foundCapsule && media.images.length > 0 && media.images[0]) {
			setCapsule(media.images[0].url);
		}
		if (!foundTitle && media.titles.length > 0) {
			setTitle(media.titles[0].title);
		}
		if (!foundShortDescription && media.descriptions.length > 0) {
			setShortDescription(media.descriptions[0].description);
		}
	}, [media, slimeConfig]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<Card sx={{ maxWidth: 345 }} onClick={handleClickOpen}>
				<CardActionArea>
					<CardMedia component="img" height="140" image={capsule} alt={title} />
					<CardContent>
						<Typography gutterBottom variant="h5">
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{shortDescription}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			{StorePage({ media, open, setOpen } as StorePageProps)}
		</div>
	);
}
