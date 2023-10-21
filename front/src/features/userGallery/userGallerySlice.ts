import { IPhoto, ValidationError } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPhoto, fetchUserPhotos } from './userGalleryThunk';

interface UserGalleryState {
  items: IPhoto[];
  fetchLoading: boolean;
  error: ValidationError | null;
  createLoading: boolean;
}

const initialState: UserGalleryState = {
  items: [],
  fetchLoading: false,
  error: null,
  createLoading: false,
};

export const userGallerySlice = createSlice({
  name: 'userPhotos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPhotos.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchUserPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchLoading = false;
      state.items = photos;
    });
    builder.addCase(fetchUserPhotos.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createPhoto.pending, (state) => {
      state.createLoading = true;
      state.error = null;
    });
    builder.addCase(createPhoto.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.error = error || null;
    });
  },
});

export const userPhotoReducer = userGallerySlice.reducer;
export const selectUserGallery = (state: RootState) => state.userPhotos.items;
export const selectUserGalleryLoading = (state: RootState) => state.userPhotos.fetchLoading;
export const selectErrorPhotos = (state: RootState) => state.userPhotos.error;
