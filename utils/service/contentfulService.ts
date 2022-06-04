import contentfulClient from "../contentfulClient";
import { translateLocale } from "../transformer";

const client = contentfulClient.initContentful();

const getEntriesByContentType = async (contentType: string, locale: string) => {
    return await client.getEntries({
        content_type: `${contentType}`,
        locale: translateLocale(locale),
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

const getEntriesPaginationByContentType = async (contentType: string, locale: string, skip?: number, limit?: number, filter?: object) => {

    let query = {
    };
    if (skip) {
        query = {
            ...query,
            skip: skip
        }
    }

    if (limit) {
        query = {
            ...query,
            limit: limit
        }
    }

    return await client.getEntries({
        content_type: `${contentType}`,
        locale: translateLocale(locale),
        ...filter,
        ...query
    })
        .then((entry) => {
            return entry;
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
    getEntriesPaginationByContentType,
    getEntriesById
}