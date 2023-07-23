import css from './styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <button type="button" className={css.Button} onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}
