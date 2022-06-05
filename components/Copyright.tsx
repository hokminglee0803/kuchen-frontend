import * as React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
export default function Copyright() {

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return <>
        <div style={{
            marginLeft: isDesktop ? 100 : 30,
            marginTop: 15,
            marginBottom: 20,
            fontSize: isDesktop ? 15 : 8,
        }}>
            Copyright
            {'© '}
            {new Date().getFullYear()}&nbsp;
            Kuchen. All Rights Reserved
        </div>
    </>
}