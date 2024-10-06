import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OAuth2Callback() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            handleOAuth2Callback(code);
        }
    }, []);

    const handleOAuth2Callback = async (code) => {
        const clientId = 'YOUR_CLIENT_ID';
        const clientSecret = 'YOUR_CLIENT_SECRET';
        const tokenEndpoint = 'https://oauth2.googleapis.com/token';
        const tokenUrl = `${tokenEndpoint}?grant_type=authorization_code&code=${code}&redirect_uri=${window.location.href}&client_id=${clientId}&client_secret=${clientSecret}`;

        try {
            const response = await axios.post(tokenUrl);
            const token = response.data.access_token;

            // Use the access token to authenticate the user
            const profileEndpoint = 'https://www.googleapis.com/oauth2/v2/userinfo';
            const profileUrl = `${profileEndpoint}?access_token=${token}`;

            const profileResponse = await axios.get(profileUrl);
            const profile = profileResponse.data;

            // Login the user
            const loginResponse = await axios.post('/api/login', {
                email: profile.email,
                password: profile.id,
            });

            // Redirect the user to the dashboard
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <p>Authenticating...</p>
            )}
        </div>
    );
}

export default OAuth2Callback;