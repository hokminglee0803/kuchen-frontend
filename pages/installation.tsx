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
    // webSettings: PageSettingProps;
    // projects: ProjectCardProps[];
    // footer: FooterProps;
}

const Installation: React.FC<InstallationProps> = ({ }) => {

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
                {/* <title>{webSettings?.seoTitle}</title>
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
                <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
            </Head>

            <ResponsiveAppBar />

            <div style={{ marginTop: 120 }} />

            <Box style={{
                height: 250,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 25,
            }}>
                <h1>
                    {t('installation')}
                </h1>
            </Box>

            <Grid container style={{ width: '75%', margin: "auto" }}>
                <Grid item xs={12} md={6}>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            width={'100%'}
                            height={'100%'}
                            url={`https://www.youtube.com/watch?v=ZXQt1ITou4E&ab_channel=OppeinHomeOfficial`} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            width={'100%'}
                            height={'100%'}
                            url={`https://www.youtube.com/watch?v=ZXQt1ITou4E&ab_channel=OppeinHomeOfficial`} />
                    </div>
                </Grid>
            </Grid>

            {/* <Footer
                address={footer.address}
                officeHour={footer.officeHour}
                phone={footer.phone}
                whatsapp={footer.whatsapp}
                whatsappWelcomeMessage={footer.whatsappWelcomeMessage}
                email={footer.email}
                googleMapLink={footer.googleMapLink} /> */}

            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    // const homePage = await contentfulService.getEntriesById('AGUYX5I3RP6SBWWe7Rtzt', locale);

    // const { seoSetting, carousel, portfolio, footer } = homePage?.[0]?.fields;

    // const projects: ProjectCardProps[] = [];

    // portfolio?.map(item => {
    //     projects.push(transformProjectCard(item))
    // });

    try {
        return {
            props: {
                lngDict,
                // webSettings: transformWebSettings(seoSetting),
                // projects: projects,
                // footer: translateFooter(footer)
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Installation Page] getStaticProps failed.`);

        throw e;
    }
};

export default Installation;
