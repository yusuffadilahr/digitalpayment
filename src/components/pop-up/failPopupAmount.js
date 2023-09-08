import React from 'react';
import './popup.css';

const ErrorPopup = ({ errorMessage, onClose }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <img src="https://media.istockphoto.com/id/1131230963/id/vektor/tanda-centang-ikon-silang-merah-di-dalam-lingkaran-vektor.jpg?s=170667a&w=0&k=20&c=0sLKgEE-9SFDwylQopELROH6F2ziEdKN8R9B4VzaIiY=" alt="confirm-payment" style={{
                    width: '60px',
                    display: 'block',
                    margin: '0 auto',
                    marginBottom: '1rem'
                }} />
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Gagal Top Up</h2>
                <p>{errorMessage}</p>
                <button className="popup-cancel" onClick={onClose}>
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
