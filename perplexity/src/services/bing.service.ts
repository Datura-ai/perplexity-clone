import axios from 'axios';

const headers = {
  'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBSCRIPTION_KEY,
};

export const bingWebSearch = (query: string) => {
  return axios.get(
    `${process.env.API_BING_SEARCH_URL}?q=${encodeURIComponent(query)}`,
    {
      headers,
    }
  );
};

export const bingWebImageSearch = (query: string) => {
  return axios.get(
    `${process.env.API_BING_IMAGE_SEARCH_URL}?q=${encodeURIComponent(query)}`,
    {
      headers,
    }
  );
};
