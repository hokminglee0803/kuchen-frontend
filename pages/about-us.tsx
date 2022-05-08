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


const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface AboutUsProps {
    // webSettings: PageSettingProps;
    // projects: ProjectCardProps[];
    // footer: FooterProps;
}

const AboutUs: React.FC<AboutUsProps> = ({ }) => {

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
                    {t('about_us')}
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
                    Kuchen 成立於 1998 年，是灣仔唯一一家自置地鋪的廚房專家。我們一直憑藉誠信、出色的設計、細心專業的服務，以及加上忠誠顧客的支持下，我們能夠在這個行業中蓬勃發展。 在Kuchen，我們確保您的夢想廚房成為理想的家。 經驗豐富及充滿熱誠的顧問會根據您的個性為您設計具創意的廚房空間空間。 我們專業的設計團隊和造工出色的施工團隊充滿熱情和專業知識的我們定能為您帶來高品質的定製廚房和最具格調的廚櫃搭配，為您設計及提供最完美的廚房。
                </Typography>
            </Box>

            <Box style={{
                background: 'black',
                color: 'white',
            }}>
                <div style={{
                    display: 'flex',
                    margin: 'auto',
                    width: '85%',
                    paddingTop: '5%',
                    marginBottom: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <Typography>
                        <h1 style={{
                            fontSize: 40
                        }}>
                            服務內容:
                        </h1>
                    </Typography>
                </div>
                <Grid container style={{
                    margin: 'auto',
                    width: '90%'
                }}>
                    <Grid item xs={12} md={4}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>

                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Box style={{
                            // display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            marginTop: '5%',
                            marginBottom: '15%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>

                            <FontAwesomeIcon
                                style={{
                                    margin: 10
                                }}
                                size='5x'
                                icon={'pencil-ruler'} />
                            <Typography style={{
                                fontSize: 20,
                            }}>
                                室內設計
                            </Typography>
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
        console.log(`[About Us Page] getStaticProps failed.`);

        throw e;
    }
};

export default AboutUs;
