import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Gallery from './features/gallery/Gallery';
import UserGallery from './features/userGallery/userGallery';
import GaleryForm from './features/gallery/components/GaleryForm';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Gallery />} />
        <Route path="/userPhotos/:id" element={<UserGallery />} />
        <Route path="/addPhoto" element={<GaleryForm />} />
      </Routes>
    </div>
  );
};

export default App;
