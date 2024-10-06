import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import oauth2Service from './oauth2.service';
import { config } from './config';

const LoginForm = () => {
    const [popupStyle, showPopup] = useState('hide');
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    const handleLogin = async (provider) => {
        const authEndpoint = `https://accounts.${provider}.com/o/oauth2/auth`;
        const authUrl = `${authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&scope=profile`;
        window.location.href = authUrl;
    };

    const handleCallback = async (provider, code) => {
        try {
            const token = await oauth2Service.authenticate(provider, code);
            setToken(token);
            navigate('/index');
        } catch (error) {
            console.error(error);
            showPopup('login-popup show');
            setTimeout(() => {
                showPopup('login-popup');
                window.location.reload();
            }, 1000);
        }
    };

    const handleManualLogin = async () => {
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate(`/index?token=${token}`, { replace: true });
            } else {
                showPopup('login-popup show');
                setTimeout(() => {
                    showPopup('login-popup hide');
                }, 2000); // hide the popup error after 3 seconds
            }
        } catch (error) {
            console.error(error);
            showPopup('login-popup show');
            setTimeout(() => {
                showPopup('login-popup hide');
            }, 2000); // hide the popup error after 3 seconds
        }
    };    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const provider = urlParams.get('provider');

        if (code && provider) {
            handleCallback(provider, code);
        }
    }, []);

    return (
        <div className="cover">
            <div className="box">
                <h1>Espace Client</h1>
                <input id="username" type="text" placeholder="username" />
                <input id="password" type="password" placeholder="password" />

                <div className="login-btn" onClick={() => handleLogin('google')}>
                    Login with Google
                </div>
                <div className="login-btn" onClick={handleManualLogin}>
                    Login
                </div>


                <p className="text">
                    <button className="register-btn" onClick={() => navigate('/signup')}>
                        Register if you don’t have an account
                    </button>
                </p>
                <div className={popupStyle}>
                    <h3> LOGIN FAILED </h3>
                    <p>username or password incorrect</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;