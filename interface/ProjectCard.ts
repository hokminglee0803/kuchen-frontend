import { ImageProps } from "./Image";

export interface ProjectCardProps {
    type: string;
    address: string;
    image?: string;
    name?: string;
    coverImage?: ImageProps;
    id: string;
}