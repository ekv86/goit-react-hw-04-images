import { useState, useEffect } from 'react';
import { getImages } from '../services/fetch_API';
import { SearchBar } from './Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { Modal } from './Modal';
import { Circles } from 'react-loader-spinner';
import css from './styles.module.css';

const perPage = 12;

export function ImageGallery() {
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectImgLink, setSelectImgLink] = useState(null);

  useEffect(() => {
    if (!value) {
      return
    }
    setIsLoading(true);
    getImages( value, currentPage )
      .then(searchResult => {
        if (searchResult.total === 0) {
          throw new Error();
        }
        setSearchResult(prevState => [...prevState, ...searchResult.hits]);
        setTotalPage(Math.ceil(searchResult.total / perPage));
      })

      .catch(() => setError(`Sorry, we can't find ${value}`))
      .finally(() => setIsLoading(false));
  }, [currentPage, value]);

  const handleFormSubmit = value => {
    setValue(value);
    setCurrentPage(1);
    setSearchResult([]);
    setError('');
    setTotalPage(0);
  };

  const handleClickBtn = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const selectImg = link => {
    setSelectImgLink(link);
    setIsShowModal(true);
  };

  const closeModal = e => {
    setIsShowModal(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleFormSubmit} />
      {error && <h3 className={css.error}>{error}</h3>}
      <ul className={css.imageGallery}>
        {searchResult.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            tags={tags}
            largeUrl={largeImageURL}
            onSelect={selectImg}
          />
        ))}
      </ul>
      {isLoading && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{ marginLeft: '40%' }}
          wrapperClass=""
          visible={true}
        />
      )}
      {totalPage > 1 && currentPage !== totalPage && !isLoading && (
        <Button onClick={handleClickBtn} />
      )}

      {isShowModal && (
        <Modal onClose={closeModal}>
          <img src={selectImgLink} alt="" />
        </Modal>
      )}
    </div>
  );
}
