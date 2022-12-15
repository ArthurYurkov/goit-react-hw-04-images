import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { toast } from 'react-toastify';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.searchBar}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          onInput={handleInputChange}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
        />
        <button type="submit" className={styles.searchFormButton}>
          search
        </button>
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
