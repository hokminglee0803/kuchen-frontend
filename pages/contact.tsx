import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { FooterProps } from '../interface/Footer';
import { PageSettingProps } from '../interface/PageSetting';
import { ProjectCardProps } from '../interface/ProjectCard';
import contentfulService from '../utils/service/contentfulService';
import { transformWebSettings, transformProjectCard, translateFooter, transformImage } from '../utils/transformer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ImageProps } from '../interface/Image';
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface ContactProps {
    title: string;
    webSettings: PageSettingProps;
    coverImage: ImageProps
    footer: FooterProps;
}

const Contact: React.FC<ContactProps> = ({ title, webSettings, coverImage, footer }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        if (init) {
            setInit(false)
        }
    }, [init])



    return (
        <div>
            <Head>
                <title>{webSettings?.seoTitle}</title>
                <meta name="description" content={webSettings?.seoDescription} />
                <meta name="keywords" content={webSettings?.seoKeywords} />
                <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
                <link
                    rel="alternate"
                    href={`${HOME_PATH}`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}/en`}
                    hrefLang="en-hk"
                />
                <link
                    rel="canonical"
                    href={`${HOME_PATH}${localePath}`}
                />
                <meta name="buildVersion" content={'1.0.1'} />
                <meta property="og:locale" content="zh_hk" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={webSettings?.openGraphTitle} />
                <meta property="og:description" content={webSettings?.openGraphDescription} />
                <meta property="og:url" content={`${HOME_PATH}${localePath}`} />
                <meta property="og:site_name" content="kuchen"></meta>
                <meta property="og:image" content={webSettings?.openGraphImage} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <ResponsiveAppBar />

            <div style={{ marginTop: 80 }} />

            <Box style={{
                height: 400,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 20,
                background: 'url(https://images.ctfassets.net/1hz59jvvggjc/7LRZsfEVcYVM7lrwZyDS75/27b73c0889187f837b4971f4c0e72839/Background.jpeg)'
            }}>
                <h1>
                    {title}
                </h1>
            </Box>


            <Grid container sx={{
                alignItems: 'center',
            }}>
                <Grid item xs={12} sm={6}>
                    <Grid container style={{
                        display: 'flex',
                        margin: 'auto',
                        width: '80%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <Grid item xs={12}>
                            <Box>
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {t('address')}
                                </Typography>
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {footer.address}
                                </Typography>
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {t('office_hour')}
                                </Typography>
                                {
                                    footer.officeHour?.map((item, index) => {
                                        return <Typography key={index} style={{ margin: 20, fontSize: 20 }}>
                                            {item}
                                        </Typography>
                                    })
                                }
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {t('whatsapp')}
                                    <a
                                        style={{
                                            color: "orange",
                                            cursor: 'pointer'
                                        }}
                                        rel="noreferrer"
                                        target="_blank"
                                        href={`https://api.whatsapp.com/send?phone=${footer.whatsapp}&text=${footer.whatsappWelcomeMessage}`}
                                    >
                                        {footer.whatsapp}
                                    </a>
                                </Typography>
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {t('phone')}
                                    <a
                                        style={{
                                            color: "orange",
                                            cursor: 'pointer'
                                        }}
                                        href={`tel:${footer.phone}`}>
                                        {footer.phone}
                                    </a>
                                </Typography>
                                <Typography style={{ margin: 20, fontSize: 20 }}>
                                    {t('email')}
                                    <a
                                        style={{
                                            color: "orange",
                                            cursor: 'pointer'
                                        }}
                                        href={`mailto:${footer.email}`}>
                                        {footer.email}
                                    </a>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={6}
                    style={{
                        width: '85%',
                        margin: 'auto'
                    }}
                >
                    <Image
                        alt={coverImage.alt}
                        src={`${coverImage.url}`}
                        width={coverImage.width}
                        height={coverImage.height} />
                </Grid>
            </Grid>



            <Grid container sx={{
                background: 'orange',
                color: 'white',
                paddingLeft: '2%',
                alignItems: 'center',
                paddingTop: '2%',
                paddingBottom: '2%',
            }}>
                <Grid item xs={12} md={10}>
                    <Typography style={{
                        fontSize: 35,
                    }}>
                        <b>
                            ARE YOU LOOKING FOR A CONSULTATION ?
                        </b>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        onClick={() => {
                            router.push('/checkout')
                        }}
                        sx={{
                            background: 'grey',
                            color: 'white',
                            padding: '5%',
                            paddingLeft: '10%',
                            paddingRight: '10%',
                        }}>
                        $300/Session
                    </Button>
                </Grid>
            </Grid>


            <Footer
                address={footer.address}
                officeHour={footer.officeHour}
                phone={footer.phone}
                whatsapp={footer.whatsapp}
                whatsappWelcomeMessage={footer.whatsappWelcomeMessage}
                email={footer.email}
                googleMapLink={footer.googleMapLink} />

            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    const contactUsPage = await contentfulService.getEntriesById('4qMWBRIfk54yFIKd9p9pzU', locale);

    const { name, seoSetting, coverImage, footer } = contactUsPage?.[0]?.fields;
    try {
        return {
            props: {
                lngDict,
                title: name,
                webSettings: transformWebSettings(seoSetting),
                coverImage: transformImage(coverImage),
                footer: translateFooter(footer)
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Contact Page] getStaticProps failed.`);

        throw e;
    }
};

export default Contact;
