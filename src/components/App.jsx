import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getResponse } from './Fetch/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

export default class App extends Component {
  state = {
    pictures: [],
    error: '',
    status: 'idle',
    page: 1,
    query: '',
    totalHits: null,
    showLoadMore: false,
  };

  fetchImg = async () => {
    try {
      const response = await getResponse(this.state.query, this.state.page);
      console.log(response.length);
      if (response.length === 0) {
        toast.error('Did find anything, mate');
      }
      const selectedProperties = response.map(
        ({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        }
      );
      this.setState(prevState => {
        return {
          pictures: [...prevState.pictures, ...selectedProperties],
          status: 'resolved',
          totalHits: response.length,
        };
      });
      if (response.length < 12) {
        this.setState({ showLoadMore: false });
      } else {
        this.setState({ showLoadMore: true });
      }
    } catch (error) {
      this.setState({ error, status: 'rejected', showLoadMore: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', pictures: [], page: 1 });
      this.fetchImg();
    }
    if (
      this.state.query === prevState.query &&
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchImg();
    }
  }

  processSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { pictures, status, showLoadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.processSubmit} />
        {pictures.length && <ImageGallery images={pictures} />}
        {showLoadMore && <Button onClick={this.handleLoadMore} />}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
