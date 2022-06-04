import { Box, Grid, Slide, Typography, useMediaQuery, useTheme, Zoom } from '@mui/material';
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
import { transformWebSettings, transformProjectCard, translateFooter, transformCarousel, transformProjectDetailToProjectCard } from '../utils/transformer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper";
import { CarouselProps } from '../interface/Carousel';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface IndexPageProps {
  webSettings: PageSettingProps;
  projects: ProjectCardProps[];
  footer: FooterProps;
  carousel: CarouselProps[];
}

const IndexPage: React.FC<IndexPageProps> = ({ webSettings, projects, footer, carousel }) => {

  const router = useRouter();

  const { locale } = router;

  const localePath = locale === 'en' ? '/en/' : '/';

  const { t } = useI18n();

  const [init, setInit] = useState(true);

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [show, setShow] = useState(true);

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

      <Swiper
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        modules={[Parallax, Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="mySwiper"
        onSlideChange={() => console.log('slide change')}
      >
        <div className='swiper-button-next'></div>
        <div className='swiper-button-prev'></div>
        {
          carousel.map((item, index) => {
            return <SwiperSlide
              key={index}
              style={{
                background: `url(${item.image.url})`,
                height: '590px',
                backgroundSize: '100% auto'
              }}>
              {({ isActive }) => (
                <Slide
                  style={{
                    // @ts-ignore
                    transitionDelay: 350,
                    height: '100%'
                  }}
                  direction="up" in={isActive} timeout={700} mountOnEnter unmountOnExit>
                  <div className="text" data-swiper-parallax="-100" style={{
                    marginTop: isDesktop ? '12%' : '38%',
                    background: 'white',
                    height: isDesktop ? 225 : 225,
                    width: 350,
                    color: 'black',
                    opacity: 0.8
                  }}>
                    <Box style={{
                      height: '100%',
                      textAlign: 'center',
                      fontSize: 20,
                      margin: 25,
                    }}>
                      <br />
                      <Typography style={{
                        marginTop: 5,
                        lineHeight: 1,
                      }}>
                        <b style={{
                          fontWeight: 1000,
                        }}>
                          {item.title}
                        </b>
                      </Typography>
                      <Typography style={{
                        marginTop: 20,
                        lineHeight: locale === 'en' ? 1 : 1.5,
                      }}>
                        <p>
                          {item.description}
                        </p>
                      </Typography>
                    </Box>
                  </div>
                </Slide>
              )}
            </SwiperSlide>
          })
        }
      </Swiper>

      <Grid container style={{
        height: '100%'
      }}>
        {
          projects?.map((project, index) => {
            return <Grid
              key={index}
              item xs={12} md={6}>
              <ProjectCard
                backgroundImage={project.coverImage}
                type={project.type}
                projectName={project.address}
                id={project.id}
              />
            </Grid>
          })
        }

      </Grid>

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

  const homePage = await contentfulService.getEntriesById('AGUYX5I3RP6SBWWe7Rtzt', locale);

  const { seoSetting, carousel, portfolio, footer } = homePage?.[0]?.fields;

  const projects: ProjectCardProps[] = [];

  portfolio?.map(item => {
    projects.push(transformProjectDetailToProjectCard(item));
  });

  try {
    return {
      props: {
        lngDict,
        carousel: carousel.map(item => transformCarousel(item)),
        webSettings: transformWebSettings(seoSetting),
        projects: projects,
        footer: translateFooter(footer)
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(`[IndexPage] getStaticProps failed.`);

    throw e;
  }
};

export default IndexPage;
