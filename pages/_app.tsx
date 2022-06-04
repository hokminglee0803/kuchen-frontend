import '../styles/globals.css'
import React, { ReactElement } from 'react';
import type { AppProps /* , AppContext */ } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { I18nProvider } from 'next-localization';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import '../styles/style.css'
import dynamic from 'next/dynamic'
import AnimatedCursor from 'react-animated-cursor'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import 'react-image-lightbox/style.css';
import 'react-credit-cards/es/styles-compiled.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BackToTop from '../components/BackToTop';

library.add(fas);

const AnimatedCursorComponent: AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});

const stripePromise = loadStripe('pk_test_YVzIqUTwiCYcEXO1DPqDrM98');

const options = {
  clientSecret: 'pi_1EUn5sJnRDDqOaR75NylFAz3_secret_0EGmBneWy2Gae67xurZrTvl74',
};

function MyApp({ Component, pageProps }: AppProps): ReactElement {

  if (typeof window === 'undefined') {
    console.log('[Kuchen Website] Greeting from server side!');
  }

  const { locale } = useRouter();
  const { lngDict, ...rest } = pageProps;

  return (
    <Elements stripe={stripePromise} options={options}>
      <CookiesProvider>
        <I18nProvider
          lngDict={{ ...lngDict }}
          locale={String(locale)}
        >
          <LocalizationProvider dateAdapter={DateAdapter}>
            <>
              <style global jsx>
                {
                  `
                  html * {
                    font-family: 'Montserrat','微軟正黑體', sans-serif !important;
                  }
                `
                }
              </style>
              <Head>
                <meta
                  name="viewport"
                  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
              </Head>
              <Component {...rest} />
              <AnimatedCursorComponent
                color={'246, 187, 100'}
                outerSize={40}
                outerScale={2}
              />
              <BackToTop />
            </>
          </LocalizationProvider>
        </I18nProvider>
      </CookiesProvider>
    </Elements>
  );
}

export default MyApp;