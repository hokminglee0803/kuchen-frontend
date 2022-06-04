import { Button, Divider, Grid, Table, TableBody, TableCell, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Copyright from '../components/Copyright';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;

const stripePromise = loadStripe('pk_test_YVzIqUTwiCYcEXO1DPqDrM98');

const options = {
    clientSecret: 'pi_1EUn5sJnRDDqOaR75NylFAz3_secret_0EGmBneWy2Gae67xurZrTvl74',
};
interface CheckoutProps {
}

const Checkout: React.FC<CheckoutProps> = ({ }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [error, setError] = useState(false);

    const [paymentError, setPaymentError] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (init) {
            setInit(false)
        }
    }, [init])

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required(t('first_name_required')),
        lastName: yup
            .string()
            .required(t('last_name_required')),
        country: yup
            .string()
            .required(t('country_required')),
        street: yup
            .string()
            .required(t('street_required')),
        town: yup
            .string()
            .required(t('town_required')),
        state: yup
            .string()
            .required(t('state_required')),
        zip: yup
            .string()
            .required(t('zip_required')),
        emailAddress: yup
            .string()
            .required(t('email_address_required'))
            .email(t('email_validation')),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            country: '',
            street: '',
            town: '',
            state: '',
            zip: '',
            emailAddress: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        await formik.validateForm().then(async (formikResult) => {
            setError(false);
            if (Object.keys(formikResult).length === 0) {
                if (!stripe || !elements) {
                    return;
                }
                try {
                    const result = await stripe.confirmPayment({
                        elements,
                        confirmParams: {
                            return_url: "https://www.kuchen.com.hk",
                        },
                    });
                } catch (err) {
                    setPaymentError(true)
                    window.scrollTo(0, 0)
                }
            } else {
                window.scrollTo(0, 0)
                setError(true);
            }
        }).catch(err => {
            setError(true);
        })
    }

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
                        {t('checkout')}
                    </h1>
                    <div style={{
                        width: '30%',
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: '1.5px solid black'
                    }} />
                </Grid>
            </Grid>

            {
                error ?
                    <Grid
                        style={{
                            width: isDesktop ? '62%' : '95%',
                            margin: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgb(249,249,249)',
                            marginBottom: '5%'
                        }}
                        container>
                        <Grid item xs={12} style={{
                            margin: '2%',
                            fontSize: 17,
                        }}>
                            {t('please_fill_all_field')}
                        </Grid>
                    </Grid> : ''
            }

            {
                paymentError ?
                    <Grid
                        style={{
                            width: isDesktop ? '62%' : '95%',
                            margin: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgb(249,249,249)',
                            marginBottom: '5%'
                        }}
                        container>
                        <Grid item xs={12} style={{
                            margin: '2%',
                            fontSize: 17,
                        }}>
                            {t('payment_gateway_error')}
                        </Grid>
                    </Grid> : ''
            }

            <Grid
                style={{
                    width: isDesktop ? '60%' : '90%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                container>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <h2>
                        {t('bill_info')}
                    </h2>
                </Grid>
                <Grid
                    item xs={12} sm={6}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        style={{
                            width: '95%',
                            margin: 'auto',
                        }}
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="firstName"
                        label={t('first_name')}
                        variant="standard"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.errors.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="lastName"
                        label={t('last_name')}
                        variant="standard"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.errors.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.errors.lastName}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="country"
                        label={t('country')}
                        variant="standard"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={formik.errors.country && Boolean(formik.errors.country)}
                        helperText={formik.errors.country}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="street"
                        label={t('street')}
                        variant="standard"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={formik.errors.street && Boolean(formik.errors.street)}
                        helperText={formik.errors.street}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="town"
                        label={t('town')}
                        variant="standard"
                        value={formik.values.town}
                        onChange={formik.handleChange}
                        error={formik.errors.town && Boolean(formik.errors.town)}
                        helperText={formik.errors.town}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="state"
                        label={t('state')}
                        variant="standard"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.errors.state && Boolean(formik.errors.state)}
                        helperText={formik.errors.state}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="zip"
                        label={t('zip')}
                        variant="standard"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        error={formik.errors.zip && Boolean(formik.errors.zip)}
                        helperText={formik.errors.zip}
                    />
                </Grid>
                <Grid item xs={12}
                    style={{
                        marginBottom: '30px'
                    }}>
                    <TextField
                        inputProps={{
                            style: {
                                fontSize: 20
                            }
                        }}
                        required
                        fullWidth
                        id="emailAddress"
                        label={t('email_address')}
                        variant="standard"
                        value={formik.values.emailAddress}
                        onChange={formik.handleChange}
                        error={formik.errors.emailAddress && Boolean(formik.errors.emailAddress)}
                        helperText={formik.errors.emailAddress}
                    />
                </Grid>
            </Grid>

            <Grid
                style={{
                    width: isDesktop ? '60%' : '90%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 50
                }}
                container>
                <Grid item xs={12}>
                    <h2>
                        {t('order')}
                    </h2>
                </Grid>
                <Grid item xs={12}>
                    <Table>
                        <TableBody>
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    PRODUCT
                                </TableCell>
                                <TableCell align="right">
                                    SUBTOTAL
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Consultation Fee x 1
                                </TableCell>
                                <TableCell align="right">
                                    $300.00
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    SUBTOTAL
                                </TableCell>
                                <TableCell align="right">
                                    $300.00
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    TOTAL
                                </TableCell>
                                <TableCell align="right">
                                    $300.00
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid
                    style={{
                        background: 'rgb(249,249,249)',
                    }}
                    item xs={12}>
                    <div style={{
                        margin: '5%'
                    }}>
                        <b>
                            Credit Cards
                        </b>
                    </div>
                    <div style={{
                        margin: '5%'
                    }}>
                        <form onSubmit={handleSubmit}>
                            <PaymentElement />
                            <Divider />
                            <div style={{
                                margin: '5%',
                                lineHeight: 2
                            }}>
                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                            </div>
                            <Grid container>
                                <div style={{ flexGrow: 1 }} />
                                <Button
                                    disabled={!stripe}
                                    type='submit'
                                    sx={{
                                        background: 'transparent',
                                        border: '2px orange solid',
                                        color: 'orange',
                                        padding: '2%',
                                        paddingLeft: '5%',
                                        paddingRight: '5%',
                                        ":hover": {
                                            background: 'orange',
                                            color: 'black'
                                        }
                                    }}
                                >
                                    {t('place_order')}
                                </Button>
                            </Grid>

                        </form>
                    </div>

                </Grid>
            </Grid>


            <div style={{ marginTop: 100 }} />
            <Copyright />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {
        return {
            props: {
                lngDict,
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Checkout Page] getStaticProps failed.`);

        throw e;
    }
};

export default Checkout;
