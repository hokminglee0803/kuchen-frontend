import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import { transformWebSettings, transformProjectCard, translateFooter } from '../utils/transformer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPlayer from 'react-player/lazy'


const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface InstallationProps {
    title: string;
    webSettings: PageSettingProps;
    youtubeLink: string[];
}

const Installation: React.FC<InstallationProps> = ({ title, webSettings, youtubeLink }) => {

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

            <div style={{ marginTop: 120 }} />
            
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12} style={{
                    margin: '5%'
                }}>
                    <h2 style={{
                        width: '100%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        // fontSize: '5vw',
                        marginTop: '30px',
                    }}>
                        {title}
                    </h2>
                    <div style={{
                        width: '20%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: '1.5px solid black'
                    }} />
                </Grid>
            </Grid>

            <Grid container style={{ width: '75%', margin: "auto" }}>
                {
                    youtubeLink.map((item, index) => {
                        return <Grid key={index} item xs={12} md={6}>
                            <div className='player-wrapper'>
                                <ReactPlayer
                                    className='react-player'
                                    width={'100%'}
                                    height={'100%'}
                                    url={`${item}`} />
                            </div>
                        </Grid>
                    })
                }

            </Grid>

            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    const installationPage = await contentfulService.getEntriesById('6RMnoN95qCPNJQYmoiHnKy', locale);

    const { seoSetting, name, youtubeLink } = installationPage?.[0]?.fields;

    try {
        return {
            props: {
                lngDict,
                webSettings: transformWebSettings(seoSetting),
                title: name,
                youtubeLink: youtubeLink,
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Installation Page] getStaticProps failed.`);

        throw e;
    }
};

export default Installation;
