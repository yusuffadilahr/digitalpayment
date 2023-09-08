import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Balance from '../../components/balance';
import './profile-info.css'
import Navibar from '../../components/navbar';
import myImages from '../../assets/Profile-Photo.png'

const ProfileInfo = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
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
                        console.log("taeeee", response.data.data.profile_image);
                        setUrlProfile(response.data.data.profile_image);
                        setUserData(response.data.data);
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
                            <img src={ urlProfile && urlProfile.includes('/null') ? myImages : urlProfile } alt='Gambar' />
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
            </div>
        </div>
    );
};


export default ProfileInfo;