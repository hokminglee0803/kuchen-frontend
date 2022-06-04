import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { BLOCKS } from '@contentful/rich-text-types';

import moment from 'moment';

export const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, next) => next(node.content).replace('\n', '<br/>'),
        [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
            return `
                <br/>
                <img
                    src='https://${node.data.target.fields.file.url}'
                    alt='${node.data.target.fields.title}'
                    height='100%'
                    width='100%'
                />
                <br/> `
        }
    }
}

// Constant 
export const transformWebSettings = (item: any) => {
    return {
        seoTitle: item?.fields?.title ?? '',
        seoDescription: item.fields?.description ?? '',
        seoKeywords: item.fields?.keywords?.toString() ?? '',
        openGraphTitle: item?.fields?.openGraphTitle ?? '',
        openGraphDescription: item?.fields?.openGraphDescription ?? '',
        openGraphImage: item?.fields?.openGraphImage?.fields?.file?.url ?? '',
    }
}

export const translateLocale = (locale: string) => {
    switch (locale) {
        case 'zh':
            return 'zh-Hant-HK';
        case 'en':
            return 'en-US';
        default:
            return 'zh-Hant-HK';
    }
}

export const translateBlogLocale = (locale: string) => {
    switch (locale) {
        case 'zh':
            return '中';
        case 'en':
            return '英';
        default:
            return '中';
    }
}

export const translateFooter = (item: any) => {
    return {
        address: item?.fields?.address ?? '',
        officeHour: item.fields?.officeHour ?? [],
        phone: item.fields?.phone ?? '',
        whatsapp: item?.fields?.whatsapp ?? '',
        whatsappWelcomeMessage: '',
        email: item?.fields?.email ?? '',
        googleMapLink: item?.fields?.googleMap ?? '',
    }
}

export const transformImage = (item: any) => {
    return {
        alt: item?.fields?.title ?? '',
        url: item?.fields?.file?.url ? `https:${item?.fields?.file?.url} ` : '',
        width: item?.fields?.file?.details?.image?.width * 5 ?? 1,
        height: item?.fields?.file?.details?.image?.height * 5 ?? 1,
    }
}

export const transformRichText = (item: any) => {
    return documentToHtmlString(item, options) ?? '';
}

export const transformMarkdown = async (item: any) => {
    return await richTextFromMarkdown(item) ?? '';
}


//Customized

export const transformProjectDetailToProjectCard = (item: any) => {
    return {
        type: item?.fields?.type ?? '',
        address: item?.fields?.address ?? '',
        name: item?.fields?.name ?? '',
        coverImage: {
            alt: item?.fields?.coverImage?.fields?.title ?? '',
            url: item?.fields?.coverImage?.fields?.file?.url ? `https:${item?.fields?.coverImage?.fields?.file?.url} ` : '',
        },
        id: item?.sys?.id ?? ''
    }
}

export const transformProjectCard = (item: any) => {
    return {
        type: item?.fields?.type ?? '',
        address: item?.fields?.address ?? '',
        image: item?.fields?.image?.fields?.file?.url ? `https:${item?.fields?.image?.fields?.file?.url} ` : '',
    }
}

export const transformCarousel = (item: any) => {
    return {
        title: item?.fields?.title ?? '',
        description: item.fields?.description ?? '',
        image: transformImage(item.fields?.image)
    }
}

export const transformBlog = (item: any) => {
    return {
        id: item?.sys?.id ?? '',
        title: item?.fields?.name ?? '',
        content: documentToHtmlString(item?.fields?.content, options),
        description: documentToHtmlString(item?.fields?.description, options),
        coverImage: transformImage(item?.fields?.coverImage),
        createdDate: moment(item?.sys?.createdAt).format('DD/MM/YYYY')
    }
}
