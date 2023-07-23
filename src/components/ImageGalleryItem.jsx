import css from './styles.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({url, largeUrl, tags, onSelect }) => (
  <li
    className={css.imageGalleryItem}
    onClick={() => onSelect(largeUrl)}
  >
    <img src={url} alt={tags} className={css.imageGalleryItem__image} />
  </li>
);

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};
