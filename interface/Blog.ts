import { ImageProps } from "./Image";

export interface BlogProps {
    id: string;
    title: string;
    content: string;
    description: string;
    coverImage: ImageProps;
    createdDate: string;
}