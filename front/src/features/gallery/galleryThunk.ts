import { IPhoto } from '../../type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchPhotos = createAsyncThunk<IPhoto[]>('photos/fetchPhotos', async () => {
  const response = await axiosApi.get<IPhoto[]>('/photos');
  return response.data;
});
