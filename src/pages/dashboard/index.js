import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BannerList from '../../components/banner-list';
import Services from '../../components/services-list';
import Balance from '../../components/balance';
import './dashboard.css';
import Navibar from '../../components/navbar';
import Footer from '../../components/footer';
import ProfileImg from '../../assets/Profile-Photo.png'

const Dashboard = () => {
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');
  const [urlProfile, setUrlProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      axios.get('https://take-home-test-api.nutech-integrasi.app/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            setUrlProfile(response.data.data.profile_image)
            setUserData(response.data.data)
          } else {
            setError('Gagal mendapatkan profil pengguna');
          }
        })
        .catch(error => {
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError('Terjadi kesalahan saat menghubungkan ke server.');
          }
        });
    } else {
      setError('Anda belum login atau sesi Anda telah berakhir.');
    }
  }, []);

  return (
    <div>
      <Navibar />
      <div className="container dashboard-container">
        <div className="user-profile-and-balance">
          {userData ? (
            <div className="user-profile">
              <img src={urlProfile.includes('/null') ? ProfileImg : urlProfile } alt="Profil" />
              <div className="user-info">
                <p>Selamat Datang,</p>
                <h4>{userData.first_name} {userData.last_name}</h4>
              </div>
            </div>
          ) : (
            <p>{error}</p>
          )}
          <div className='balance'>
            <Balance />
          </div>
        </div>
        <div className="services-container">
          <Services />
        </div>
        <BannerList />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;