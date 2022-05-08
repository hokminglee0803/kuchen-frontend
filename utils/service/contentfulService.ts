import contentfulClient from "../contentfulClient";
import { translateLocale } from "../transformer";

const client = contentfulClient.initContentful();

const getEntriesByContentType = async (contentType: string) => {
    return await client.getEntries({
        content_type: `${contentType}`,
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

const getBlogEntries = async (blogType: string, limit: number, skip: number) => {
    return await client.getEntries({
        'fields.blogType': blogType ?? 'SEO',
        content_type: 'blog',
        skip: skip,
        limit: limit,
        order: '-sys.createdAt'
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

const getEntriesById = async (id: string, locale: string) => {
    let query = {};
    if (id !== undefined) {
        query = {
            ...query,
            'sys.id': id,
            'locale': translateLocale(locale)
        }
    }
    return await client.getEntries(query)
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

export default {
    getEntriesByContentType,
    getBlogEntries,
    getEntriesById
}