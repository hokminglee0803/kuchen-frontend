import { Grid, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/system/Box';
import { ContentfulCollection } from 'contentful';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Copyright from '../../components/Copyright';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { BlogProps } from '../../interface/Blog';
import { PageSettingProps } from '../../interface/PageSetting';
import contentfulService from '../../utils/service/contentfulService';
import { transformBlog, transformWebSettings, translateBlogLocale } from '../../utils/transformer';
const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface BlogsProps {
    title: string;
    webSettings: PageSettingProps;
    blogs: BlogProps[];
    total: number;
}

const Blog: React.FC<BlogsProps> = ({ title, webSettings, blogs, total }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [bloglist, setBloglist] = useState(blogs);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (init) {
            setInit(false)
        }
    }, [init])

    useEffect(() => {
        updateBlogList(1)
    }, [locale])


    const blogListOnChange = async (event: React.ChangeEvent<unknown>, page: number) => {
        await updateBlogList(page);
    }

    const updateBlogList = async (page: number) => {
        setLoading(true)
        const index = (page - 1) * 4;
        const blogs: ContentfulCollection<any> = await contentfulService.getEntriesPaginationByContentType('blog', locale, index, index + 4, { 'fields.locale': translateBlogLocale(locale) });
        setBloglist(blogs.items.map(item => transformBlog(item)));
        setLoading(false);
    }


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

            {
                loading ? '' :
                    bloglist.map((blog, index) => {
                        return <BlogCard
                            key={index}
                            id={blog.id}
                            image={blog.coverImage.url}
                            title={blog.title}
                            createdAt={blog.createdDate}
                            description={blog.description} />
                    })
            }

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
                <Pagination
                    count={Math.ceil(total / 4)}
                    onChange={blogListOnChange}
                    variant="outlined"
                    color="primary" />
            </Box>
            <Copyright />
        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    const blogMainPage = await contentfulService.getEntriesById('7KW9uhasWyh26hKroiSwaA', locale);

    const blogs: ContentfulCollection<any> = await contentfulService.getEntriesPaginationByContentType('blog', locale, 0, 4, { 'fields.locale': translateBlogLocale(locale) });

    const { seoSetting, name } = blogMainPage?.[0]?.fields;

    try {
        return {
            props: {
                lngDict,
                webSettings: transformWebSettings(seoSetting),
                title: name,
                blogs: blogs.items.map(item => transformBlog(item)),
                total: blogs.total,
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Blog Page] getStaticProps failed.`);

        throw e;
    }
};

export default Blog;
