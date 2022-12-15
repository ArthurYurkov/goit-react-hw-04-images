import axios from 'axios';

const URL_KEY = 'https://pixabay.com/api/';
const API_KEY = '31234346-99e51484fd3cfaa63b80cb557';

export const getResponse = async (query, page) => {
  const response = await axios.get(
    `${URL_KEY}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.data.hits.length === 0) {
    throw new Error('error');
  }
  return response.data.hits;
};
