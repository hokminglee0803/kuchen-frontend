import { ReactElement } from 'react';
import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';
// import { ServerStyleSheet } from 'styled-components';
// import { AppProps } from 'next/app';
// import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

const GA_ID = '';
export default class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {

        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render(): ReactElement {
        return (
            <Html
                className="notranslate" translate="no"
            >
                <Head>
                    <meta name="google" content="notranslate" />
                    <meta charSet="utf-8" />
                    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
                    <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
                    <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js"></script>
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href=""
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
                    {/* <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" /> */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=G-LKLE6Z9FK5`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-LKLE6Z9FK5', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}