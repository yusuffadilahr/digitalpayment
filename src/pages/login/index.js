import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import gundark from '../../assets/Illustrasi-Login.png';
import Logo from '../../assets/Logo.png';
import './login.css';
import '@fortawesome/react-fontawesome';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState({
        email: false,
        password: false,
    }); 
    const history = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const Auth = async (e) => {
        e.preventDefault();

        setIsInvalid({
            email: false,
            password: false,
        });

        if (!validateEmail(email)) {
            setIsInvalid((prev) => ({ ...prev, email: true }));
            setMsg('Format email tidak valid');
            window.alert('Username atau Password Salah!');
            return;
        }

        if (password.length < 8) {
            setIsInvalid((prev) => ({ ...prev, password: true }));
            setMsg('Password harus memiliki panjang minimal 8 karakter');
            window.alert('Password harus memiliki panjang minimal 8 karakter');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'https://take-home-test-api.nutech-integrasi.app/login',
                {
                    email: email,
                    password: password,
                }
            );

            if (response.data.message === 'Login Sukses') {
                localStorage.setItem('user', response.data.data.token);
                setMsg('Login Sukses!');
                window.alert('Login Sukses!');
                history('/dashboard');
            } else {
                setMsg('Gagal login. Coba lagi.');
            }
        } catch (error) {
            if (error.response) {
                setMsg('Password Salah!');
                setIsInvalid((prev) => ({ ...prev, password: true }));
                window.alert('Password Salah!');
            } else {
                setMsg('Terjadi kesalahan saat menghubungkan ke server.');
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
                    <div className="col-sm-6 text-black">
                        <div className="px-5 ms-xl-4">
                            <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: '#709085' }}></i>
                        </div>

                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <form onSubmit={Auth} style={{ width: '23rem', margin: '0 auto' }}>
                                <img src={Logo} style={LogoStyle} alt="gmbr" />
                                <h3 className="fw-normal mb-3 pb-3"
                                    style={{
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        fontFamily: 'sans-serif'
                                    }}>Masuk atau Buat Akun untuk Memulai</h3>

                                <div className="form-outline mb-4">
                                    <div style={{ position: 'relative' }}>
                                        <AiOutlineMail
                                            style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', fontSize: '1.3rem' }}
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

                                <div className="pt-1 mb-4">
                                    <button
                                        className="btn btn-info btn-lg btn-block"
                                        type="submit"
                                        style={buttonStyle}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Memulai...' : 'Masuk'}
                                    </button>
                                </div>
                                <p style={{
                                    textAlign: 'center',
                                }}>Belum punya akun? Daftar <a href="/registrasi" className="link-danger" style={{
                                    color: 'red',
                                    textDecoration: 'none',
                                }}>disini!</a></p>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
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
export default Login;