import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getResponse } from './Fetch/api';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default function App() {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isStateFound, setIsStateFound] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await getResponse(query, page);
        const selectedProperties = response.map(
          ({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          }
        );

        setPictures(prev => [...prev, ...selectedProperties]);
        setStatus('resolved');
        setTotalHits(response.length);
        console.log(response.length);
        if (response.length === 0) {
          setIsStateFound(true);

          toast.error('Did find anything, mate');
        }
        if (response.length < 12) {
          setShowLoadMore(false);
        } else {
          setShowLoadMore(true);
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
        setStatus('rejected');
        setShowLoadMore(false);
      }
    };

    if (query) {
      fetchImg();
    }
  }, [query, page]);

  const processSubmit = event => {
    if (query === event) {
      return;
    }
    setQuery(event);
    setPage(1);
    setPictures([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={processSubmit} />
      {error && <p>{error}</p>}
      {pictures.length ? <ImageGallery images={pictures} /> : null}
      {showLoadMore && <Button onClick={handleLoadMore} />}
      {status === 'pending' && <Loader />}
      <ToastContainer autoClose={2000} />
    </>
  );
}
