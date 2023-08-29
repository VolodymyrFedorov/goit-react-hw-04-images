import { useState, useEffect } from 'react';
import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from '../Services/api';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [lastPage, setLastPage] = useState(true);

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    getImages(query, page)
      .then(data => {
        if (data.hits.length !== 0) {
          return (
            setImages(images => [...images, ...data.hits]),
            setLastPage(page < Math.ceil(data.totalHits / 12))
          );
        }
      })

      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleButtonClick = () => {
    setPage(page => page + 1);
  };

  const handleImageClick = activeImage => {
    setActiveImage(activeImage);
    setIsOpenModal(true);
  };

  const handelImageModalClose = () => {
    setActiveImage('');
    setIsOpenModal(false);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setImages([]);
    setLoading(false);
    setError(null);
    setPage(1);
    setIsOpenModal(false);
    setActiveImage('');
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <h1>{error.message}</h1>}
      {isOpenModal && (
        <Modal image={activeImage} onCloseModal={handelImageModalClose} />
      )}

      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}

      {images.length !== 0 && lastPage && (
        <Button onClick={handleButtonClick}>Load More</Button>
      )}
    </div>
  );
}
