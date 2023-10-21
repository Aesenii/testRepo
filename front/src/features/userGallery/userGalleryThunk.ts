import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPhoto, PhotoMutation, ValidationError } from '../../type';
import { isAxiosError } from 'axios';

export const fetchUserPhotos = createAsyncThunk<IPhoto[], string>(
  'userPhotos/fetchUserPhotos',
  async (id) => {
    const responseComments = await axiosApi.get<IPhoto[]>(`/photos?userId=${id}`);

    return responseComments.data;
  },
);

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
