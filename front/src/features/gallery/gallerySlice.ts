import { IPhoto, ValidationError } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPhotos } from './galleryThunk';
import { createPhoto } from './galleryThunk';

interface PhotosState {
  items: IPhoto[];
  fetchLoadingPhotos: boolean;
  error: ValidationError | null;
  createLoading: boolean;
}

const initialState: PhotosState = {
  items: [],
  fetchLoadingPhotos: false,
  error: null,
  createLoading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.fetchLoadingPhotos = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
      state.fetchLoadingPhotos = false;
      state.items = photos;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.fetchLoadingPhotos = false;
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

export const photoReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.items;
export const selectPhotosLoading = (state: RootState) => state.photos.fetchLoadingPhotos;
export const selectErrorPhotos = (state: RootState) => state.photos.error;
