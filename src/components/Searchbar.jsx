import { useState } from 'react';
import css from './styles.module.css';
import PropTypes from 'prop-types';

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChangeValue = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      return;
    }
    onSubmit(value);
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm__button}>
          <span className={css.searchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
          value={value}
          onChange={handleChangeValue}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
