import { Box, Card, CardContent, CardMedia, Grid, Paper, Skeleton, styled, Typography, Fade } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/router';
import * as React from 'react';

interface BlogCardProps {
    id: string;
    image: string;
    title: string;
    createdAt: string;
    description: string;
}

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

export default function BlogCard({ id, image, title, createdAt, description }: BlogCardProps) {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '' : '/zh';

    return <>
        <article>
            <Fade in={true} timeout={1000}>
                <Card sx={{
                    display: 'flex',
                    margin: 'auto',
                    width: '85%',
                    marginTop: '5%',
                    marginBottom: '5%'
                }} elevation={0}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                width="450px"
                                height="225px"
                                image={`${image}`}
                                alt="Kuchen"
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardContent>
                                <h3 style={{
                                    color: 'orange',
                                }}>
                                    {title}
                                </h3>
                                <Typography style={{
                                    color: 'grey',
                                    fontSize: 10
                                }}>
                                    {createdAt}
                                </Typography>
                                <br />
                                <Typography style={{
                                    color: 'grey',
                                    fontSize: 15
                                }}>
                                    {description}
                                </Typography>
                                <br />
                                <a
                                    href={`${localePath}/blog/${id}`}
                                    target="_self"
                                    rel="noreferrer"
                                    style={{
                                        fontSize: 10,
                                        color: 'orange'
                                    }}
                                >
                                    Read More
                                </a>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Fade>
        </article>
    </>
}