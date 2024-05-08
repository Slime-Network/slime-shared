import { InputAdornment, TextField } from '@mui/material';

interface XchDisplayProps {
	xch?: number;
	mojo?: number;
	label: string;
}

export const XchDisplay = (props: XchDisplayProps) => {
	const { xch, label } = props;
	let { mojo } = props;

	if (!mojo) {
		mojo = 0;
	}

	return (
		<TextField
			disabled
			id="outlined-basic"
			label={label}
			variant="outlined"
			value={xch || mojo / 1_000_000_000_000}
			InputProps={{
				endAdornment: <InputAdornment position="end">XCH</InputAdornment>,
			}}
		/>
	);
};
