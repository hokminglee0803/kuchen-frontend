import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
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
import { transformWebSettings, transformProjectCard, translateFooter, transformRichText, transformMarkdown } from '../utils/transformer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ServiceProps } from '../interface/Service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface AboutUsProps {
    webSettings: PageSettingProps;
    title: string;
    description: string;
    services: ServiceProps[];
    footer: FooterProps;
}

const AboutUs: React.FC<AboutUsProps> = ({ webSettings, title, description, services, footer }) => {

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
                    {
                        services.slice(0, 3).map((service, index) => {
                            return <Grid key={index} item xs={12} md={4}>
                                <Box style={{
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
                                            margin: 10,
                                            width: 90,
                                            height: 90
                                        }}
                                        // size='5x'
                                        icon={service.iconId as IconProp} />
                                    <Typography style={{
                                        fontSize: 20,
                                    }}>
                                        {service.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        })
                    }
                    {
                        services.slice(3, services.length).map((service, index) => {
                            return <Grid key={index} item xs={6} md={3}>
                                <Box style={{
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
                                            margin: 10,
                                            width: 90,
                                            height: 90
                                        }}
                                        // size='5x'
                                        icon={service.iconId as IconProp} />
                                    <Typography style={{
                                        fontSize: 20,
                                    }}>
                                        {service.title}
                                    </Typography>
                                </Box>

                            </Grid>
                        })
                    }

                </Grid>
            </Box>


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

    const aboutUsPage = await contentfulService.getEntriesById('2baW21o6w5pfGXrrGIfQ2d', locale);

    const { seoSetting, footer, name, description, service } = aboutUsPage?.[0]?.fields;

    try {
        return {
            props: {
                lngDict,
                webSettings: transformWebSettings(seoSetting),
                title: name,
                description: transformRichText(await transformMarkdown(description)),
                services: service.map(item => {
                    const { title, iconId } = item.fields;
                    return {
                        title: title,
                        iconId: iconId,
                    }
                }),
                footer: translateFooter(footer)
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[About Us Page] getStaticProps failed.`);

        throw e;
    }
};

export default AboutUs;
