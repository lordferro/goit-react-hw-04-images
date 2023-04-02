import axios from 'axios';
import { AppStyled } from 'components/App/App.styled';
import { useEffect, useState } from 'react';
import '../../index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { Dna } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';

const API_KEY = '33613325-290fbadf3efc3d533d0ce9ce0';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    function getFetchUrl() {
      return `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    }
    async function fetchData() {
      const pictures = await axios.get(getFetchUrl());
      setPictures(prevPictures => [...prevPictures, ...pictures.data.hits]);
      setVisible(false);
    }

    if (query === '') {
      return;
    }

    fetchData();
  }, [query, page]);

  const handleSubmit = e => {
    e.preventDefault();

    if (e.target.elements[1].value === '') {
      toast.warn('Please type you request!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (query === e.target.elements[1].value) {
      toast.warn('you should know, that you typed the same query :)');
    } else {
      setVisible(true);
      setPictures([]);
      setPage(1);
      setQuery(e.target.elements[1].value);
    }
  };

  const handleLoadMoreBtn = () => {
    setVisible(true);
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(show => !show);
  };

  const handlePictureClick = imageUrl => {
    setImageUrl(imageUrl);
    toggleModal();
  };

  const handlerModalClick = e => {
    if (e.target.tagName !== 'IMG' || e.key === 'Escape') {
      toggleModal();
    }
  };

  return (
    <AppStyled>
      <SearchBar onSubmit={handleSubmit} />
      <Dna
        visible={isVisible}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{ justifySelf: 'center' }}
        wrapperClass="dna-wrapper"
      />
      {pictures.length !== 0 && (
        <ImageGallery
          pictures={pictures}
          onClick={handlePictureClick}
          component="ul"
        />
      )}
      {pictures.length !== 0 &&
        (isVisible ? (
          <Dna
            visible={isVisible}
            height="60"
            width="60"
            ariaLabel="dna-loading"
            wrapperStyle={{ justifySelf: 'center' }}
            wrapperClass="dna-wrapper"
          />
        ) : (
          <LoadMoreBtn onClick={handleLoadMoreBtn} />
        ))}
      {showModal && <Modal imageUrl={imageUrl} onClick={handlerModalClick} />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppStyled>
  );
}
