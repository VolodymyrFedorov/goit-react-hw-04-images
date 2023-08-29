import { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChangeInput = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Введите запрос в поле поиска');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmitForm}>
        <button type="submit" className={css.formButton}></button>

        <input
          className={css.input}
          type="text"
          value={query}
          onChange={handleChangeInput}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
