import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute'; 
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DetailedForecast from './pages/Detailedforecast';
import Home from './pages/Home';
import BookmarksPage from './pages/BookmarksPage';

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#334155',
            color: '#fff',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Protected Routes */}
            <Route path="/bookmarks" element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            } />

            <Route path="/details" element={
              <ProtectedRoute>
                <DetailedForecast />
              </ProtectedRoute>
            } />

            <Route path="/forecast/:id" element={
              <ProtectedRoute>
                <DetailedForecast />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}