import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navibar from '../../components/navbar';
import Footer from '../../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import myImage from './profile.png';

import ChangeProfilePopup from '../../components/pop-up/ChangeProfilePopup';

const Profile = () => {
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [urlProfile, setUrlProfile] = useState(null);
  const [isChangeProfileImagePopupVisible, setIsChangeProfileImagePopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('user');

    if (token) {
      axios
        .get('https://take-home-test-api.nutech-integrasi.app/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUrlProfile(response.data.data.profile_image);
            setUserData(response.data.data);
          } else {
            setError('Gagal mendapatkan profil pengguna');
          }
        })
        .catch((error) => {
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile/update');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('user');

      if (!token) {
        setUploadError('Anda belum login atau sesi Anda telah berakhir.');
        return;
      }

      if (!selectedImage) {
        setUploadError('Anda belum memilih gambar.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.put(
        'https://take-home-test-api.nutech-integrasi.app/profile/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setUploadSuccessMessage(response.data.message);
        setIsChangeProfileImagePopupVisible(false);
      } else {
        setUploadError('Gagal memperbarui profil');
      }
    } catch (error) {
      if (error.response) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('Terjadi kesalahan saat menghubungkan ke server.');
      }
    }
  };

  return (
    <div>
      <Navibar />
      <div className="container-profile">
        {userData ? (
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="change-profile-button"
                  onClick={() => setIsChangeProfileImagePopupVisible(true)}
                  style={{
                    position: 'absolute',
                    top: '45px',
                    right: '28.5rem',
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                />
                <img
                  src={urlProfile.includes('/null') ? myImage : urlProfile}
                  alt="Deskripsi Gambar"
                />
                <div>
                  <h2>
                    {userData.first_name} {userData.last_name}
                  </h2>
                </div>
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="email" style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '20px',
                }}>Email:</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="name" style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '20px',
                }}>Nama Depan:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={userData.first_name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginTop: '20px',
                }}>Nama Belakang:</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={userData.last_name}
                  readOnly
                />
              </div>
              <div className="text-center">
                <button
                  className="btn-edit"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                <button
                  className="btn-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-danger">{error}</p>
        )}
      </div>
      {isChangeProfileImagePopupVisible && (
        <ChangeProfilePopup
          onCancel={() => setIsChangeProfileImagePopupVisible(false)}
          onConfirm={handleUpdateProfile}
          selectedImage={selectedImage}
          handleImageChange={handleImageChange}
        />
      )}
      <Footer />
    </div>
  );
};

export default Profile;