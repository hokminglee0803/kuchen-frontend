import { Box, Grid, Paper, Skeleton, styled, Typography } from '@mui/material';
import { useI18n } from 'next-localization';
import * as React from 'react';

interface FooterProps {
    address: string;
    officeHour: string[];
    phone: string;
    whatsapp: string;
    whatsappWelcomeMessage: string;
    email: string;
    googleMapLink: string;
}

export default function Footer({ address, officeHour, phone, whatsapp, whatsappWelcomeMessage, email, googleMapLink }: FooterProps) {

    const { t } = useI18n();

    return <>
        <footer style={{ paddingLeft: 70, paddingTop: 80, paddingBottom: 150, color: 'white', background: 'black' }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {t('address')}
                        </Typography>
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {address}
                        </Typography>
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {t('office_hour')}
                        </Typography>
                        {
                            officeHour?.map((item, index) => {
                                return <Typography key={index} style={{ margin: 8, fontSize: 15 }}>
                                    {item}
                                </Typography>
                            })
                        }
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {t('whatsapp')}
                            <a
                                style={{
                                    color: "orange",
                                    cursor: 'pointer'
                                }}
                                rel="noreferrer"
                                target="_blank"
                                href={`https://api.whatsapp.com/send?phone=${whatsapp}&text=${whatsappWelcomeMessage}`}
                            >
                                {whatsapp}
                            </a>
                        </Typography>
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {t('phone')}
                            <a
                                style={{
                                    color: "orange",
                                    cursor: 'pointer'
                                }}
                                href={`tel:${phone}`}>
                                {phone}
                            </a>
                        </Typography>
                        <Typography style={{ margin: 8, fontSize: 15 }}>
                            {t('email')}
                            <a
                                style={{
                                    color: "orange",
                                    cursor: 'pointer'
                                }}
                                href={`mailto:${email}`}>
                                {email}
                            </a>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <iframe
                        width="80%"
                        height="120%"
                        id="gmap_canvas"
                        src={googleMapLink} scrolling="no" ></iframe>
                </Grid>
            </Grid>
        </footer>
    </>
}