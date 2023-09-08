import React, { useState } from 'react';
import axios from 'axios';

const ProfileImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('user');

            if (!token) {
                setError('Anda belum login atau sesi Anda telah berakhir.');
                return;
            }

            if (!selectedImage) {
                setError('Anda belum memilih gambar.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await axios.put('https://take-home-test-api.nutech-integrasi.app/profile/image', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
            } else {
                setError('Gagal memperbarui profil');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Terjadi kesalahan saat menghubungkan ke server.');
            }
        }
    };

    return (
        <div>
            <h1>Profil Pengguna</h1>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <input type="file" accept="image/jpeg,image/png" onChange={handleImageChange} />
            <button onClick={handleUpdateProfile}>Perbarui Profil</button>
        </div>
    );
};

export default ProfileImage;