import React, { useState } from 'react';
import './popup.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const ChangeProfilePopup = ({ onCancel, selectedImage, handleImageChange, onConfirm }) => {
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleUpdateProfile = async () => {
        try {
            if (!selectedImage) {
                setUploadError('Anda belum memilih gambar.');
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedImage);

            const token = localStorage.getItem('user');

            if (!token) {
                setUploadError('Anda belum login atau sesi Anda telah berakhir.');
                return;
            }

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
                window.location.reload();
                onConfirm();
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

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100 * 1024) {
                setUploadError('Ukuran file terlalu besar. Maksimum 100KB yang diizinkan.');
                setPreviewImage(null);
                return;
            }

            setUploadError('');

            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(file); 
            handleImageChange(e); 
        }
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                {previewImage && (
                    <img
                        src={previewImage}
                        alt="Pratinjau Gambar"
                        style={{ maxWidth: '100%', marginBottom: '10px' }}
                    />
                )}
                <input
                className='form-control form-control'
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImagePreview}
                    style={{ marginBottom: '10px' }}
                />
                {uploadError && <div className="error">{uploadError}</div>}
                {uploadSuccessMessage && <div className="success">{uploadSuccessMessage}</div>}
                <button className='popup-confirm' onClick={handleUpdateProfile}>Konfirmasi</button>
                <button className="popup-cancel" onClick={onCancel}>Batal</button>
            </div>
        </div>
    );
};

export default ChangeProfilePopup;