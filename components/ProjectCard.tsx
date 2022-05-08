import { Box, Paper, Skeleton, styled } from '@mui/material';
import { maxWidth } from '@mui/system';
import Image from 'next/image'
import * as React from 'react';

interface ProjectCardProps {
    backgroundImage: string;
    type: string;
    projectName: string;
}

export default function ProjectCard({ backgroundImage, type, projectName }: ProjectCardProps) {
    return <>
        <article className='card' style={{
            position: "relative",
            width: "100%",
            paddingBottom: "50%",
            zIndex: 100,
            cursor: 'pointer'
        }} >
            <Image src={backgroundImage}
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
            />
        </article>
    </>
}