export const validateXCHAddress = (address: string | undefined): boolean => {
	if (address?.startsWith('xch')) {
		if (address.length === 62) {
			return true;
		}
	} else if (address?.startsWith('txch')) {
		if (address.length === 63) {
			return true;
		}
	}
	return false;
};
