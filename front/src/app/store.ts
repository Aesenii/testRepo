import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { photoReducer } from '../features/gallery/gallerySlice';
import { userPhotoReducer } from '../features/usetGallery/userGallerySlice';

const usersPersistConfig = {
  key: 'lastcontrol:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  userPhotos: userPhotoReducer,
  photos: photoReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
