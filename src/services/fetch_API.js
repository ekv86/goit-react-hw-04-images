import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37435138-9bf6764fd840a5be13ea6794c';


export async function getImages(searchQuery, page = 1) {
    return await fetch(`${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            }
            return Promise.reject(new Error())
        })
}

getImages.PropTypes = {
    searchQuery: PropTypes.string,
    page: PropTypes.number
}