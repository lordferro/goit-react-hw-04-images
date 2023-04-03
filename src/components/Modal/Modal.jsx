import {  useEffect } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = props => {

  
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        props.onClick(e);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  const { imageUrl, onClick } = props;
  return (
    <Overlay onClick={onClick}>
      <ModalStyled>
        <img src={imageUrl} alt="" />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
