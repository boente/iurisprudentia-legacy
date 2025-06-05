import * as yup from 'yup';

const apiEndpoint = 'https://api-sites.transkribus.eu/search';
const CONTENT_TYPE = 'application/json; charset=utf-8';

const schema = yup.object({
  d: yup.string().oneOf(['aside', 'overlay']).required().default('overlay'), // Display
  v: yup.boolean().required().default(false), // text visibility
  t: yup.string(), // search term
  f: yup.number().integer().default(1), // fuzziness
  p: yup.number().integer(), // page
});

// Gets the data of the document; id, title and pagecount
async function fetchDocumentData(id) {
  const res = await fetch(`${apiEndpoint}/documents/iurisprudentia/${id}`, {
    method: 'GET',
  });
  const data = await res.json();
  return data;
}

// Gets the data of the specific page; an image and a transkribus-id to identify its content on the serve
async function fetchPageData({ id, pageNum }) {
  try {
    const res = await fetch(`${apiEndpoint}/documents/iurisprudentia/${id}/pages/${pageNum}/?include=count`, {
      method: 'GET',
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function fetchPageContent(contentUrl) {
  const res = await fetch(contentUrl);
  const content = await res.text();
  return content;
}

export {
  fetchDocumentData,
  fetchPageData,
  fetchPageContent,
};
