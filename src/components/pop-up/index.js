import React from 'react';
import './popup.css'

const SuccessPopup = ({ message, topupAmount, onClose }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <img src="https://media.istockphoto.com/id/1188414728/id/vektor/ikon-tanda-centang-hijau-bulat-tombol-simbol-centang-di-latar-belakang-putih.jpg?s=612x612&w=0&k=20&c=00R5prGngXchoBoE2mmlodCRO-3CzwA2TFT2gRIgpZI=" alt="confirm-payment" style={{
                    width: '60px',
                    display: 'block',
                    margin: '0 auto',
                    marginBottom: '1rem'
                }} />
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Top Up Berhasil</h2>
                <p>Top Up Sebesar</p>
                <p className="topup-amount" style={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: 'blue'}}>Rp. {topupAmount}</p>
                    <p>Berhasil</p>
                <button className='popup-cancel' onClick={onClose}>Tutup</button>
            </div>
        </div>
    );
};

export default SuccessPopup;