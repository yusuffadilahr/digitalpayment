import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './balance.css';
import bg from '../../assets/BackgroundSaldo.png'

const Balance = () => {
    const [balanceData, setBalanceData] = useState(null);
    const [error, setError] = useState('');
    const [showBalance, setShowBalance] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            axios.get('https://take-home-test-api.nutech-integrasi.app/balance', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        setBalanceData(response.data.data);
                    } else {
                        setError('Gagal mendapatkan informasi Saldo');
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

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    }

    return (
        <div className="balance-container">
            {error ? (
                <p className="error-message">Error: {error}</p>
            ) : balanceData ? (
                <div className="balance-box">
                    <img src={bg} alt='bg-saldo' />
                    <p className='saldo-text'>Saldo Anda</p>
                    <p className='balance-text'>Rp</p>
                    {showBalance ? (
                        <p className='balance-text-rp'> {balanceData.balance}</p>
                    ) : (
                        <p className='balance-text-rp'>••••••••</p>
                    )}
                    <div onClick={toggleBalanceVisibility} className='saldo-hide' style={{
                        cursor: 'pointer',
                    }}>
                        {showBalance ? 'Lihat Saldo' : 'Lihat Saldo'}
                    </div>
                </div>
            ) : null
            }
        </div>
    );
}

export default Balance;