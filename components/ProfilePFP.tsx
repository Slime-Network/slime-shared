import { Box } from "@mui/material";

interface ProfilePFPProps {
    imgSrc?: string;
    size?: number;
}

export const ProfilePFP = (props: ProfilePFPProps) => {
    const { imgSrc, size } = props;
    const defaultSVG = (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg">

            <defs
                id="defs2" />
            <g>
                <path style={{ fill: '#353535', fillOpacity: 0.711_679, stroke: '#4caf50', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1, paintOrder: 'fill markers stroke' }}
                    id="path1249"
                    d="M 43.425282,18.245138 A 20.316151,21.05842 0 0 1 29.528671,44.258584 20.316151,21.05842 0 0 1 4.389496,29.934382 20.316151,21.05842 0 0 1 18.131355,3.8327591 20.316151,21.05842 0 0 1 43.355122,17.996285 Z"
                />
                <path
                    style={{ fill: '#4caf50', fillOpacity: 1, stroke: '#4caf50', strokeWidth: 2.1, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1, paintOrder: 'fill markers stroke' }}
                    id="path1249-4"
                    d="m 30.810097,16.188451 a 7.2654901,7.8783493 0 0 1 -4.103081,10.145974 7.2654901,7.8783493 0 0 1 -9.402418,-4.334413 7.2654901,7.8783493 0 0 1 3.890886,-10.243793 7.2654901,7.8783493 0 0 1 9.490228,4.10323"
                />
                <path
                    style={{ fill: '#4caf50', fillOpacity: 1, stroke: '#4caf50', strokeWidth: 3.2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1, paintOrder: 'fill markers stroke' }}
                    id="path1459"
                    d="m 13.509705,40.733561 a 11.002679,13.549669 0 0 1 10.424936,-9.417023 11.002679,13.549669 0 0 1 10.498853,9.29165"
                />
                <path
                    style={{ fill: '#4caf50', fillOpacity: 1, stroke: '#4caf50', strokeWidth: 3.2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 4, strokeDasharray: 'none', strokeOpacity: 1, paintOrder: 'fill markers stroke' }}
                    id="path5623"
                    d="m -40.26732,-40.507121 a 10.44514,3.9840002 0 0 1 9.896673,-2.768881 10.44514,3.9840002 0 0 1 9.966845,2.732017"
                    transform="matrix(-0.99989692,-0.01435785,0.16484488,-0.9863195,0,0)" />
            </g>
        </svg>
    );

    return (
        <Box sx={{ width: size, height: size, m: 2, alignContent: "center", textAlign: "center" }}>
            {imgSrc ? <img src={imgSrc} alt="Profile" style={{ width: "100%", height: "100%" }} /> : defaultSVG}
        </Box>
    );
};