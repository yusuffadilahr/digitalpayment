import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from '../../components/actions/serviceActions'; // Sesuaikan dengan lokasi file Anda
import './services.css'; 

const Services = ({ servicesData, error, fetchServices }) => {
    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            fetchServices(token);
        } else {
            // Jika tidak ada token, maka user belum login
        }
    }, [fetchServices]);

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul className="services-list">
                    {servicesData.map((service, index) => (
                        <li key={index} className="service-item">
                            <div className="service-icon">
                                <img src={service.service_icon} alt={service.service_name} />
                            </div>
                            <p className="service-name">{service.service_name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        servicesData: state.services.servicesData,
        error: state.services.error,
    };
};

export default connect(mapStateToProps, { fetchServices })(Services);