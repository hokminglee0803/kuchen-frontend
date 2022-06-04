import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import contentfulService from '../utils/service/contentfulService';
import { transformWebSettings, transformRichText, transformImage } from '../utils/transformer';
import Image from 'next/image'
import { PageSettingProps } from '../interface/PageSetting';
import { ImageProps } from '../interface/Image';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface PartnersProps {
    title: string;
    webSettings: PageSettingProps;
    description: string;
    album: ImageProps[];

}

const Partners: React.FC<PartnersProps> = ({ title, webSettings, description, album }) => {

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
                fontSize: 25,
                background: 'url(https://images.ctfassets.net/1hz59jvvggjc/7LRZsfEVcYVM7lrwZyDS75/27b73c0889187f837b4971f4c0e72839/Background.jpeg)'
            }}>
                <h1>
                    {title}
                </h1>
            </Box>

            <Box style={{
                display: 'flex',
                margin: 'auto',
                width: '85%',
                marginTop: '5%',
                marginBottom: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 25,
            }}>
                <Typography style={{
                    lineHeight: 2,
                }}>
                    <div
                        dangerouslySetInnerHTML={{ __html: description }} />
                </Typography>
            </Box>

            <Box style={{
                background: 'white',
                color: 'white',
            }}>
                <Grid container style={{
                    margin: 'auto',
                    width: '98%'
                }}>

                    {
                        album.map((item, index) => {
                            return <Grid key={index} item xs={12} md={2}>
                                <Box style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                                    sx={{
                                        width: isDesktop ? '90%' : '60%',
                                        margin: 'auto'
                                    }}
                                >
                                    <Image
                                        alt={item.alt}
                                        src={item.url}
                                        width={item.width}
                                        height={item.height} />
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>

            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    const partnerPage = await contentfulService.getEntriesById('bS8yPXupovv7RblINu8kj', locale);

    const { name, seoSetting, content, album } = partnerPage?.[0]?.fields;

    try {
        return {
            props: {
                lngDict,
                webSettings: transformWebSettings(seoSetting),
                title: name,
                description: transformRichText(content),
                album: album.map(item => transformImage(item))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Partnets Page] getStaticProps failed.`);

        throw e;
    }
};

export default Partners;
