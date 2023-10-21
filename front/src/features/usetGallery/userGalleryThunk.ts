import axiosApi from '../../axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPhoto } from '../../type';

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
