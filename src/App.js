import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registrasi from './pages/registrasi/index';
import Login from './pages/login/index';
import Dashboard from './pages/dashboard/index';
import ProfileUpdate from './pages/profile/profileUpdate';
import Profile from './pages/profile/index';
import Topup from './pages/topUp-Amount';
import Transaksi from './pages/transaksi/index';
import RiwayatTransaksi from './pages/riwayat-transaksi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Login />
          </>
        } />
        <Route path="/registrasi" element={
          <>
            <Registrasi />
          </>
        } />
        <Route path="/dashboard" element={
          <>
            <Dashboard />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Profile />
          </>
        } />
        <Route path="/profile/update" element={
          <>
            <ProfileUpdate />
          </>
        } />
        <Route path="/top-up" element={
          <>
          <Topup />
          </>
        } />
        <Route path="/transaksi" element={
          <>
          <Transaksi />
          </>
        } />
        <Route path="/transaksi/history" element={
          <>
          <RiwayatTransaksi />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
