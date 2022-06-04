import { useScrollTrigger, Box, Fab, Zoom } from '@mui/material';
import * as React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const scrollUp = () => {
    window.scrollTo(0, 0);
}

function ScrollTop(props: any) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        scrollUp();
    };

    return (
        <Zoom in={trigger} style={{
            zIndex: 399
        }}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 25, right: 25 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default function BackToTop(props: any) {
    return <>
        <ScrollTop {...props}>
            <Fab size="large" style={{
                zIndex: 600,
            }}>
                <KeyboardArrowUpIcon fontSize='large' />
            </Fab>
        </ScrollTop>
    </>
}