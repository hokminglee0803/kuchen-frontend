import { Box, Paper, Skeleton, styled } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/router';
import * as React from 'react';
import { ImageProps } from '../interface/Image';

interface ProjectCardProps {
    backgroundImage: ImageProps;
    type: string;
    projectName: string;
    id: string;
    paddingBottom?: string
}

export default function ProjectCard({ backgroundImage, type, projectName, id, paddingBottom }: ProjectCardProps) {

    const router = useRouter();

    return <>
        <article className='card' style={{
            position: "relative",
            width: "100%",
            paddingBottom: paddingBottom ?? "50%",
            zIndex: 100,
            cursor: 'pointer',
        }}
            onClick={() => {
                router.push(`/projects/${id}`)
            }}
        >
            <img
                src={backgroundImage.url}
                alt={backgroundImage.alt}
                // layout="fill"
                // objectFit="cover"
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