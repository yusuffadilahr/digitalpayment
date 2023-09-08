import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileInfo from '../../components/profile-info';
import 'bootstrap/dist/css/bootstrap.min.css';
import './transaksi.css';
import Footer from '../../components/footer';
import ConfirmPaymentTransaksi from '../../components/pop-up/ConfirmPopupTransaksi';
import SuccessPopup from '../../components/pop-up/SuccessTransaksi';
import ErrorPopup from '../../components/pop-up/FailPopupTransaksi';

const Transaksi = () => {
    const [error, setError] = useState('');
    const [transactionData, setTransactionData] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [billAmount, setBillAmount] = useState(null);
    const [isConfirmPaymentVisible, setIsConfirmPaymentVisible] = useState(false);
    const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
    const [isErrorPopupVisible, setIsErrorPopupVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('user');

        if (token) {
            axios.get('https://take-home-test-api.nutech-integrasi.app/services', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        setServiceData(response.data.data);
                        setError('');
                    } else {
                        setError('Gagal mendapatkan data layanan');
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

    const handleServiceSelection = (serviceCode) => {
        const selectedServiceData = serviceData.find(service => service.service_code === serviceCode);

        if (selectedServiceData) {
            setSelectedService(selectedServiceData);
            setBillAmount(selectedServiceData.service_tariff);
        }
    };

    const handleConfirmPayment = () => {
        setIsConfirmPaymentVisible(true);
    };

    const handleTransaction = () => {
        if (selectedService) {
            const token = localStorage.getItem('user');

            if (token) {
                const requestData = {
                    service_code: selectedService.service_code,
                };

                axios.post('https://take-home-test-api.nutech-integrasi.app/transaction', requestData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.status === 200) {
                            setTransactionData(response.data.data);
                            setError('');
                            setIsConfirmPaymentVisible(false);
                            setIsSuccessPopupVisible(true);
                        } else {
                            setError('Gagal melakukan transaksi');
                            setIsErrorPopupVisible(true);
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            if (error.response.status === 400 && error.response.data.message === 'Saldo tidak cukup') {
                                setError('Saldo Anda tidak cukup untuk melakukan transaksi ini.');
                            } else {
                                
                            }
                        } else {
                            setError('Terjadi kesalahan saat menghubungkan ke server.');
                        }
                        setIsErrorPopupVisible(true);
                    });
            } else {
                setError('Anda belum login atau sesi Anda telah berakhir.');
                setIsErrorPopupVisible(true);
            }
        } else {
            setError('Silakan pilih layanan terlebih dahulu.');
            setIsErrorPopupVisible(true);
        }
    };

    const handlePopupClose = () => {
        window.location.href = '/transaksi/history';
    };

    const handleCloseErrorPopup = () => {
        setIsErrorPopupVisible(false);
    };

    return (
        <div>
            <ProfileInfo />
            {error && <p>{error}</p>}
            <div className='history-tra'>
                <a href='/transaksi/history'
                >Riwayat Transaksi</a>
            </div>
            <div>
                <div className="service-buttons">
                    {serviceData &&
                        serviceData.map(service => (
                            <button
                                key={service.service_code}
                                className="service-button btn btn-light"
                                onClick={() => handleServiceSelection(service.service_code)}
                            >
                                <img src={service.service_icon} alt={service.service_name} className="service-icon" />
                                {service.service_name}
                            </button>
                        ))}
                </div>
            </div>
            <div>
                {selectedService && (
                    <div>
                        <p style={{
                            fontWeight: 'bold',
                            marginLeft: '150px',
                        }}>Pembayaran</p>
                        <input
                            type="text"
                            className="total-nominal"
                            value={billAmount}
                            readOnly
                        />
                        <button className="service-custom btn btn-danger" onClick={handleConfirmPayment}>Bayar</button>
                    </div>
                )}
            </div>
            {transactionData && (
                <div>
                    <h2>Detail Transaksi:</h2>
                    <p>Nomor Faktur: {transactionData.invoice_number}</p>
                </div>
            )}

            {isConfirmPaymentVisible && (
                <ConfirmPaymentTransaksi
                    billAmount={billAmount}
                    onCancel={() => setIsConfirmPaymentVisible(false)}
                    onConfirm={handleTransaction}
                />
            )}

            {isSuccessPopupVisible && (
                <SuccessPopup
                    billAmount={billAmount}
                    transactionData={transactionData}
                    onClose={handlePopupClose}
                />
            )}

            {isErrorPopupVisible && (
                <ErrorPopup
                    errorMessage={error}
                    onClose={handleCloseErrorPopup}
                />
            )}
            <br /><br /><br /><br /><br /><br /><br />
            <Footer />
        </div>
    );
};

export default Transaksi;