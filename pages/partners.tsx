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
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface PartnersProps {
    // webSettings: PageSettingProps;
    // projects: ProjectCardProps[];
    // footer: FooterProps;
}

const Partners: React.FC<PartnersProps> = ({ }) => {

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

            <div style={{ marginTop: 80 }} />

            <Box style={{
                height: 400,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 25,
                background: 'url(https://www.kuchen.com.hk/wp-content/uploads/2021/04/pexels-tatiana-syrikova-3968175-scaled.jpg)'
            }}>
                <h1>
                    {t('partners')}
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
                    我們與Miele、Corian、FISHER & PAYKEL、SMEG等30+國際領先家電品牌合作，是香港授權經銷商之一，確保您的廚房不僅大方高雅，並且配置創新科技電器，為您創造奢華、安全的烹飪和用餐體驗。
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
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Box style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Image
                                alt='kuchen'
                                src={'https://www.kuchen.com.hk/wp-content/uploads/2021/04/blanco-.png'}
                                width={410}
                                height={123} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>



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
        console.log(`[Partnets Page] getStaticProps failed.`);

        throw e;
    }
};

export default Partners;
