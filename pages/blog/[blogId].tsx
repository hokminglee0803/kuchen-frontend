import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Copyright from '../../components/Copyright';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface BlogEntryProps {
}

const BlogDetail: React.FC<BlogEntryProps> = ({ }) => {

    const router = useRouter()

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    return <div>
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


}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: any[] = []
    const blogEntries = [];
    blogEntries.map((blogEntry) => {
        paths.push(
            {
                params: {
                    blogId: blogEntry?.sys?.id
                },
            }
        )
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

    try {
        return {
            props: {
                lngDict,
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Blog Detail Page] getStaticProps failed.`);

        throw e;
    }
};

export default BlogDetail