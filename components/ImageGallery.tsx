import React, { useState, useCallback } from "react";
import { Box, Grid, Zoom } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Lightbox from 'react-image-lightbox';

interface ImageGalleryProps {
    photos: {
        alt: string;
        src: string;
        width: number;
        height: number;
    }[]
}

export default function ImageGallery({ photos }: ImageGalleryProps) {

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div>
            {viewerIsOpen && (
                <Lightbox
                    reactModalStyle={{
                        overlay: { zIndex: 500 }
                    }}
                    mainSrc={photos[currentImage].src}
                    nextSrc={photos[(currentImage + 1) % photos.length].src}
                    prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
                    imageCaption={photos[currentImage].alt}
                    onCloseRequest={() => {
                        closeLightbox();
                    }}
                    onMovePrevRequest={() =>
                        setCurrentImage((currentImage + photos.length - 1) % photos.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImage((currentImage + 1) % photos.length)
                    }
                />
            )}
            <ImageList variant={photos.length === 2 ? 'quilted' : 'masonry'} cols={2} gap={1} >
                {photos.map((item, index) => (
                    <Zoom key={index} in={true} timeout={1000}>
                        <ImageListItem
                            sx={{
                                margin: '8px',
                            }}
                            key={item.alt}>
                            <Box
                                onClick={() => {
                                    openLightbox(index)
                                }}
                                sx={{
                                    position: "absolute",
                                    backgroundColor: 'black',
                                    height: '100%',
                                    width: '100%',
                                    opacity: 0,
                                    transition: 'opacity 0.7s',
                                    '&:hover': {
                                        opacity: 0.5,
                                        cursor: 'pointer',
                                    }
                                }} />
                            <img
                                src={`${item.src}`}
                                alt={item.alt}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </Zoom>

                ))}
            </ImageList>
        </div>

    )
}
