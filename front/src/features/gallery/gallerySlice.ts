import { IPhoto } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchPhotos } from './galleryThunk';

interface PhotosState {
  items: IPhoto[];
  fetchLoadingPhotos: boolean;
}

const initialState: PhotosState = {
  items: [],
  fetchLoadingPhotos: false,
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
  },
});

export const photoReducer = photosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.items;
export const selectPhotosLoading = (state: RootState) => state.photos.fetchLoadingPhotos;
