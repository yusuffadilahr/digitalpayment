import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import gundark from '../../assets/Illustrasi-Login.png';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import Logo from '../../assets/Logo.png';
import './registrasi.css';
import '@fortawesome/react-fontawesome';

const Registrasi = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFormIncomplete, setIsFormIncomplete] = useState(false);
    const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        confirmPassword: false,
    });
    const history = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Registrasi = async (e) => {
        e.preventDefault();

        setIsPasswordMismatch(false);

        setIsInvalid({
            email: false,
            firstName: false,
            lastName: false,
            password: false,
            confirmPassword: false,
        });

        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            setIsFormIncomplete(true);
            setMsg('Harap isi semua kolom');
            return;
        }

        if (!validateEmail(email)) {
            setIsFormIncomplete(true);
            setIsInvalid((prev) => ({ ...prev, email: true }));
            setMsg('Format email tidak valid');
            return;
        }

        if (password.length < 8) {
            setIsFormIncomplete(true);
            setIsInvalid((prev) => ({ ...prev, password: true }));
            setMsg('Password harus memiliki panjang minimal 8 karakter');
            return;
        }

        if (password !== confirmPassword) {
            setIsPasswordMismatch(true);
            setIsFormIncomplete(true);
            setIsInvalid((prev) => ({ ...prev, password: true, confirmPassword: true }));
            setMsg('Password dan konfirmasi password tidak sama');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'https://take-home-test-api.nutech-integrasi.app/registration',
                {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                }
            );

            if (response.status === 200) {
                setMsg('Registrasi Sukses! Silakan login.');
                window.alert('Registrasi Sukses! Silakan login.');
                history('/');
            } else {

            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMsg('Email sudah terdaftar');
                setIsInvalid((prev) => ({ ...prev, email: true }));
            } else {

            }
        } finally {
            setIsLoading(false);
        }
    };

    const LogoStyle = {
        margin: '0 auto',
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    };

    const inputStyle = {
        width: '100%',
        marginBottom: '10px',
        borderRadius: '0px',
        paddingLeft: '50px',
        fontSize: '1rem',
    };

    const errorInputStyle = {
        ...inputStyle,
        borderColor: 'red', 
    };

    const buttonStyle = {
        width: '100%',
        backgroundColor: 'red',
        borderColor: 'red',
        borderRadius: '0px',
        color: 'white',
    };

    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="px-5 ms-xl-4">
                            <form onSubmit={Registrasi} style={{ width: '23rem', margin: '0 auto' }}>
                                <img src={Logo} style={LogoStyle} alt="Gambar" />
                                <h3 className="fw-normal mb-3"
                                    style={{
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif'
                                    }}>Lengkapi Data dan Membuat Akun</h3>

                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <AiOutlineMail
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1,3 rem' }}
                                        />
                                        <input
                                            type="email"
                                            id="form2Example18"
                                            className={`form-control form-control-lg ${isInvalid.email ? 'is-invalid' : ''}`}
                                            placeholder='Masukkan email anda'
                                            style={isInvalid.email ? errorInputStyle : inputStyle}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <FaUser
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1,3 rem' }}
                                        />
                                        <i className="fas fa-user" style={{ position: 'absolute', top: '10px', left: '10px' }}></i>
                                        <input
                                            type="text"
                                            id="form2Example28"
                                            className={`form-control form-control-lg ${isInvalid.firstName ? 'is-invalid' : ''}`}
                                            placeholder='Masukkan nama depan anda'
                                            style={isInvalid.firstName ? errorInputStyle : inputStyle}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <FaUser
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1,3 rem' }}
                                        />
                                        <i className="fas fa-user" style={{ position: 'absolute', top: '10px', left: '10px' }}></i>
                                        <input
                                            type="text"
                                            id="form2Example28"
                                            className={`form-control form-control-lg ${isInvalid.lastName ? 'is-invalid' : ''}`}
                                            placeholder='Masukkan nama belakang anda'
                                            style={isInvalid.lastName ? errorInputStyle : inputStyle}
                                            value={lastName}
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <AiOutlineLock
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1.2em' }}
                                        />
                                        <input
                                            type="password"
                                            id="form2Example28"
                                            className={`form-control form-control-lg ${isInvalid.password ? 'is-invalid' : ''}`}
                                            placeholder='Masukkan password anda'
                                            style={isInvalid.password ? errorInputStyle : inputStyle}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <AiOutlineLock
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1.2em' }}
                                        />
                                        <input
                                            type="password"
                                            id="form2Example28"
                                            className={`form-control form-control-lg ${isInvalid.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder='Konfirmasi password anda'
                                            style={isInvalid.confirmPassword ? errorInputStyle : inputStyle}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="pt-1 mb-4">
                                    <button
                                        className="btn btn-danger btn-lg btn-block"
                                        type="submit"
                                        style={buttonStyle}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Memulai...' : 'Registrasi'}
                                    </button>
                                </div>
                                <p style={{
                                    textAlign: 'center',
                                }}>Sudah punya akun? Masuk <a href="/" className="link-danger" style={{
                                    color: 'red',
                                    textDecoration: 'none',
                                }}>disini!</a></p>

                                {msg && <p className="text-danger mt-3" style={{
                                    textAlign: 'center',
                                }}>{msg}</p>}
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0">
                        <img
                            src={gundark}
                            alt="Login"
                            className="w-100 vh-100"
                            style={{ objectFit: 'cover', objectPosition: 'left', width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registrasi;