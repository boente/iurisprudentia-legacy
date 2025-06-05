import * as yup from 'yup';

const apiEndpoint = 'https://api-sites.transkribus.eu/search';
const CONTENT_TYPE = 'application/json; charset=utf-8';

const schema = yup.object({
  t: yup.string().min(1).required(), // search term
  x: yup.array().of(yup.string()), // facet-titles
  p: yup.number().integer(), // page in returned results & also page when searching, should change
  cId: yup.array().of(yup.number().integer()), // collection ids
  dId: yup.array().of(yup.number().integer()), // document ids
  f: yup.number().integer().default(1), // Search fuzziness
  o: yup.number().integer().default(0), // Offset
  l: yup.number().integer().default(100), // limit
});

function cleanQuery(query) {
  const cleanedQuery = { ...query };
  // The collections have to be defined and it has to be an array
  if (!Array.isArray(query.cId)) cleanedQuery.cId = [query.cId];
  if (cleanedQuery.cId && cleanedQuery.cId.length) cleanedQuery.cId = cleanedQuery.cId.map((id) => parseInt(id, 10));
  // if one the arrays is empty, we should remove it completely
  if (query.dId && query.dId.length < 1) delete cleanedQuery.dId;
  if (query.x && query.x.length < 1) delete cleanedQuery.x;
  // transform the fuzziness into an integer
  if (query.f) cleanedQuery.f = parseInt(query.f, 10);
  return cleanedQuery;
}

async function fetchSearchResults(query) {
  const cleanedQuery = cleanQuery(query);
  if (schema.isValidSync(cleanedQuery)) {
    const res = await fetch(`${apiEndpoint}`, {
      method: 'POST',
      body: JSON.stringify({
        term: cleanedQuery.t,
        collections: cleanedQuery.cId,
        documents: cleanedQuery.dId,
        titles: cleanedQuery.x,
        // page: cleanedQuery.p,
        fuzziness: cleanedQuery.f,
        offset: cleanedQuery.o,
        limit: cleanedQuery.l,
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
  } else {
    return {
      total: 0,
      results: [],
      error: 'This query is unvalid. Please contact us at lst.boente@rwi.uzh.ch',
    };
  }
}

async function fetchSearchFacets(query) {
  if (schema.isValid(query)) {
    const cleanedQuery = cleanQuery(query);
    const res = await fetch(`${apiEndpoint}/facets`, {
      method: 'POST',
      body: JSON.stringify({
        term: cleanedQuery.t,
        collections: cleanedQuery.cId,
        documents: cleanedQuery.dId,
        titles: cleanedQuery.x,
        fuzziness: cleanedQuery.f,
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
  } return 'not valid query';
}

export {
  fetchSearchResults,
  fetchSearchFacets,
};
