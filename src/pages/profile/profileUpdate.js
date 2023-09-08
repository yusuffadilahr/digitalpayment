import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navibar from '../../components/navbar';
import myImage from './profile.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import Footer from '../../components/footer';

const ProfileUpdate = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [urlProfileImage, setUrlProfileImage] = useState(null);
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const navigate = useNavigate();

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
                        console.log(response.data.data.profile_image);
                        setUrlProfileImage(response.data.data.profile_image);
                        setUserData(response.data.data);
                        setFirstName(response.data.data.first_name);
                        setLastName(response.data.data.last_name);
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

    const handleUpdateProfile = () => {
        const token = localStorage.getItem('user');
        const requestData = {
            first_name: firstName,
            last_name: lastName,
        };

        if (token) {
            axios
                .put('https://take-home-test-api.nutech-integrasi.app/profile/update', requestData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setSuccessMessage('Profil berhasil diperbarui');
                        window.alert('Profil berhasil diperbarui');
                        navigate('/dashboard');
                        setUserData(response.data.data);
                        setIsProfileUpdated(false);
                    } else {
                        setError('Gagal mengupdate profil pengguna');
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
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setIsProfileUpdated(true);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setIsProfileUpdated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div>
            <Navibar />

            <div className="container-profile">
                {successMessage && <p>{successMessage}</p>}
                {userData ? (
                    <div>
                    </div>
                ) : (
                    <p>{error}</p>
                )}
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                        <img src={urlProfileImage && urlProfileImage.includes('/null') ? myImage : urlProfileImage} alt="Deskripsi Gambar"/>
                        <h2>
                                {userData.first_name} {userData.last_name}
                            </h2>
                        </div>
                        <br />
                        <div>
                            <div className="form-group">
                                <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control"
                                    value={userData.email}
                                    readOnly
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="firstName" style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>Nama Depan</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className='form-control'
                                    placeholder={`Nama Depan: ${userData.first_name}`}
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="lastName" style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>Nama Belakang</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className='form-control'
                                    placeholder={`Nama Belakang: ${userData.last_name}`}
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </div>
                        </div>
                        <div className='text-center'>
                            <button
                                className='btn-edit'
                                onClick={handleUpdateProfile}
                                href="/profile"
                                disabled={!isProfileUpdated}
                            >
                                Perbarui Profil
                            </button>
                            <button
                                className='btn-logout'
                                onClick={handleLogout}
                                href="/"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileUpdate;