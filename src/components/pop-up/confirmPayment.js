import React from 'react';
import Logo from '../../assets/Logo.png'
import './popup.css'

const ConfirmPaymentPopup = ({ topupAmount, onCancel, onConfirm }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <img src={Logo} alt="confirm-payment" style={{
                    width: '60px',
                    display: 'block', 
                    margin: '0 auto',
                    marginBottom: '1rem'
                }} />
                <p>Anda akan melakukan top up sejumlah:</p>
                <p className="topup-amount" style={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: 'blue'
                }}>Rp. {topupAmount.toLocaleString()}</p>
                <p>Apakah Anda yakin?</p>
                <button className="popup-close" onClick={onCancel}>X</button>
                <button className='popup-confirm' onClick={onConfirm}>Konfirmasi Pembayaran</button>
                <button className="popup-cancel" onClick={onCancel}>Batal</button>
            </div>
        </div>
    );
};

export default ConfirmPaymentPopup;