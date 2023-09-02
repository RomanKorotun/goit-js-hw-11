import axios from 'axios';

async function serviceSearch(inputValue, currentPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '39170580-8c73c06b0fce5ecb6f9d6ab10',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: '40',
    page: currentPage,
  });
  return await axios.get(`${BASE_URL}?${params}`);
}

export { serviceSearch };
