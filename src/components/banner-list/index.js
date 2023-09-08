import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerList = () => {
    const [bannerData, setBannerData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('user');

        if (token) {
            axios.get('https://take-home-test-api.nutech-integrasi.app/banner', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        setBannerData(response.data.data);
                    } else {
                        setError('Gagal mendapatkan data banner');
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

    const settings = {
        infinite: true,
        slidesToShow: 4, 
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
    };

    return (
        <div>
            <p style={{
                fontWeight: 'bold',
            }}>Temukan Promo Menarik</p>
            {error && <p>Error: {error}</p>}
            {bannerData.length > 0 && ( 
                <Slider className="banner-container" {...settings}>
                    {bannerData.map((banner, index) => (
                        <div key={index}>
                            <img
                                src={banner.banner_image}
                                alt={banner.banner_name}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default BannerList;