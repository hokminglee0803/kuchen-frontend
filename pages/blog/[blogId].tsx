import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { ContentfulCollection } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head';
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useState } from 'react';
import Copyright from '../../components/Copyright';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { ImageProps } from '../../interface/Image';
import { PageSettingProps } from '../../interface/PageSetting';
import contentfulService from '../../utils/service/contentfulService';
import { transformImage, transformRichText, transformWebSettings, translateBlogLocale } from '../../utils/transformer';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton,
} from "react-share";
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface BlogEntryProps {
    title: string;
    webSettings: PageSettingProps;
    coverImage: ImageProps;
    description: string;
    content: string;
    blogLocale: string;
    prevId: string;
    nextId: string;
}

const BlogDetail: React.FC<BlogEntryProps> = ({ title, webSettings, coverImage, description, content, blogLocale, prevId, nextId }) => {

    const router = useRouter()

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { locale } = router;

    const localePath = locale === 'en' ? '' : '/zh';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const [url, setUrl] = useState('');

    useEffect(() => {
        if (init) {
            setUrl(window.location.href);
            setInit(false);
        }
    }, [init])

    useEffect(() => {
        if (locale && blogLocale && translateBlogLocale(locale) !== blogLocale) {
            router.push('/blog');
        }
    }, [locale])

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
                <h1 style={{
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: '5vw',
                    marginTop: '30px',
                }}>
                    {title}
                </h1>
                <div style={{
                    width: '20%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottom: '1.5px solid black'
                }} />
            </Grid>
            <Grid item xs={12}>
                <div
                    style={{
                        width: isDesktop ? '70%' : '95%',
                        margin: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        marginBottom: '10px',
                        fontSize: 20,
                        lineHeight: 2,

                    }}
                    dangerouslySetInnerHTML={{ __html: description }} />
            </Grid>
            <Grid item xs={12}>
                <Box
                    className='reveal-box'
                    style={{
                        margin: isDesktop ? 50 : 0,
                    }}>
                    <span className="reveal-overlay"
                    />
                    <img
                        src={coverImage.url}
                        alt={coverImage.alt}
                        height={coverImage.height}
                        width={coverImage.width}
                    />

                </Box>
            </Grid>
            <Grid item xs={12}>
                <div
                    style={{
                        width: isDesktop ? '65%' : '90%',
                        margin: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        lineHeight: 2,
                        fontSize: 18,
                        fontWeight: 400,
                    }}
                    dangerouslySetInnerHTML={{ __html: content }} />
            </Grid>
        </Grid>

        <Grid container>
            {
                prevId ? <Grid item style={{
                    width: '15%',
                    margin: 10,
                    cursor: 'pointer',
                }}
                    onClick={() => {
                        window.open(`${localePath}/blog/${prevId}`, '_self')
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div
                            style={{
                                fontSize: 18,
                                padding: '0 1rem',
                                color: 'orange'
                            }}
                        >
                            PREV
                        </div>
                        <div style={{
                            height: '1px',
                            flex: 1,
                            backgroundColor: 'orange',
                        }} />
                    </div>
                </Grid> : ''
            }

            <div style={{
                flexGrow: 1
            }} />
            {
                nextId ? <Grid item style={{
                    width: '15%',
                    margin: 10,
                    cursor: 'pointer'
                }}
                    onClick={() => {
                        window.open(`${localePath}/blog/${nextId}`, '_self')
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            height: '1px',
                            flex: 1,
                            backgroundColor: 'orange',
                        }} />
                        <div
                            style={{
                                fontSize: 18,
                                padding: '0 1rem',
                                color: 'orange'
                            }}
                        >
                            NEXT
                        </div>
                    </div>
                </Grid> : ''
            }
        </Grid>

        <Grid
            container
            justifyContent="center"
        >
            <FacebookShareButton
                style={{
                    margin: 10
                }}
                url={url} >
                <SocialIcon network="facebook" />
            </FacebookShareButton>
            <WhatsappShareButton
                style={{
                    margin: 10
                }}
                url={url} >
                <SocialIcon network="whatsapp" />
            </WhatsappShareButton>
            <TwitterShareButton
                style={{
                    margin: 10
                }}
                url={url} >
                <SocialIcon network="twitter" />
            </TwitterShareButton>
            <LinkedinShareButton
                style={{
                    margin: 10
                }}
                url={url} >
                <SocialIcon network="linkedin" />
            </LinkedinShareButton>
            <RedditShareButton
                style={{
                    margin: 10
                }}
                url={url} >
                <SocialIcon network="reddit" />
            </RedditShareButton>
        </Grid>

        <Copyright />


    </div >


}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: any[] = []

    const blogEntries: ContentfulCollection<any> = await contentfulService.getEntriesPaginationByContentType('blog', 'en');

    ['zh', 'en'].map(async (locale) => {
        blogEntries.items.map((blogEntry) => {
            if (translateBlogLocale(locale) === blogEntry.fields.locale)
                paths.push(
                    {
                        params: {
                            blogId: blogEntry?.sys?.id,
                            locale: locale
                        },
                    }
                )
        })
    });
    return {
        paths: paths,
        fallback: 'blocking'
    };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    console.log(params);

    const { blogId } = params;

    const blogDetailPage = await contentfulService.getEntriesById(blogId?.toString(), locale);

    const blogEntries: any[] = (await contentfulService.getEntriesPaginationByContentType('blog', locale)).items.filter(item => translateBlogLocale(locale) === item.fields['locale']);


    let prevId = '';
    let nextId = '';
    const targetIndex = blogEntries.findIndex(item => item.sys.id === blogId);

    if (targetIndex > 0) {
        prevId = blogEntries[targetIndex - 1].sys.id;
    }
    if (targetIndex < blogEntries.length - 1) {
        nextId = blogEntries[targetIndex + 1].sys.id;
    }

    const { name, seoSetting, description, coverImage, content } = blogDetailPage[0].fields;

    console.log(transformImage(coverImage));

    try {
        return {
            props: {
                lngDict,
                title: name,
                webSettings: transformWebSettings(seoSetting),
                coverImage: transformImage(coverImage),
                description: transformRichText(description),
                content: transformRichText(content),
                blogLocale: blogDetailPage[0].fields.locale,
                prevId: prevId,
                nextId: nextId,
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Blog Detail Page] getStaticProps failed.`);

        throw e;
    }
};

export default BlogDetail