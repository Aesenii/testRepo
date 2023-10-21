import { IPhoto } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUserPhotos } from './userGalleryThunk';

interface UserGalleryState {
  items: IPhoto[];
  fetchLoading: boolean;
}

const initialState: UserGalleryState = {
  items: [],
  fetchLoading: false,
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
  },
});

export const userPhotoReducer = userGallerySlice.reducer;
export const selectUserGallery = (state: RootState) => state.userPhotos.items;
export const selectUserGalleryLoading = (state: RootState) => state.userPhotos.fetchLoading;
