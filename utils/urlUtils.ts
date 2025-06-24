export function getEmbedUrl(url: string): string {
	if (url && 'youtube'.includes(url)) {
		const videoId = url.split('v=')[1];
		return `https://www.youtube.com/embed/${videoId}`;
	}
	return url;
}
