export const response = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?key=29357448-0203ad34ff6f16514b0291a92&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  ).then(response => response.json());
};
