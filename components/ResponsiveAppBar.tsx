import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Image from 'next/image'
import ShareIcon from '@mui/icons-material/Share';
import { useI18n } from 'next-localization';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/LanguageRounded';
import { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography } from '@mui/material';
import Slide from '@mui/material/Slide';

const ResponsiveAppBar = () => {
    const router = useRouter();
    const [langShow, setLangShow] = useState(false);
    const [shareShow, setShareShow] = useState(false);

    const { t } = useI18n();

    return (
        <AppBar
            position="fixed" style={{ backgroundColor: 'white', height: 80, zIndex: 999 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{ margin: 10 }}>
                    <Button
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/')
                        }}
                        sx={{
                            display: {
                                marginLeft: 3,
                                xs: 'none',
                                md: 'flex',

                            },
                            '&:hover': {
                                background: 'none',
                            },
                        }}
                    >
                        <Image alt={'kuchen'} src={'https://images.ctfassets.net/1hz59jvvggjc/5463W1WhzJ1fR4KqEyd1Gc/4e4c4b884cda590158f6d75f3e2a147f/logo.png'} width={148} height={35} />
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/about-us')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('about_us')}
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/project')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('projects')}
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/partners')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('partners')}
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/blog')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('blog')}
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/installation')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('installation')}
                    </Button>
                    <Button
                        className='un'
                        disableElevation
                        disableRipple
                        onClick={() => {
                            router.push('/contact')
                        }}
                        sx={{
                            marginLeft: 3,
                            color: 'black',
                            display: 'block',
                            '&:hover': {
                                background: 'none',
                                color: 'orange',
                            },
                        }}
                    >
                        {t('contact_us')}
                    </Button>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton
                        sx={{
                            display: !shareShow ? 'flex' : 'none'
                        }}
                        onClick={() => {
                            setShareShow(true);
                        }}>
                        <ShareIcon
                            style={{ color: 'black' }}
                            fontSize='large' />
                    </IconButton>
                    <Slide direction="down" in={shareShow} mountOnEnter unmountOnExit>
                        <Box>
                            <IconButton onClick={() => {
                                window.open('https://www.facebook.com/Kuchen-HK-182553249070459');
                            }}>
                                <FacebookIcon
                                    style={{ color: 'black' }}
                                    fontSize='medium' />
                            </IconButton>
                            <IconButton onClick={() => {
                                window.open('https://www.instagram.com/kuchenhk/');
                            }}>
                                <InstagramIcon
                                    style={{ color: 'black' }}
                                    fontSize='medium' />
                            </IconButton>
                        </Box>
                    </Slide>

                    <IconButton
                        sx={{
                            display: !langShow ? 'flex' : 'none'
                        }}
                        onClick={() => {
                            setLangShow(true);
                        }}>
                        <LanguageIcon
                            style={{ color: 'black' }}
                            fontSize='large' />
                    </IconButton>
                    <Slide direction="down" in={langShow} mountOnEnter unmountOnExit>
                        <Box>
                            <IconButton onClick={() => {
                                router.push(router.asPath, undefined, { locale: 'zh' })
                            }}>
                                <Typography>
                                    <b style={{ color: 'black' }}>
                                        中
                                    </b>
                                </Typography>
                            </IconButton>
                            <IconButton onClick={() => {
                                router.push(router.asPath, undefined, { locale: 'en' })

                            }}>
                                <Typography>
                                    <b style={{ color: 'black' }}>
                                        EN
                                    </b>
                                </Typography>
                            </IconButton>
                        </Box>
                    </Slide>

                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default ResponsiveAppBar;
