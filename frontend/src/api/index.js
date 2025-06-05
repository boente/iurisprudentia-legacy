import config from '@/config.json';

const { collection } = config;

const SEARCH = 'https://api-sites.transkribus.eu/search';
// const SEARCH = 'http://localhost:3000'

const CONTENT_TYPE = 'application/json; charset=utf-8';

export default {
  async fetchDocuments({ offset = 0, limit = 100 } = {}) {
    const res = await fetch(`${SEARCH}/documents`, {
      method: 'POST',
      body: JSON.stringify({
        collections: [collection],
        offset,
        limit,
        url: 'iurisprudentia',
      }),
      headers: {
        'Content-Type': CONTENT_TYPE,
        Accept: CONTENT_TYPE,
      },
    });
    const data = await res.json();
    return data;
  },
  async fetchDocument(id) {
    const res = await fetch(`${SEARCH}/documents/iurisprudentia/${id}`, {
      method: 'GET',
    });
    return await res.json();
  },
  async fetchDocumentPages(id, { offset = 0, limit = 100 } = {}) {
    try {
      const res = await fetch(`${SEARCH}/documents/${id}/pages/`, {
        method: 'POST',
        body: JSON.stringify({
          offset,
          limit,
          url: 'iurisprudentia',
        }),
        headers: {
          'Content-Type': CONTENT_TYPE,
          Accept: CONTENT_TYPE,
        },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  },
  async fetchPageByNum({ id, pageNum }) {
    try {
      const res = await fetch(`${SEARCH}/documents/iurisprudentia/${id}/pages/${pageNum}/?include=count`, {
        method: 'GET',
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  },
  async fetchSearchResults({
    term, documents, titles, page, fuzziness, collections,
  }, { offset = 0, limit = 10 }) {
    const res = await fetch(`${SEARCH}`, {
      method: 'POST',
      body: JSON.stringify({
        term,
        collections,
        documents,
        titles,
        page,
        fuzziness,
        offset,
        limit,
        url: 'iurisprudentia',
      }),
      headers: {
        'Content-Type': CONTENT_TYPE,
        Accept: CONTENT_TYPE,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      const { total, results } = data;
      return {
        total,
        results,
      };
    }

    const { message } = await res.json();
    throw new Error(`${res.status}: ${message}`);
  },
  async fetchSearchFacets({
    term, documents, titles, fuzziness,
  }) {
    const res = await fetch(`${SEARCH}/facets`, {
      method: 'POST',
      body: JSON.stringify({
        term,
        collections: [collection],
        documents,
        titles,
        fuzziness,
        url: 'iurisprudentia',
      }),
      headers: {
        'Content-Type': CONTENT_TYPE,
        Accept: CONTENT_TYPE,
      },
    });
    const data = await res.json();
    const { total, facets, params } = data;
    return {
      total,
      facets,
      params,
    };
  },
  async fetchPageContent(url) {
    const res = await fetch(url);
    return await res.text();
  },
};
