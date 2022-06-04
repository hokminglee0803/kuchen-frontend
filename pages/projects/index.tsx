import { Zoom, Grid, Typography, useMediaQuery, useTheme, Collapse, ButtonGroup } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Copyright from '../../components/Copyright';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import contentfulService from '../../utils/service/contentfulService';
import { ContentfulCollection } from 'contentful';
import { PageSettingProps } from '../../interface/PageSetting';
import { transformProjectDetailToProjectCard, transformWebSettings } from '../../utils/transformer';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectMotionCard from '../../components/ProjectMotionCard';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface ProjectProps {
    title: string;
    webSettings: PageSettingProps;
    projects: any[];
}

const Project: React.FC<ProjectProps> = ({ title, webSettings, projects }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [selectedType, setSelectedType] = useState('');

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

            <div style={{ marginTop: 100 }} />

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <ButtonGroup disableElevation variant="contained">
                    <div style={{
                        margin: 20,
                        cursor: 'pointer'
                    }}
                        onClick={() => {
                            setSelectedType('')
                        }}
                    >
                        {'All'}
                    </div>
                    {Array.from(new Set(projects.map(item => item.type))).map((item, index) => {
                        return <div
                            key={index}
                            style={{
                                margin: 20,
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setSelectedType(item)
                            }}
                        >
                            {item}
                        </div>
                    })}
                </ButtonGroup>
            </Grid>

            <section style={{ paddingBottom: 100 }}>
                <motion.div
                    layout
                    className="popular-movies"
                    style={{
                        width: '95%',
                        margin: 'auto'
                    }}
                >
                    <AnimatePresence>
                        {projects.filter(project => project.type.includes(selectedType)).map(project => {
                            const name = `${project.address}${project.name}`;
                            return (
                                <ProjectMotionCard
                                    key={project.id}
                                    id={project.id}
                                    backgroundImage={project.coverImage.url}
                                    type={project.type}
                                    projectName={name}
                                />
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </section>

            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    const projectPage = await contentfulService.getEntriesById('5A2tPch1u5Sf2r6atEmkmj', locale);

    const { seoSetting, name } = projectPage?.[0]?.fields;

    const projects: ContentfulCollection<any> = await contentfulService.getEntriesPaginationByContentType('portfolioDetailPage', locale);

    try {
        return {
            props: {
                lngDict,
                title: name,
                webSettings: transformWebSettings(seoSetting),
                projects: projects.items.map(item => transformProjectDetailToProjectCard(item)),
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Project Page] getStaticProps failed.`);

        throw e;
    }
};

export default Project;
