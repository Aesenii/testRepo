import React, { ChangeEvent, useEffect, useState } from 'react';
import './GalleryForm.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectUser } from '../../users/usersSlice';
import { createPhoto } from '../userGalleryThunk';
import { selectErrorPhotos } from '../userGallerySlice';

const GaleryForm = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectErrorPhotos);

  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    title: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newPhoto = {
        title: state.title,
        image: file ? file : null,
      };

      await dispatch(createPhoto(newPhoto)).unwrap();
      navigate('/');
    } catch {
      // nothing
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <div className="gallery-add">
      <h3>Add photo</h3>
      <form className="gallery-form" onSubmit={submitFormHandler}>
        <input
          className="gallery-form-input"
          placeholder="Title"
          name="title"
          type="text"
          maxLength={10}
          value={state.title}
          onChange={inputChangeHandler}
        />
        {Boolean(getFieldError('title')) && (
          <span className="field-error">{getFieldError('title')}</span>
        )}
        <input
          className="file-gallery-input"
          type="file"
          name="file"
          id="fileReg"
          onChange={onChange}
        />
        <label className="label-file-gallery" htmlFor="fileReg">
          {file ? (
            <img src={file ? URL.createObjectURL(file) : ''} alt="" />
          ) : (
            <div>
              <span>Upload</span>
            </div>
          )}
        </label>
        {Boolean(getFieldError('image')) && (
          <span className="field-error">{getFieldError('image')}</span>
        )}
        <button>Send</button>
      </form>
    </div>
  );
};

export default GaleryForm;
