import { IPhoto, PhotoMutation, ValidationError } from '../../type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchPhotos = createAsyncThunk<IPhoto[]>('photos/fetchPhotos', async () => {
  const response = await axiosApi.get<IPhoto[]>('/photos');
  return response.data;
});

export const deletePhoto = createAsyncThunk<void, string>('photos/deletePhoto', async (id) => {
  await axiosApi.delete(`/photos/${id}`);
});

export const createPhoto = createAsyncThunk<void, PhotoMutation, { rejectValue: ValidationError }>(
  'photos/createPhoto',
  async (photoMutation, { rejectWithValue }) => {
    const formData = new FormData();
    const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];

    keys.forEach((key) => {
      const value = photoMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      await axiosApi.post('/photos', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
