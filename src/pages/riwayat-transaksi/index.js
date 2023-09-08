import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileInfo from '../../components/profile-info';
import 'bootstrap/dist/css/bootstrap.min.css';
import './history.css';

const RiwayatTransaksi = () => {
    const [error, setError] = useState('');
    const [hisTransaksi, setHisTransaksi] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);
    const [canLoadMore, setCanLoadMore] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('user');

        if (token) {

            axios
                .get(`https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${offset}&limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        const newHisTransaksi = response.data.data.records;
                        if (newHisTransaksi.length === 0) {
                            setCanLoadMore(false);
                        } else {
                            setHisTransaksi([...hisTransaksi, ...newHisTransaksi]);
                            setError('');
                        }
                    } else {
                        setError('Gagal mendapatkan data transaksi');
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
    }, [offset, limit]);

    const loadMore = () => {
        if (canLoadMore) {
            setOffset(offset + limit);
        }
    };

    const formatTanggalWaktu = (isoDate) => {
        const date = new Date(isoDate);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div>
            <ProfileInfo />
            <p style={{
                fontWeight: 'bold',
                marginLeft: '150px',
            }}>Semua Transaksi</p>
            <div className='history-container'>
                {error && <p>{error}</p>}
                <div>
                    <ul>
                        {hisTransaksi.map((transaction) => (
                            <li className='card' key={transaction.invoice_number}>
                                <div className='history-st'>
                                    <p className={`transaction-sign ${transaction.transaction_type === 'TOPUP' ? 'plus' : 'minus'}`}>
                                        {transaction.transaction_type === 'TOPUP' ? '+' : '-'}
                                    </p>
                                    <p className={`amount ${transaction.transaction_type === 'TOPUP' ? 'blue' : 'red'}`}>
                                        {transaction.total_amount}
                                    </p>
                                    <p className='desc-info'>{transaction.description}</p>
                                </div>
                                <p className='date-info'>Dibuat Pada: {formatTanggalWaktu(transaction.created_on)} WIB</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='btn-container'>
                {canLoadMore && (
                    <p className='show-more-text' onClick={loadMore}>
                        Show More
                    </p>
                )}
            </div>
        </div>
    );
};

export default RiwayatTransaksi;