import { Box, Card, CardContent, CardMedia, Paper, Skeleton, styled, Typography } from '@mui/material';
import { fontSize, maxWidth } from '@mui/system';
import Image from 'next/image'
import * as React from 'react';

interface BlogCardProps {
    image: string;
    title: string;
    createdAt: Date;
    description: string;
}

export default function BlogCard({ image, title, createdAt, description }: BlogCardProps) {
    return <>
        <article style={{
            // position: "relative",
            // width: "100%",
            // paddingBottom: "50%",
            // zIndex: 100,
            // cursor: 'pointer'
        }} >
            <Card sx={{
                display: 'flex',
                margin: 'auto',
                width: '85%',
                marginTop: '5%',
                marginBottom: '5%'
            }} elevation={0}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                        sx={{
                            flex: '1 0 auto',
                        }}
                        component="img"
                        height='218'
                        width='120'
                        image={'https://www.kuchen.com.hk/wp-content/uploads/2021/06/1614070305300-768x432.jpg'}
                        alt="Kuchen"
                    />
                </Box>

                <CardContent>
                    <h3 style={{
                        color: 'orange',
                    }}>
                        2021高級廚房設計八大潮流趨勢
                    </h3>
                    <Typography style={{
                        color: 'grey',
                        fontSize: 10
                    }}>
                        六月 11, 2021
                    </Typography>
                    <br />
                    <Typography style={{
                        color: 'grey',
                        fontSize: 15
                    }}>
                        除了假日，你有多少時間待在廚房？關於這個問題，在2020年過後應該會有更多人回應，因為受...
                    </Typography>
                    <br />
                    <a
                        href="/"
                        target="_blank"
                        style={{
                            fontSize: 10,
                            color: 'orange'
                        }}
                    >
                        Read More
                    </a>
                </CardContent>
            </Card>
            {/* <Image src={backgroundImage}
                alt="kuchen"
                layout="fill"
                objectFit="cover"
            />
            <div
                className='title'
            >
                <b>
                    <h3 className='underline'>
                        ☆ {type}
                    </h3>
                    <br />
                    <h4 >
                        {projectName}
                    </h4>
                </b>
            </div>

            <div
                className='shaddow'
            /> */}
        </article>
    </>
}