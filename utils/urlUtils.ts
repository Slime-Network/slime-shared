export function getEmbedUrl(url: string): string {
	if (url.startsWith('https://www.youtube.com/watch?v=')) {
		return `https://www.youtube.com/embed/${url.slice(32)}`;
	}
	return url;
}
