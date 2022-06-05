import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ContentfulCollection } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Copyright from '../../components/Copyright';
import ImageGallery from '../../components/ImageGallery';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { ImageProps } from '../../interface/Image';
import { PageSettingProps } from '../../interface/PageSetting';
import contentfulService from '../../utils/service/contentfulService';
import { transformWebSettings, transformImage, transformRichText } from '../../utils/transformer';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface ProjectDetialPageProps {
    name: string;
    address: string;
    coverImage: ImageProps;
    type: string;
    content: string;
    albums: ImageProps[];
    webSettings: PageSettingProps;
}

const ProjectDetailPage: React.FC<ProjectDetialPageProps> = ({ webSettings, name, address, coverImage, type, content, albums }) => {

    const router = useRouter()

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { locale } = router;

    const localePath = locale === 'en' ? '/' : '/zh';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    return <div>
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

        <Box
            id='img-zoom'
            sx={{
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 25,
                background: `url(${coverImage.url})`,
                backgroundPosition: 'center',
                color: 'white'
            }}

        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <div style={{
                        fontSize: 20,
                        margin: 10
                    }}>
                        ☆
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <h6>
                        {address}
                    </h6>
                </Grid>
                <Grid item xs={12}>
                    <h1>
                        {name}
                    </h1>
                </Grid>
            </Grid>
        </Box>

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
                <h1>
                    {type}
                </h1>
            </Grid>
            <Grid item xs={12}>
                <div
                    style={{
                        width: '90%',
                        margin: 'auto',
                        // display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}
                    dangerouslySetInnerHTML={{ __html: content }} />
            </Grid>
        </Grid>

        <div
            style={{
                width: isDesktop ? '100%' : '100%',
                margin: 'auto',
                marginTop: '5%'
            }}
        >
            <ImageGallery photos={albums.map(item => (
                {
                    alt: item.alt,
                    src: item.url,
                    width: item.width,
                    height: item.height,
                }
            ))} />
        </div>


        <Copyright />



    </div >


}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: any[] = [];
    ['zh', 'en'].map(async (locale) => {
        const projects: ContentfulCollection<any> = await contentfulService.getEntriesPaginationByContentType('portfolioDetailPage', locale);
        projects.items.map(item => {
            paths.push(
                {
                    params: {
                        projectId: item?.sys?.id,
                        locale: locale
                    },
                }
            )
        })
    })

    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    const { projectId } = params;

    const projectDetailPage = await contentfulService.getEntriesById(projectId?.toString(), locale);

    const { seoSetting, name, address, coverImage, type, content, album } = projectDetailPage?.[0]?.fields;
    try {
        return {
            props: {
                lngDict,
                name: name,
                address: address,
                coverImage: transformImage(coverImage),
                type: type,
                content: transformRichText(content),
                albums: album?.map(album => transformImage(album)),
                webSettings: transformWebSettings(seoSetting),
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Project Detail Page] getStaticProps failed.`);

        throw e;
    }
};

export default ProjectDetailPage