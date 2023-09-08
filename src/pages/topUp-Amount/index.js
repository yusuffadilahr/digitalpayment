import React, { useState } from 'react';
import axios from 'axios';
import ProfileInfo from '../../components/profile-info';
import Footer from '../../components/footer';
import SuccessPopup from '../../components/pop-up/index';
import ConfirmPaymentPopup from '../../components/pop-up/confirmPayment';
import ErrorPopup from '../../components/pop-up/failPopupAmount'
import './topup.css';

const Topup = () => {
    const [topupAmount, setTopupAmount] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isConfirmPopupVisible, setConfirmPopupVisible] = useState(false);
    const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
    const [topupAmountSuccess, setTopupAmountSuccess] = useState(null);
    const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

    const handleTopup = () => {
        const token = localStorage.getItem('user');

        if (!token) {
            setError('Anda belum login atau sesi Anda telah berakhir.');
            return;
        }

        if (topupAmount < 10000 || topupAmount > 1000000) {
            setError('Jumlah top-up harus antara 10.000 dan 1.000.000.');
            return;
        }

        axios
            .post(
                'https://take-home-test-api.nutech-integrasi.app/topup',
                { top_up_amount: topupAmount },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setTopupAmount(0);
                    setIsButtonDisabled(true);
                    setSuccessMessage('Top Up Saldo berhasil');
                    setConfirmPopupVisible(false);
                    setIsSuccessPopupVisible(true);
                    setTopupAmountSuccess(topupAmount);
                } else {
                    setError('Gagal melakukan top up Saldo.');
                    setIsErrorPopupVisible(true);
                }
            })
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError('Terjadi kesalahan saat menghubungkan ke server.');
                    setIsErrorPopupVisible(true);
                }
            });
    };

    const handleOpenConfirmPopup = () => {
        setConfirmPopupVisible(true);
    };

    const handleAmountChange = (e) => {
        const amount = parseInt(e.target.value, 10);
        setTopupAmount(amount);
        setIsButtonDisabled((amount) < 10000 || amount > 1000000);
    };

    const handleAutoFill = (amount) => {
        setTopupAmount(amount);
        setIsButtonDisabled(false);
    };

    const handleClosePopup = () => {
        setConfirmPopupVisible(false);
        setIsSuccessPopupVisible(false);
        window.location.reload();
    };

    const handleCancelPayment = () => {
        setConfirmPopupVisible(false);
    };

    const handleConfirmPayment = () => {
        handleTopup();
        setConfirmPopupVisible(false);
        setIsSuccessPopupVisible(true);
    };

    const handleCloseErrorPopup = () => {
        setIsErrorPopupVisible(false);
    };

    return (
        <div>
            <ProfileInfo />
            <div className="title-container">
                <p className="topup-text">Silahkan Masukan</p>
                <p
                    className="topup-title"
                    style={{
                        fontWeight: 'bold',
                        fontSize: '30px',
                    }}
                >
                    Nominal Top Up
                </p>
            </div>
            <div className="topup-container">
                <div className="form-outline mb-4">
                    <input
                        type="number"
                        id="form7Example1"
                        className="form-control"
                        value={topupAmount}
                        onChange={handleAmountChange}
                    />
                    <button
                        type="button"
                        className="btn-custom"
                        onClick={handleOpenConfirmPopup}
                        disabled={isButtonDisabled}
                    >
                        Konfirmasi Pembayaran
                    </button>
                </div>
                <div className="auto-fill-buttons">
                    <div className="fill-10-50">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(10000)}
                        >
                            Rp. 10.000
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(20000)}
                        >
                            Rp. 20.000
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(50000)}
                        >
                            Rp. 50.000
                        </button>
                    </div>
                    <div className="fill-100-900">
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(100000)}
                        >
                            Rp. 100.000
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(250000)}
                        >
                            Rp. 250.000
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleAutoFill(900000)}
                        >
                            Rp. 900.000
                        </button>
                    </div>
                </div>
            </div>
            {isConfirmPopupVisible && (
                <ConfirmPaymentPopup
                    topupAmount={topupAmount}
                    onCancel={handleCancelPayment}
                    onConfirm={handleConfirmPayment}
                />
            )}
            {isSuccessPopupVisible && (
                <SuccessPopup
                    topupAmount={topupAmountSuccess}
                    onClose={handleClosePopup}
                />
            )}
            {isErrorPopupVisible && (
                <ErrorPopup
                    errorMessage={error}
                    onClose={handleCloseErrorPopup}
                />
            )}
            <br /><br /><br /><br /><br />
            <Footer />
        </div>
    );
};

export default Topup;