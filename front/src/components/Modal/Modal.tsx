import React from 'react';
import './Modal.css';
import { apiUrl } from '../../constants';

interface Props {
  image: string;
  onClose: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <div className="grey-bg">
      <div className="modal">
        <img src={props.image ? apiUrl + '/' + props.image : ''} alt="Photo" />
        <button onClick={props.onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
