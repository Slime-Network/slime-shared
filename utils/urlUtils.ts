export function getEmbedUrl(url: string): string {
	if (url.includes('youtube')) {
		const videoId = url.split('v=')[1];
		return `https://www.youtube.com/embed/${videoId}`;
	}
	return url;
}
